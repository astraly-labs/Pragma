export const getExplorerBaseUrl = (network: Network): string | undefined => {
  if (network === "mainnet-alpha") {
    return "https://voyager.online";
  } else if (network === "goerli-alpha") {
    return "https://goerli.voyager.online";
  }
};

export const buildExplorerUrlForAddress = (
  address: string,
  network: Network
): string => {
  const baseUrl = getExplorerBaseUrl(network);
  const path = "/contract/" + address;
  return baseUrl + path;
};

export const buildExplorerUrlForTransaction = (
  transaction: string,
  network: Network
): string => {
  const baseUrl = getExplorerBaseUrl(network);
  const path = "/tx/" + transaction;
  return baseUrl + path;
};

export type Network = "mainnet-alpha" | "goerli-alpha" | "localhost";
