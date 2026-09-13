import type { NextApiRequest, NextApiResponse } from "next";
import { fetchExplorer } from "@/lib/explorer-api";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") return res.status(405).end();
  if (
    req.query.network !== "starknet-mainnet" ||
    !["Spot", "Perp"].includes(String(req.query.data_type))
  )
    return res.status(400).json({ error: "Invalid source" });
  try {
    const query = new URLSearchParams({
      network: "starknet-mainnet",
      data_type: String(req.query.data_type),
    });
    return res
      .status(200)
      .json(await fetchExplorer(`/onchain/publishers?${query}`));
  } catch {
    return res
      .status(502)
      .json({ error: "Publisher data temporarily unavailable" });
  }
}
