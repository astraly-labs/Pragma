import { fetchExplorer } from "@/lib/explorer-api";
import { getLogoPath } from "../../../../../../utils/mappings";
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
  const asset = await fetchExplorer<AssetInfo>(
    `/onchain/${getEncodedTicker(ticker)}?network=starknet-mainnet&aggregation=median`
  );
  return asset ? { ...asset, image: getLogoPath(asset.ticker) } : asset;
};
