import { fetchExplorer } from "@/lib/explorer-api";
import { AssetInfo } from "@/app/(dashboard)/assets/_types";
import { getEncodedTicker } from "./getEncodedTicker";

type GetAsset = {
  source?: string;
  ticker: string;
};

export const getAsset = async ({ source, ticker }: GetAsset) => {
  const encodedTicker = getEncodedTicker(ticker);

  let url: string = "";

  if (source === "api") {
    url = `/offchain/data/${encodedTicker}?network=${source}&aggregation=median&with_components=true&interval=1min`;
  } else {
    url = `/onchain/${encodedTicker}?network=starknet-${source}&aggregation=median`;
  }

  return fetchExplorer<AssetInfo>(url);
};
