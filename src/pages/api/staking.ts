import type { NextApiRequest, NextApiResponse } from "next";
import type { StakingDataSerialized } from "@/lib/staking";
import { fetchStakingData } from "@/lib/fetchStakingData";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<StakingDataSerialized | { error: string }>
) {
  try {
    const data = await fetchStakingData();
    res.setHeader("Cache-Control", "s-maxage=30, stale-while-revalidate=60");
    res.status(200).json(data);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Staking API error:", message);
    res.status(500).json({ error: message });
  }
}
