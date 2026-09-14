"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type PricePoint = { timestamp: number; price: number };
const priceLabel = (value: number) => `$${value.toFixed(5)}`;

export function StrkChart() {
  const [period, setPeriod] = useState<1 | 7>(7);
  const { data, isLoading, refetch, isFetching } = useQuery<{
    points: PricePoint[];
  }>({
    queryKey: ["staking-strk-history"],
    queryFn: async () => {
      const response = await fetch("/api/staking/price", {
        signal: AbortSignal.timeout(15000),
      });
      if (!response.ok) throw new Error("Price history unavailable");
      return response.json();
    },
    staleTime: 300000,
    refetchInterval: 300000,
    retry: false,
  });
  const latest = data?.points.at(-1);
  const points =
    data?.points.filter(
      (point) => point.timestamp >= (latest?.timestamp ?? 0) - period * 86400000
    ) ?? [];
  const change =
    latest && points.length > 1
      ? (latest.price / points[0].price - 1) * 100
      : null;

  return (
    <section
      className="staking-price-panel"
      aria-labelledby="strk-price-heading"
    >
      <div className="staking-price-heading">
        <div>
          <h3 id="strk-price-heading">STRK / USD</h3>
          <span className="eyebrow">Market reference</span>
        </div>
        <div className="price-periods" aria-label="Price history period">
          {([1, 7] as const).map((days) => (
            <button
              key={days}
              aria-pressed={period === days}
              onClick={() => setPeriod(days)}
            >
              {days === 1 ? "24H" : "7D"}
            </button>
          ))}
        </div>
      </div>
      {latest && (
        <div className="staking-price-value">
          <strong>{priceLabel(latest.price)}</strong>
          {change !== null && (
            <span>
              {change > 0 ? "+" : ""}
              {change.toFixed(2)}%{" "}
              <small> / {period === 1 ? "24H" : "7D"}</small>
            </span>
          )}
        </div>
      )}
      <div className="staking-price-chart">
        {isLoading ? (
          <div className="explorer-empty" role="status">
            Loading STRK price history…
          </div>
        ) : points.length > 1 ? (
          <ResponsiveContainer width="100%" height="100%" minWidth={0}>
            <AreaChart
              data={points}
              margin={{ top: 12, right: 10, bottom: 0, left: 0 }}
              accessibilityLayer
            >
              <defs>
                <linearGradient
                  id="strk-price-fill"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#ff7946" stopOpacity={0.24} />
                  <stop offset="100%" stopColor="#ff7946" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#ffffff12" vertical={false} />
              <XAxis
                dataKey="timestamp"
                type="number"
                domain={["dataMin", "dataMax"]}
                tickFormatter={(value) =>
                  period === 1
                    ? new Date(value).toLocaleTimeString("en-GB", {
                        hour: "2-digit",
                        minute: "2-digit",
                        timeZone: "UTC",
                      })
                    : new Date(value).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        timeZone: "UTC",
                      })
                }
                tick={{ fill: "#aaaead", fontSize: 10 }}
                axisLine={false}
                tickLine={false}
                minTickGap={40}
              />
              <YAxis
                domain={[
                  (min: number) => min * 0.995,
                  (max: number) => max * 1.005,
                ]}
                tickFormatter={(value) => `$${value.toFixed(3)}`}
                tick={{ fill: "#aaaead", fontSize: 10 }}
                axisLine={false}
                tickLine={false}
                width={54}
              />
              <Tooltip
                formatter={(value: number) => [priceLabel(value), "STRK / USD"]}
                labelFormatter={(label) =>
                  `${new Date(Number(label)).toLocaleString("en-GB", { timeZone: "UTC" })} UTC`
                }
                contentStyle={{
                  background: "#191d20",
                  border: "1px solid #ffffff24",
                  color: "#f2f0e9",
                  fontSize: 12,
                }}
                itemStyle={{ color: "#ff7946" }}
              />
              <Area
                type="linear"
                dataKey="price"
                stroke="#ff7946"
                strokeWidth={2}
                fill="url(#strk-price-fill)"
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="explorer-empty" role="status">
            <p>Price history is temporarily unavailable.</p>
            <button
              onClick={() => refetch()}
              disabled={isFetching}
              className="text-link"
            >
              {isFetching ? "Loading…" : "Try again"}
            </button>
          </div>
        )}
      </div>
      <p className="staking-price-source">
        <a
          href="https://defillama.com/coin/coingecko/starknet"
          target="_blank"
          rel="noopener noreferrer"
        >
          Source: DefiLlama ↗
        </a>
        {latest && (
          <span>
            As of{" "}
            {new Date(latest.timestamp).toLocaleString("en-GB", {
              day: "numeric",
              month: "short",
              hour: "2-digit",
              minute: "2-digit",
              timeZone: "UTC",
            })}{" "}
            UTC
          </span>
        )}
      </p>
    </section>
  );
}
