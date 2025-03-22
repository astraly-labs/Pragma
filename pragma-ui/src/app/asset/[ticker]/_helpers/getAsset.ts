import { AssetInfo } from "@/pages/deprecated-assets";

type GetAsset = {
  source?: string;
  ticker: string;
};

export const getAsset = async ({ source, ticker }: GetAsset) => {
  const base = ticker.split("%2F")[0].toLowerCase();
  const quote = ticker.split("%2F")[1].toLowerCase();

  const encodedTicker = encodeURIComponent(`${base}/${quote}`);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_INTERNAL_API}/onchain/${encodedTicker}?network=${source}&aggregation=median`
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch ${encodedTicker} asset`);
  }

  const data: AssetInfo = await response.json();

  return data;
};
