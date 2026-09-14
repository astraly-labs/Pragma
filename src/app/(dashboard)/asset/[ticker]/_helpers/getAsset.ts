import { fetchExplorer } from "@/lib/explorer-api";
import { AssetInfo } from "@/app/(dashboard)/assets/_types";
import { getEncodedTicker } from "./getEncodedTicker";

export const getAsset = async ({
  ticker,
}: {
  source?: string;
  ticker: string;
}) =>
  fetchExplorer<AssetInfo>(
    `/onchain/${getEncodedTicker(ticker)}?network=starknet-mainnet&aggregation=median`
  );
