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

async function fetchDelegators(): Promise<DelegatorInfo[]> {
  const block = await alchemyProvider.getBlockNumber();

  let memberAddresses: string[] = [];
  let token: string | undefined;

  while (true) {
    const params: Record<string, unknown> = {
      address: POOL_CONTRACT,
      from_block: { block_number: 0 },
      to_block: { block_number: block },
      keys: [[EVENT_SELECTORS.NewPoolMember]],
      chunk_size: 500,
    };
    if (token) params.continuation_token = token;

    const result = await alchemyProvider.getEvents(
      params as Parameters<typeof alchemyProvider.getEvents>[0]
    );
    for (const ev of result.events) {
      if (ev.keys[1]) memberAddresses.push(ev.keys[1]);
    }
    if (!result.continuation_token) break;
    token = result.continuation_token;
    if (memberAddresses.length > 1000) break;
  }

  const unique = Array.from(new Set(memberAddresses));

  const batchSize = 10;
  const delegators: DelegatorInfo[] = [];

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

  return delegators.slice(0, 50);
}

async function fetchActivity(): Promise<ActivityEvent[]> {
  const block = await alchemyProvider.getBlockNumber();

  const result = await alchemyProvider.getEvents({
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

  let allEvents: typeof result.events = [];
  let token: string | undefined;
  let result: Awaited<ReturnType<typeof alchemyProvider.getEvents>>;

  while (true) {
    const params: Record<string, unknown> = {
      address: STAKING_CONTRACT_ADDRESS,
      from_block: { block_number: Math.max(block - 50000, 0) },
      to_block: { block_number: block },
      keys: [[EVENT_SELECTORS.StakerRewardsUpdated], [PRAGMA_FELT]],
      chunk_size: 100,
    };
    if (token) params.continuation_token = token;

    result = await alchemyProvider.getEvents(
      params as Parameters<typeof alchemyProvider.getEvents>[0]
    );
    allEvents.push(...result.events);
    if (!result.continuation_token) break;
    token = result.continuation_token;
  }

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

  const attestations: AttestationRecord[] = allEvents
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

  return attestations;
}

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<StakingEventsData | { error: string }>
) {
  try {
    const [delegators, activity, attestations] = await Promise.all([
      fetchDelegators(),
      fetchActivity(),
      fetchAttestations(),
    ]);

    res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=120");
    res.status(200).json({ delegators, activity, attestations });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Staking events API error:", message);
    res.status(500).json({ error: message });
  }
}
