// TODO: Make this adaptive in the future
export const networkId = (): Network => "mainnet-alpha";

export const getExplorerBaseUrl = (): string | undefined => {
  if (networkId() === "mainnet-alpha") {
    return "https://voyager.online";
  } else if (networkId() === "goerli-alpha") {
    return "https://sepolia.voyager.online";
  } else if (networkId() === "goerli2-alpha") {
    return "https://goerli-2.voyager.online";
  }
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

export type Network =
  | "mainnet-alpha"
  | "goerli2-alpha"
  | "goerli-alpha"
  | "localhost";
