import { fetchExplorer } from "@/lib/explorer-api";
import { Checkpoint } from "@/app/(dashboard)/assets/_types";

type GetCheckpoints = {
  source?: string;
  ticker: string;
};

export const getCheckpoints = async ({ source, ticker }: GetCheckpoints) => {
  if (source !== "mainnet") {
    return [];
  }

  const base = ticker.split("%2F")[0].toLowerCase();
  const quote = ticker.split("%2F")[1].toLowerCase();

  const encodedTicker = encodeURIComponent(`${base}/${quote}`);

  const url = `/onchain/checkpoints?pair=${encodedTicker}&network=starknet-${source}`;
  return fetchExplorer<Checkpoint[]>(url);
};
