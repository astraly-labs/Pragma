import type { NextApiRequest, NextApiResponse } from "next";
import { RpcProvider } from "starknet";
import {
  ALCHEMY_RPC_URL,
  STAKING_CONTRACT_ADDRESS,
  POOL_CONTRACT,
  PRAGMA_FELT,
  PRAGMA_RPC_URL,
  EVENT_SELECTORS,
  EVENT_NAMES,
} from "@/lib/staking";
import type {
  StakingEventsData,
  DelegatorInfo,
  ActivityEvent,
  AttestationRecord,
} from "@/lib/staking";

const alchemyProvider = new RpcProvider({ nodeUrl: ALCHEMY_RPC_URL });
const pragmaProvider = new RpcProvider({ nodeUrl: PRAGMA_RPC_URL });

// --- In-memory cache ---
interface CachedData {
  data: StakingEventsData;
  timestamp: number;
  lastScannedBlock: number;
  memberAddresses: string[];
}

let cache: CachedData | null = null;
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes
let fetchInProgress: Promise<StakingEventsData> | null = null;

function isCacheValid(): boolean {
  return cache !== null && Date.now() - cache.timestamp < CACHE_TTL_MS;
}

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getEventsWithRetry(
  provider: RpcProvider,
  params: Parameters<typeof provider.getEvents>[0],
  retries = 3
): Promise<Awaited<ReturnType<typeof provider.getEvents>>> {
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      return await provider.getEvents(params);
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : "";
      if (msg.includes("429") && attempt < retries - 1) {
        await sleep(1000 * (attempt + 1));
        continue;
      }
      throw error;
    }
  }
  throw new Error("Max retries exceeded");
}

async function scanMemberAddresses(
  fromBlock: number,
  toBlock: number
): Promise<string[]> {
  const addresses: string[] = [];
  let token: string | undefined;

  while (true) {
    const params: Record<string, unknown> = {
      address: POOL_CONTRACT,
      from_block: { block_number: fromBlock },
      to_block: { block_number: toBlock },
      keys: [[EVENT_SELECTORS.NewPoolMember]],
      chunk_size: 200,
    };
    if (token) params.continuation_token = token;

    const result = await getEventsWithRetry(
      alchemyProvider,
      params as Parameters<typeof alchemyProvider.getEvents>[0]
    );

    for (const ev of result.events) {
      if (ev.keys[1]) addresses.push(ev.keys[1]);
    }

    if (!result.continuation_token) break;
    token = result.continuation_token;

    await sleep(200);
  }

  return addresses;
}

async function fetchDelegators(
  knownAddresses: string[]
): Promise<{ delegators: DelegatorInfo[]; addresses: string[] }> {
  const unique = Array.from(new Set(knownAddresses));
  const delegators: DelegatorInfo[] = [];
  const batchSize = 5;

  for (let i = 0; i < unique.length; i += batchSize) {
    const batch = unique.slice(i, i + batchSize);
    const results = await Promise.allSettled(
      batch.map((addr) =>
        pragmaProvider.callContract(
          {
            contractAddress: POOL_CONTRACT,
            entrypoint: "pool_member_info_v1",
            calldata: [addr],
          },
          "latest"
        )
      )
    );

    for (let j = 0; j < results.length; j++) {
      const r = results[j];
      if (r.status === "fulfilled" && r.value.length > 0) {
        const amount = BigInt(r.value[1]);
        if (amount > BigInt(0)) {
          delegators.push({
            address: batch[j],
            amount: amount.toString(),
            share: 0,
            isActive: true,
          });
        }
      }
    }
  }

  delegators.sort((a, b) => {
    const diff = BigInt(b.amount) - BigInt(a.amount);
    return diff > BigInt(0) ? 1 : diff < BigInt(0) ? -1 : 0;
  });

  const totalDelegated = delegators.reduce(
    (sum, d) => sum + BigInt(d.amount),
    BigInt(0)
  );

  for (const d of delegators) {
    d.share =
      totalDelegated > BigInt(0)
        ? Number((BigInt(d.amount) * BigInt(10000)) / totalDelegated) / 100
        : 0;
  }

  return { delegators: delegators.slice(0, 50), addresses: unique };
}

async function fetchActivity(): Promise<ActivityEvent[]> {
  const block = await alchemyProvider.getBlockNumber();

  const result = await getEventsWithRetry(alchemyProvider, {
    address: POOL_CONTRACT,
    from_block: { block_number: Math.max(block - 100000, 0) },
    to_block: { block_number: block },
    chunk_size: 50,
  });

  const events: ActivityEvent[] = [];

  for (const ev of result.events.reverse()) {
    const selector = ev.keys[0];
    const operation = EVENT_NAMES[selector] || "Unknown";
    const origin = ev.keys[1] || "0x0";
    let amount = "0";

    if (ev.data && ev.data.length > 0) {
      try {
        amount = BigInt(ev.data[0]).toString();
      } catch {
        amount = "0";
      }
    }

    events.push({
      operation,
      origin,
      amount,
      transactionHash: ev.transaction_hash,
      blockNumber: ev.block_number,
      timestamp: 0,
    });
  }

  return events.slice(0, 30);
}

async function fetchAttestations(): Promise<AttestationRecord[]> {
  const block = await alchemyProvider.getBlockNumber();

  const result = await getEventsWithRetry(alchemyProvider, {
    address: STAKING_CONTRACT_ADDRESS,
    from_block: { block_number: Math.max(block - 20000, 0) },
    to_block: { block_number: block },
    keys: [[EVENT_SELECTORS.StakerRewardsUpdated], [PRAGMA_FELT]],
    chunk_size: 50,
  } as Parameters<typeof alchemyProvider.getEvents>[0]);

  const epochInfo = await pragmaProvider.callContract(
    {
      contractAddress: STAKING_CONTRACT_ADDRESS,
      entrypoint: "get_epoch_info",
      calldata: [],
    },
    "latest"
  );
  const epochLength = parseInt(epochInfo[1], 16);
  const startingBlock = parseInt(epochInfo[2], 16);
  const startingEpoch = parseInt(epochInfo[3], 16);

  return result.events
    .reverse()
    .map((ev) => {
      const evBlock = ev.block_number;
      const epochId =
        startingEpoch + Math.floor((evBlock - startingBlock) / epochLength);
      return {
        epochId,
        blockNumber: evBlock,
        transactionHash: ev.transaction_hash,
      };
    })
    .slice(0, 20);
}

async function fetchAllData(): Promise<StakingEventsData> {
  const block = await alchemyProvider.getBlockNumber();

  let memberAddresses: string[];
  if (cache && cache.memberAddresses.length > 0) {
    const newAddresses = await scanMemberAddresses(
      cache.lastScannedBlock + 1,
      block
    );
    memberAddresses = cache.memberAddresses.concat(newAddresses);
  } else {
    memberAddresses = await scanMemberAddresses(0, block);
  }

  const [{ delegators, addresses }, activity, attestations] = await Promise.all(
    [fetchDelegators(memberAddresses), fetchActivity(), fetchAttestations()]
  );

  const data: StakingEventsData = { delegators, activity, attestations };

  cache = {
    data,
    timestamp: Date.now(),
    lastScannedBlock: block,
    memberAddresses: addresses,
  };

  return data;
}

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<StakingEventsData | { error: string }>
) {
  try {
    if (isCacheValid() && cache) {
      res.setHeader(
        "Cache-Control",
        "s-maxage=120, stale-while-revalidate=300"
      );
      res.status(200).json(cache.data);
      return;
    }

    if (fetchInProgress) {
      const data = await fetchInProgress;
      res.setHeader(
        "Cache-Control",
        "s-maxage=120, stale-while-revalidate=300"
      );
      res.status(200).json(data);
      return;
    }

    fetchInProgress = fetchAllData();
    const data = await fetchInProgress;
    fetchInProgress = null;

    res.setHeader("Cache-Control", "s-maxage=120, stale-while-revalidate=300");
    res.status(200).json(data);
  } catch (error: unknown) {
    fetchInProgress = null;
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Staking events API error:", message);

    if (cache) {
      res.setHeader("Cache-Control", "s-maxage=60");
      res.status(200).json(cache.data);
      return;
    }

    res.status(500).json({ error: message });
  }
}
