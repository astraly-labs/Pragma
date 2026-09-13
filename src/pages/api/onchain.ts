import type { NextApiRequest, NextApiResponse } from "next";
import { fetchExplorer } from "@/lib/explorer-api";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") return res.status(405).end();
  const { network = "mainnet", pair = "btc/usd" } = req.query;
  if (
    network !== "mainnet" ||
    typeof pair !== "string" ||
    !/^[A-Za-z0-9_.]+\/[A-Za-z0-9_.]+$/.test(pair)
  )
    return res.status(400).json({ error: "Invalid pair or network" });
  try {
    return res
      .status(200)
      .json(
        await fetchExplorer(
          `/onchain/${encodeURIComponent(pair)}?network=starknet-mainnet&aggregation=median`
        )
      );
  } catch {
    return res.status(502).json({ error: "Price temporarily unavailable" });
  }
}
