import type { NextApiRequest, NextApiResponse } from "next";
import { fetchExplorer } from "@/lib/explorer-api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") return res.status(405).end();
  const name = req.query.name;
  if (typeof name !== "string" || !/^[A-Za-z0-9_.-]{1,64}$/.test(name)) {
    return res.status(400).json({ error: "Invalid publisher" });
  }
  const id = name.toUpperCase() === "READY" ? "ARGENT" : name;
  try {
    const data = await fetchExplorer(
      `/onchain/publisher/${encodeURIComponent(id)}?network=starknet-mainnet&data_type=Spot`
    );
    return data
      ? res.status(200).json(data)
      : res.status(404).json({ error: "Publisher not found" });
  } catch {
    return res
      .status(502)
      .json({ error: "Publisher data temporarily unavailable" });
  }
}
