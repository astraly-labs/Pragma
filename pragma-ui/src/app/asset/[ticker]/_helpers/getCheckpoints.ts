import { Checkpoint } from "@/app/assets/_types";

type GetCheckpoints = {
  source?: string;
  ticker: string;
};

export const getCheckpoints = async ({ source, ticker }: GetCheckpoints) => {
  if (source === "api") {
    return [];
  }

  const base = ticker.split("%2F")[0].toLowerCase();
  const quote = ticker.split("%2F")[1].toLowerCase();

  const encodedTicker = encodeURIComponent(`${base}/${quote}`);

  const url = `${process.env.NEXT_PUBLIC_INTERNAL_API}/onchain/checkpoints?pair=${encodedTicker}&network=${source}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch checkpoints for ${ticker}`);
  }

  const data: Checkpoint[] = await response.json();

  return data;
};
