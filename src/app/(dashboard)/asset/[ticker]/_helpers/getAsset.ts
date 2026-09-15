import { fetchExplorer } from "@/lib/explorer-api";
import { AssetInfo } from "@/app/(dashboard)/assets/_types";
import { getEncodedTicker } from "./getEncodedTicker";
import { getMidenPrices } from "@/lib/miden-api";

export const getAsset = async ({
  ticker,
  source,
}: {
  source?: string;
  ticker: string;
}) => {
  if (source === "miden") {
    const pair = decodeURIComponent(ticker).toUpperCase();
    return (await getMidenPrices()).find((asset) => asset.ticker === pair);
  }
  return fetchExplorer<AssetInfo>(
    `/onchain/${getEncodedTicker(ticker)}?network=starknet-mainnet&aggregation=median`
  );
};
