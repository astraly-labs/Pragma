export const dataSources: Record<Sources, string> = {
  mainnet: "/api/onchain?network=mainnet",
  api: "/api/stream?env=production",
  tokensApi: "/api/tokens/all?env=production",
  publishersMainnet: "/api/publishers?network=mainnet&data_type=Spot",
  checkpointsMainnet: "/api/checkpoints?network=mainnet",
};

export type Sources =
  | "mainnet"
  | "api"
  | "tokensApi"
  | "publishersMainnet"
  | "checkpointsMainnet";

export const initialAssets = [
  { ticker: "BTC/USD", address: "0x0", decimals: 18 },
  { ticker: "ETH/USD", address: "0x1", decimals: 18 },
  { ticker: "STRK/USD", address: "0x1", decimals: 18 },
  { ticker: "SUI/USD", address: "0x1", decimals: 18 },
  { ticker: "AAVE/USD", address: "0x1", decimals: 18 },
];
