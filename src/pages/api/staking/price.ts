import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }
  try {
    const start = Math.floor(Date.now() / 1000) - 7 * 24 * 3600;
    const response = await fetch(
      `https://coins.llama.fi/chart/coingecko:starknet?start=${start}&span=168&period=1h`,
      { signal: AbortSignal.timeout(10000) }
    );
    if (!response.ok) throw new Error("Reference price unavailable");
    const json = await response.json();
    const prices = json.coins?.["coingecko:starknet"]?.prices;
    if (!Array.isArray(prices)) throw new Error("Missing price history");
    const points = prices
      .filter(
        (point) =>
          Number.isFinite(point.timestamp) &&
          Number.isFinite(point.price) &&
          point.price > 0
      )
      .map((point) => ({
        timestamp: point.timestamp * 1000,
        price: point.price,
      }))
      .sort((a, b) => a.timestamp - b.timestamp);
    if (points.length < 2) throw new Error("Insufficient price history");
    res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=300");
    return res.status(200).json({ points });
  } catch {
    return res
      .status(502)
      .json({ error: "STRK price history is temporarily unavailable." });
  }
}
