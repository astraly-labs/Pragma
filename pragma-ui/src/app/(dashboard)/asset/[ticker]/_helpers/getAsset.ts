import { AssetInfo } from "@/app/(dashboard)/assets/_types";
import { getEncodedTicker } from "./getEncodedTicker";

type GetAsset = {
  source?: string;
  ticker: string;
};

export const getAsset = async ({ source, ticker }: GetAsset) => {
  const encodedTicker = getEncodedTicker(ticker);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_INTERNAL_API}/onchain/${encodedTicker}?network=${source}&aggregation=median`
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch ${encodedTicker} asset`);
  }

  const data: AssetInfo = await response.json();

  return data;
};
