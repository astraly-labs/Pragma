import type { NextApiRequest, NextApiResponse } from "next";

export const config = { maxDuration: 300 };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    pairs: rawPairs,
    interval = "1s",
    aggregation = "median",
    historical_prices = "10",
  } = req.query;
  const pairs = typeof rawPairs === "string" ? [rawPairs] : rawPairs;
  if (!pairs?.length) {
    res.status(400).json({ error: "pairs parameter is required" });
    return;
  }

  const pairsQuery = pairs
    .map((pair) => `pairs=${encodeURIComponent(pair)}`)
    .join("&");
  const apiUrl = `${process.env.NEXT_PUBLIC_INTERNAL_API}/data/multi/stream?${pairsQuery}&interval=${interval}&aggregation=${aggregation}&historical_prices=${historical_prices}`;
  const controller = new AbortController();
  const abort = () => controller.abort();
  res.on("close", abort);
  const connectTimeout = setTimeout(abort, 20000);

  try {
    const response = await fetch(apiUrl, {
      headers: process.env.API_KEY ? { "x-api-key": process.env.API_KEY } : {},
      signal: controller.signal,
    });
    clearTimeout(connectTimeout);
    if (!response.ok || !response.body) {
      res
        .status(response.ok ? 502 : response.status)
        .json({ error: "Price stream unavailable" });
      return;
    }

    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET",
      "Access-Control-Allow-Headers": "Content-Type",
    });
    res.write(`data: ${JSON.stringify({ connected: true })}\n\n`);
    const reader = response.body.getReader();
    try {
      while (!controller.signal.aborted) {
        const { value, done } = await reader.read();
        if (done) break;
        res.write(value);
      }
    } finally {
      await reader.cancel().catch(() => {});
      reader.releaseLock();
    }
  } catch (error) {
    if (!controller.signal.aborted) {
      console.error("[📡 Price stream] Upstream connection failed", error);
      if (!res.headersSent)
        res.status(502).json({ error: "Price stream unavailable" });
    }
  } finally {
    clearTimeout(connectTimeout);
    controller.abort();
    res.off("close", abort);
    if (!res.writableEnded) res.end();
  }
}
