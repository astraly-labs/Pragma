import type { NextApiRequest, NextApiResponse } from "next";
import { fetchExplorer } from "@/lib/explorer-api";
import { HISTORY_RANGES, type HistoryRange } from "@/lib/explorer-metrics";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") return res.status(405).end();
  const { pair, range, kind, publisher, source } = req.query;
  if (
    typeof pair !== "string" ||
    !/^[A-Za-z0-9_.]+\/[A-Za-z0-9_.]+$/.test(pair) ||
    typeof range !== "string" ||
    !Object.hasOwn(HISTORY_RANGES, range) ||
    (kind !== "aggregate" && kind !== "observations") ||
    [publisher, source].some(
      (value) =>
        value !== undefined &&
        (typeof value !== "string" || !/^[A-Za-z0-9_.-]{1,64}$/.test(value))
    )
  ) {
    return res.status(400).json({ error: "Invalid history selection" });
  }
  const end = Math.floor(Date.now() / 30000) * 30;
  const start = end - HISTORY_RANGES[range as HistoryRange];
  const query = new URLSearchParams({
    network: "starknet-mainnet",
    timestamp: `${start},${end}`,
  });
  if (kind === "aggregate")
    query.set("chunk_interval", range === "7d" ? "15min" : "1min");
  if (typeof publisher === "string") query.set("publisher", publisher);
  if (typeof source === "string") query.set("source", source);
  try {
    const data = await fetchExplorer(
      `/onchain/${kind === "aggregate" ? "history" : "observations"}/${pair.toUpperCase()}?${query}`
    );
    if (kind === "aggregate" && !Array.isArray(data))
      throw new Error("Invalid history");
    return res.status(200).json({ start, end, data });
  } catch {
    return res
      .status(502)
      .json({ error: "Price history temporarily unavailable" });
  }
}
