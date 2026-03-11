import "server-only";
import { RpcProvider } from "starknet";
import {
  STAKING_CONTRACT_ADDRESS,
  PRAGMA_VALIDATOR_ADDRESS,
  PRAGMA_RPC_URL,
  ENDUR_API_URL,
} from "@/lib/staking";
import type { StakingDataSerialized } from "@/lib/staking";

const provider = new RpcProvider({ nodeUrl: PRAGMA_RPC_URL });

function callStaking(entrypoint: string, calldata: string[] = []) {
  return provider.callContract(
    {
      contractAddress: STAKING_CONTRACT_ADDRESS,
      entrypoint,
      calldata,
    },
    "latest"
  );
}

function parseStakerInfo(result: string[]) {
  const rewardAddress = result[0];
  const operationalAddress = result[1];

  const unstakeVariant = parseInt(result[2], 16);
  const isUnstaking = unstakeVariant === 0;
  let idx = isUnstaking ? 4 : 3;

  const amountOwn = BigInt(result[idx]);
  idx++;
  const unclaimedRewardsOwn = BigInt(result[idx]);
  idx++;

  const poolVariant = parseInt(result[idx], 16);
  idx++;
  const hasPool = poolVariant === 0;

  let poolContract: string | null = null;
  let poolDelegatedAmount = BigInt(0);
  let poolCommission = 0;

  if (hasPool) {
    poolContract = result[idx];
    idx++;
    poolDelegatedAmount = BigInt(result[idx]);
    idx++;
    poolCommission = parseInt(result[idx], 16);
  }

  return {
    rewardAddress,
    operationalAddress,
    isUnstaking,
    amountOwn: amountOwn.toString(),
    unclaimedRewardsOwn: unclaimedRewardsOwn.toString(),
    hasPool,
    poolContract,
    poolDelegatedAmount: poolDelegatedAmount.toString(),
    poolCommission: poolCommission / 100,
  };
}

function parseEpochInfo(result: string[]) {
  return {
    epochDuration: parseInt(result[0], 16),
    epochLength: parseInt(result[1], 16),
    startingBlock: parseInt(result[2], 16),
    startingEpoch: parseInt(result[3], 16),
    previousLength: parseInt(result[4], 16),
    previousEpochDuration: parseInt(result[5], 16),
  };
}

interface EndurValidatorData {
  liveliness: number;
  apy: number;
  delegators_count: number;
  active_since: string | null;
}

let cachedEndurData: { data: EndurValidatorData; timestamp: number } | null =
  null;

async function fetchEndurData(): Promise<EndurValidatorData> {
  if (cachedEndurData && Date.now() - cachedEndurData.timestamp < 300000) {
    return cachedEndurData.data;
  }

  try {
    const res = await fetch(ENDUR_API_URL);
    if (!res.ok) throw new Error("Endur API error");
    const json = await res.json();
    const validators = json.validators || [];
    const pragma = validators.find(
      (v: { address: string }) =>
        v.address.toLowerCase() === PRAGMA_VALIDATOR_ADDRESS.toLowerCase()
    );

    const data: EndurValidatorData = {
      liveliness: pragma?.liveliness ?? 0,
      apy: pragma?.apy ?? 0,
      delegators_count: pragma?.delegators_count ?? 0,
      active_since: pragma?.active_since ?? null,
    };

    cachedEndurData = { data, timestamp: Date.now() };
    return data;
  } catch {
    if (cachedEndurData) return cachedEndurData.data;
    return { liveliness: 0, apy: 0, delegators_count: 0, active_since: null };
  }
}

export async function fetchStakingData(): Promise<StakingDataSerialized> {
  const [
    totalStakeRaw,
    currentEpochRaw,
    stakerInfoRaw,
    poolInfoRaw,
    epochInfoRaw,
    blockNumber,
  ] = await Promise.all([
    callStaking("get_total_stake"),
    callStaking("get_current_epoch"),
    callStaking("staker_info_v1", [PRAGMA_VALIDATOR_ADDRESS]),
    callStaking("staker_pool_info", [PRAGMA_VALIDATOR_ADDRESS]),
    callStaking("get_epoch_info"),
    provider.getBlockNumber(),
  ]);

  const stakerInfo = parseStakerInfo(stakerInfoRaw);

  const poolCommissionRaw = parseInt(poolInfoRaw[1], 16);
  if (stakerInfo.hasPool) {
    stakerInfo.poolCommission = poolCommissionRaw / 100;
  }

  const epochInfo = {
    currentEpoch: parseInt(currentEpochRaw[0], 16),
    ...parseEpochInfo(epochInfoRaw),
  };

  const endurData = await fetchEndurData();

  return {
    validator: {
      name: "Pragma",
      address: PRAGMA_VALIDATOR_ADDRESS,
    },
    liveliness: endurData.liveliness,
    apy: endurData.apy,
    delegatorsCount: endurData.delegators_count,
    activeSince: endurData.active_since,
    stakerInfo,
    epochInfo,
    totalNetworkStake: BigInt(totalStakeRaw[0]).toString(),
    currentBlockNumber: blockNumber,
  };
}
