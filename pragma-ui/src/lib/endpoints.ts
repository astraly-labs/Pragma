export const dataSources: Record<Sources, string> = {
  sepolia: "/api/onchain?network=sepolia",
  mainnet: "/api/onchain?network=mainnet",
  api: "/api/stream",
  "api-prod": "/api/stream?env=production",
  tokensApi: "/api/tokens/all",
  publishersSepolia: "/api/publishers?network=sepolia&dataType=spot_entry",
  publishersMainnet: "/api/publishers?network=mainnet&dataType=spot_entry",
  checkpointsSepolia: "/api/checkpoints?network=sepolia",
  checkpointsMainnet: "/api/checkpoints?network=mainnet",
};

export type Sources =
  | "sepolia"
  | "mainnet"
  | "api"
  | "api-prod"
  | "tokensApi"
  | "publishersSepolia"
  | "publishersMainnet"
  | "checkpointsSepolia"
  | "checkpointsMainnet";

export const initialAssets = [
  { ticker: "BTC/USD", address: "0x0", decimals: 18 },
  { ticker: "ETH/USD", address: "0x1", decimals: 18 },
  { ticker: "STRK/USD", address: "0x1", decimals: 18 },
  { ticker: "SUI/USD", address: "0x1", decimals: 18 },
  { ticker: "AAVE/USD", address: "0x1", decimals: 18 },
];
