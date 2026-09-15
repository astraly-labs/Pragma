import type { AssetInfo } from "@/app/(dashboard)/assets/_types";
import { MIDEN_DEPLOYMENT } from "./explorer-networks";

const ICONS = new Set([
  "btc",
  "eth",
  "wbtc",
  "usdt",
  "dai",
  "link",
  "uni",
  "aave",
]);

export function midenAssets(data: unknown): AssetInfo[] {
  if (!Array.isArray(data)) throw new Error("Invalid Miden price response");
  const seen = new Set<string>();
  return data.map((row) => {
    if (
      !row ||
      typeof row.symbol !== "string" ||
      !/^[A-Z0-9_.]+\/USD$/.test(row.symbol) ||
      seen.has(row.symbol)
    ) {
      throw new Error("Invalid Miden price response");
    }
    seen.add(row.symbol);
    const base = row.symbol.split("/")[0].toLowerCase();
    const validPrice =
      typeof row.price === "number" &&
      Number.isFinite(row.price) &&
      row.price > 0;
    // /api/prices has already scaled the median. Its 24h fields are exchange
    // statistics; it supplies no oracle observation time or source count.
    return {
      image: ICONS.has(base) ? `/assets/currencies/${base}.svg` : "",
      type: ["xaut", "paxg"].includes(base) ? "Gold-backed token" : "Crypto",
      ticker: row.symbol,
      price: validPrice ? row.price : 0,
      error: validPrice ? undefined : "Price unavailable",
      lastUpdated: "Not reported",
      sources: null,
      variations: { past1h: "—", past24h: "—", past7d: "—" },
      chart: "",
      ema: "",
      macd: "",
    };
  });
}

export async function getMidenPrices(): Promise<AssetInfo[]> {
  const server = typeof window === "undefined";
  const response = await fetch(
    server ? `${MIDEN_DEPLOYMENT.apiUrl}/api/prices` : "/api/miden",
    { signal: AbortSignal.timeout(25000), cache: "no-store" }
  );
  if (!response.ok) throw new Error("Miden prices are temporarily unavailable");
  const data = await response.json();
  return server ? midenAssets(data) : data;
}
