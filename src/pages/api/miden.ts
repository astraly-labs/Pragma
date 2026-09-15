import type { NextApiRequest, NextApiResponse } from "next";
import { getMidenPrices } from "@/lib/miden-api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") return res.status(405).end();
  res.setHeader("Cache-Control", "no-store");
  try {
    return res.status(200).json(await getMidenPrices());
  } catch {
    return res
      .status(502)
      .json({ error: "Miden prices are temporarily unavailable" });
  }
}
