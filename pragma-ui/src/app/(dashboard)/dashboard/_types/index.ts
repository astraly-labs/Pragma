type Source = {
  name: string;
  id: string;
  is_active: boolean;
  url: string;
};

export type FormData = {
  type: OracleContentType;
  assetAddress: string;
  tokenName: string;
  ticker: string;
  network: string;
  selectedPairs: [] | Source[];
  sources: [] | Source[];
  submitSuccess?: boolean;
};

export type OracleContentType =
  | "api"
  | "centralized"
  | "decentralized"
  | "zk-proven";
