export const networkId = (): Network => "mainnet-alpha";

export const getExplorerBaseUrl = (): string => {
  return "https://voyager.online";
};

export const buildExplorerUrlForAddress = (address: string): string => {
  const baseUrl = getExplorerBaseUrl();
  const path = "/contract/" + address;
  return baseUrl + path;
};

export const buildExplorerUrlForTransaction = (transaction: string): string => {
  const baseUrl = getExplorerBaseUrl();
  const path = "/tx/" + transaction;
  return baseUrl + path;
};

export type Network = "mainnet-alpha";
