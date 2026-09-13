import type { NextApiRequest, NextApiResponse } from "next";
import { fetchExplorer } from "@/lib/explorer-api";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") return res.status(405).end();
  try {
    return res.status(200).json(await fetchExplorer("/tokens/all"));
  } catch {
    return res
      .status(502)
      .json({ error: "Feed directory temporarily unavailable" });
  }
}
