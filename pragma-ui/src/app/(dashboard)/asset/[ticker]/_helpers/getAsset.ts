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
    url = `${process.env.NEXT_PUBLIC_INTERNAL_API}/offchain/data/${encodedTicker}?network=${source}&aggregation=median&with_components=true&interval=1h`;
  } else {
    url = `${process.env.NEXT_PUBLIC_INTERNAL_API}/onchain/${encodedTicker}?network=${source}&aggregation=median`;
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch ${encodedTicker} asset`);
  }

  const data: AssetInfo = await response.json();

  return data;
};
