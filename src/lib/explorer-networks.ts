// Keep the deployment and its label together when Miden moves to mainnet.
// The stable `miden` source preserves feed URLs across that switch.
export const MIDEN_DEPLOYMENT = {
  network: "testnet",
  apiUrl: "https://miden.pragma.build",
  explorerUrl: "https://testnet.midenscan.com",
  oracle: "mtst1aqanqmvpngvmdyfq2jqwzcvmtsvexd5u",
  publisher: "mtst1aq32gfucapgeey2zznc6vvqfeqh5h4rt",
};

export const EXPLORER_NETWORKS = {
  mainnet: "Starknet mainnet",
  miden: `Miden ${MIDEN_DEPLOYMENT.network}`,
};

export const SUPPORTED_SOURCES = Object.keys(EXPLORER_NETWORKS);

export function explorerSource(source: unknown): string {
  return typeof source === "string" && SUPPORTED_SOURCES.includes(source)
    ? source
    : "mainnet";
}
