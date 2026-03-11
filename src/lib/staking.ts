export const STAKING_CONTRACT_ADDRESS =
  "0x00ca1702e64c81d9a07b86bd2c540188d92a2c73cf5cc0e508d949015e7e84a7";

export const PRAGMA_VALIDATOR_ADDRESS =
  "0x077d4b4e7ae321aabd0a5a7322108635fcbd0cd746f9ae217b8ea00363494b65";

export const PRAGMA_RPC_URL =
  process.env.NEXT_PUBLIC_PRAGMA_RPC_URL ||
  "https://starknet-mainnet.g.alchemy.com/starknet/version/rpc/v0_9/demo";

export const VOYAGER_DELEGATE_URL =
  "https://voyager.online/staking?validator=0x077d4b4e7ae321aabd0a5a7322108635fcbd0cd746f9ae217b8ea00363494b65&view=delegator";

export const ENDUR_DELEGATE_URL =
  "https://dashboard.endur.fi/stake?validator=0x077d4b4e7ae321aabd0a5a7322108635fcbd0cd746f9ae217b8ea00363494b65";

export const STRK_DECIMALS = 18;

export const ALCHEMY_RPC_URL = PRAGMA_RPC_URL;

export const PRAGMA_FELT =
  "0x77d4b4e7ae321aabd0a5a7322108635fcbd0cd746f9ae217b8ea00363494b65";

export const POOL_CONTRACT =
  "0x3199ff0f152426280502dad5d554448ad211c3b62d82c01114986c421e65388";

export const EVENT_SELECTORS = {
  NewPoolMember:
    "0x15cacaf40e1ed87da5ca636ad8371422b9763884d3ea9fb51a80deeb3efee17",
  PoolMemberBalanceChanged:
    "0x12fcc597331e03a437b0bd35825696e703442a6ac519414752eba1197a3474",
  PoolMemberRewardClaimed:
    "0xc4a5eb3afec3e38cbe8f43f66c46bb0ca74ae6f10bfbd7c7f0f461d5cdb9f4",
  PoolMemberExitIntent:
    "0x2e309d31f742f40d496b60a19924887d14030b501c6e3cbeee4527ed7afb66",
  DeletePoolMember:
    "0x79af28f3063daeac2460243a72f25ed5d967133a3fb0077e045687076c531c",
  StakerRewardsUpdated:
    "0x28b7fe11255d1d3dd57160f700d3a9f7b51d41e927d09d064883fb2cb45a8a8",
  RewardsSuppliedToDelegationPool:
    "0x99f25da3a1ac61dd57efe764c2d59fe1c7a46f1af83f02cacb02788604e458",
} as const;

export const EVENT_NAMES: Record<string, string> = {
  [EVENT_SELECTORS.NewPoolMember]: "Delegated",
  [EVENT_SELECTORS.PoolMemberBalanceChanged]: "Stake Changed",
  [EVENT_SELECTORS.PoolMemberRewardClaimed]: "Reward Claimed",
  [EVENT_SELECTORS.PoolMemberExitIntent]: "Exit Intent",
  [EVENT_SELECTORS.DeletePoolMember]: "Undelegated",
  [EVENT_SELECTORS.StakerRewardsUpdated]: "Rewards Updated",
  [EVENT_SELECTORS.RewardsSuppliedToDelegationPool]: "Rewards Supplied",
};

export interface DelegatorInfo {
  address: string;
  amount: string;
  share: number;
  isActive: boolean;
}

export interface ActivityEvent {
  operation: string;
  origin: string;
  amount: string;
  transactionHash: string;
  blockNumber: number;
  timestamp: number;
}

export interface AttestationRecord {
  epochId: number;
  blockNumber: number;
  transactionHash: string;
}

export interface StakingEventsData {
  delegators: DelegatorInfo[];
  activity: ActivityEvent[];
  attestations: AttestationRecord[];
}

export interface StakerInfoParsed {
  rewardAddress: string;
  operationalAddress: string;
  isUnstaking: boolean;
  amountOwn: bigint;
  unclaimedRewardsOwn: bigint;
  hasPool: boolean;
  poolContract: string | null;
  poolDelegatedAmount: bigint;
  poolCommission: number;
}

export interface EpochInfoParsed {
  currentEpoch: number;
  epochDuration: number;
  epochLength: number;
  startingBlock: number;
  startingEpoch: number;
  previousLength: number;
  previousEpochDuration: number;
}

export interface StakingData {
  validator: {
    name: string;
    address: string;
  };
  stakerInfo: StakerInfoParsed;
  epochInfo: EpochInfoParsed;
  totalNetworkStake: bigint;
  currentBlockNumber: number;
}

export const ENDUR_API_URL =
  "https://api.dashboard.endur.fi/api/query/validators?page=1&per_page=400&sort_by=total_stake&sort_order=desc";

export interface StakingDataSerialized {
  validator: { name: string; address: string };
  liveliness: number;
  apy: number;
  delegatorsCount: number;
  activeSince: string | null;
  stakerInfo: {
    rewardAddress: string;
    operationalAddress: string;
    isUnstaking: boolean;
    amountOwn: string;
    unclaimedRewardsOwn: string;
    hasPool: boolean;
    poolContract: string | null;
    poolDelegatedAmount: string;
    poolCommission: number;
  };
  epochInfo: EpochInfoParsed;
  totalNetworkStake: string;
  currentBlockNumber: number;
}

const STRK_DIVISOR = BigInt("1000000000000000000"); // 10^18

export function formatSTRK(amount: string | bigint): string {
  const val = typeof amount === "string" ? BigInt(amount) : amount;
  const whole = val / STRK_DIVISOR;
  const frac = (val % STRK_DIVISOR)
    .toString()
    .padStart(STRK_DECIMALS, "0")
    .slice(0, 2);
  return `${whole.toLocaleString()}.${frac}`;
}

export function truncateAddress(address: string): string {
  if (address.length <= 12) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}
