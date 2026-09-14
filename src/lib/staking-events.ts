import type {
  ActivityEvent,
  AttestationRecord,
  DelegatorInfo,
} from "./staking";

export type VoyagerDelegator = {
  address: string;
  delegatedStake: string;
  share: number;
};
export type VoyagerActivity = {
  name: string;
  amount: string;
  delegatorAddress?: string;
  stakerAddress: string;
  txnHash: string;
  timestamp: string;
  tokenInfo: { decimals: number; symbol: string };
};

export function parseDelegator(row: VoyagerDelegator): DelegatorInfo {
  const decimal = row.delegatedStake.match(
    /^(\d+)(?:\.(\d+))?(?:e([+-]?\d{1,3}))?$/i
  );
  if (!decimal || !Number.isFinite(row.share)) {
    throw new Error("Invalid delegator balance");
  }
  // Voyager returns STRK units (including scientific notation) and basis points.
  // Convert as integers so tiny balances never lose precision through Number.
  const [, whole, fraction = "", exponent = "0"] = decimal;
  const shift = 18 + Number(exponent) - fraction.length;
  if (Math.abs(shift) > 100) throw new Error("Invalid delegator balance");
  const coefficient = BigInt(whole + fraction);
  const scale = BigInt("1" + "0".repeat(Math.abs(shift)));
  if (shift < 0 && coefficient % scale !== BigInt(0)) {
    throw new Error("Delegator balance has fractional raw units");
  }
  const amount = shift >= 0 ? coefficient * scale : coefficient / scale;
  return {
    address: row.address,
    amount: amount.toString(),
    share: row.share / 100,
    isActive: amount > BigInt(0),
  };
}

const operations: Record<string, string> = {
  delegator_stake: "Delegated",
  delegator_withdrawal_initiated: "Withdrawal requested",
  delegator_withdrawal_cancelled: "Withdrawal cancelled",
  delegator_withdrawal_completed: "Withdrawn",
  delegator_move_stake: "Stake moved",
  delegator_claimed_rewards: "Rewards claimed",
  delegator_claim_rewards: "Rewards claimed",
  delegator_restaked_rewards: "Rewards restaked",
  validator_stake: "Validator stake",
  validator_withdrawal_initiated: "Validator withdrawal requested",
  validator_withdrawal_completed: "Validator withdrawn",
  validator_claim_rewards: "Validator rewards claimed",
};

export function parseActivity(row: VoyagerActivity): ActivityEvent {
  if (
    !/^\d+$/.test(row.amount) ||
    !Number.isFinite(Date.parse(row.timestamp)) ||
    !Number.isInteger(row.tokenInfo.decimals)
  ) {
    throw new Error("Invalid staking activity");
  }
  return {
    operation: operations[row.name] ?? row.name.replaceAll("_", " "),
    origin: row.delegatorAddress || row.stakerAddress,
    amount: row.amount,
    decimals: row.tokenInfo.decimals,
    symbol: row.tokenInfo.symbol,
    transactionHash: row.txnHash,
    timestamp: Date.parse(row.timestamp) / 1000,
  };
}

export function parseAttestation(row: AttestationRecord): AttestationRecord {
  if (
    !Number.isInteger(row.epochId) ||
    !Number.isInteger(row.blockNumber) ||
    !/^0x[0-9a-f]+$/i.test(row.transactionHash)
  ) {
    throw new Error("Invalid attestation");
  }
  return {
    epochId: row.epochId,
    blockNumber: row.blockNumber,
    transactionHash: row.transactionHash,
  };
}
