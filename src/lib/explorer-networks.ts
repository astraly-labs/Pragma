// Keep the deployment and its label together when Miden moves to mainnet.
// The stable `miden` source preserves feed URLs across that switch.
export const MIDEN_DEPLOYMENT = {
  network: "testnet",
  apiUrl: "https://miden.pragma.build",
  explorerUrl: "https://testnet.midenscan.com",
  oracle: "mtst1aqxnneud7y34z5gwc5z8vu95pcsdmcxm",
  publisher: "mtst1apk7pswf5s744ygr5v4wxjxt4g0tmmsy",
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
