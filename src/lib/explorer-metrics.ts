import type { Component, Price } from "@/app/(dashboard)/assets/_types";
import { DEFAULT_ASSETS } from "./constants";

export const HISTORY_RANGES = {
  "1h": 3600,
  "6h": 21600,
  "24h": 86400,
  "7d": 604800,
};
export type HistoryRange = keyof typeof HISTORY_RANGES;
export type HistoryPoint = {
  timestamp: number;
  median_price: string;
  decimals: number;
};
export type ObservationHistory = {
  pair_id: string;
  decimals: number;
  bucket_seconds: number;
  truncated: boolean;
  observations: Price[];
};

export function priceNumber(
  price: string | number,
  decimals: number,
  pair?: string
) {
  // The indexer reports zero when its precision lookup fails. Use the known
  // Starknet feed precision only for display; leave the response untouched.
  const displayDecimals =
    decimals === 0 && pair
      ? (DEFAULT_ASSETS.find((asset) => asset.ticker === pair.toUpperCase())
          ?.decimals ?? decimals)
      : decimals;
  // Numeric API prices are already scaled by the reported precision; strings
  // contain raw oracle units (including hexadecimal observations).
  const exponent =
    typeof price === "number" ? displayDecimals - decimals : displayDecimals;
  const value = Number(price) / 10 ** exponent;
  return Number.isFinite(value) ? value : NaN;
}

export function priceLabel(price: number) {
  return Number.isFinite(price)
    ? price.toLocaleString("en-US", { maximumSignificantDigits: 10 })
    : "Unavailable";
}

export function ageLabel(timestamp: number, now: number) {
  if (!timestamp || !Number.isFinite(timestamp)) return "Not reported";
  const seconds = Math.max(0, now - timestamp);
  if (seconds < 60) return `${Math.floor(seconds)}s ago`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400)
    return `${Math.floor(seconds / 3600)}h ${Math.floor((seconds % 3600) / 60)}m ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

export function groupMarkets(components: Component[]) {
  const groups = new Map<string, Component[]>();
  for (const component of components) {
    const group = groups.get(component.pair_id) ?? [];
    group.push(component);
    groups.set(component.pair_id, group);
  }
  return Array.from(groups)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([pair, sources]) => ({
      pair,
      sources: sources.sort((a, b) => a.source.localeCompare(b.source)),
      timestamp: Math.max(
        ...sources.map((source) => source.last_updated_timestamp)
      ),
      updates: sources.reduce((sum, source) => sum + source.daily_updates, 0),
    }));
}

export type ChartSeries = {
  name: string;
  color: string;
  points: { timestamp: number; price: number }[];
  gap: number;
};

/** Separate segments prevent the chart from bridging an observation gap. */
export function chartData(series: ChartSeries[]) {
  const timestamps = new Set<number>();
  const lines: {
    key: string;
    name: string;
    color: string;
    data: { timestamp: number; price: number }[];
  }[] = [];
  series.forEach((series, index) => {
    let segment = 0;
    let previous = 0;
    let key = "";
    for (const point of [...series.points].sort(
      (a, b) => a.timestamp - b.timestamp
    )) {
      if (!Number.isFinite(point.price) || point.price <= 0) continue;
      if (!key || point.timestamp - previous > series.gap) {
        key = `s${index}_${segment++}`;
        lines.push({ key, name: series.name, color: series.color, data: [] });
      }
      timestamps.add(point.timestamp);
      lines[lines.length - 1].data.push(point);
      previous = point.timestamp;
    }
  });
  return {
    rows: Array.from(timestamps)
      .sort((a, b) => a - b)
      .map((timestamp) => ({ timestamp })),
    lines,
  };
}
