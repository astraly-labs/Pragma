"use client";

import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { AssetInfo, Price } from "@/app/(dashboard)/assets/_types";
import {
  ageLabel,
  chartData,
  HISTORY_RANGES,
  priceLabel,
  priceNumber,
  type ChartSeries,
  type HistoryPoint,
  type HistoryRange,
  type ObservationHistory,
} from "@/lib/explorer-metrics";
import { getPublisherName, truncateTxHash } from "@/utils";

type WindowData<T> = { start: number; end: number; data: T };
const colors = [
  "#83c5be",
  "#d4b3ff",
  "#f2cc60",
  "#7ba7ef",
  "#e496ac",
  "#b7cb75",
  "#cbb9a8",
];
const timeLabel = (timestamp: number) =>
  new Date(timestamp * 1000).toISOString().slice(11, 16);
const exactTime = (timestamp: number) =>
  new Date(timestamp * 1000)
    .toISOString()
    .replace("T", " ")
    .replace(".000Z", " UTC");

async function fetchData<T>(url: string, signal: AbortSignal): Promise<T> {
  const response = await fetch(url, {
    signal: AbortSignal.any([signal, AbortSignal.timeout(28000)]),
  });
  if (!response.ok) throw new Error("Observations unavailable");
  return response.json();
}

export function AssetExplorer({
  asset,
  initialPublisher = "",
  initialSource,
  asOf,
}: {
  asset: AssetInfo;
  initialPublisher?: string;
  initialSource?: string;
  asOf: number;
}) {
  const [range, setRange] = useState<HistoryRange>("24h");
  const [publisher, setPublisher] = useState(
    initialPublisher === "READY" ? "ARGENT" : initialPublisher
  );
  const [sources, setSources] = useState<string[] | null>(
    initialSource ? [initialSource] : null
  );
  const [showMedian, setShowMedian] = useState(true);
  const [now, setNow] = useState(asOf);
  useEffect(() => {
    const timer = setInterval(
      () => setNow(Math.floor(Date.now() / 1000)),
      15000
    );
    return () => clearInterval(timer);
  }, []);
  const latest = useQuery<AssetInfo>({
    queryKey: ["asset-observations", asset.ticker],
    queryFn: ({ signal }) =>
      fetchData(
        `/api/onchain?network=mainnet&pair=${encodeURIComponent(asset.ticker)}`,
        signal
      ),
    initialData: asset,
    staleTime: 30000,
    refetchInterval: 30000,
    retry: false,
  });
  const aggregate = useQuery<WindowData<HistoryPoint[]>>({
    queryKey: ["asset-history", asset.ticker, range],
    queryFn: ({ signal }) =>
      fetchData(
        `/api/history?${new URLSearchParams({ pair: asset.ticker, range, kind: "aggregate" })}`,
        signal
      ),
    staleTime: 30000,
    refetchInterval: 30000,
    retry: false,
  });
  const sourceFilter = sources?.length === 1 ? sources[0] : "";
  const observations = useQuery<WindowData<ObservationHistory>>({
    queryKey: ["source-history", asset.ticker, range, publisher, sourceFilter],
    queryFn: ({ signal }) => {
      const query = new URLSearchParams({
        pair: asset.ticker,
        range,
        kind: "observations",
      });
      if (publisher) query.set("publisher", publisher);
      if (sourceFilter) query.set("source", sourceFilter);
      return fetchData(`/api/history?${query}`, signal);
    },
    enabled: sources === null || sources.length > 0,
    staleTime: 30000,
    refetchInterval: 30000,
    retry: false,
  });
  const components = latest.data.components ?? [];
  const history = observations.data?.data;
  // Keep discovered historical sources selectable after narrowing a request.
  const [discovered, setDiscovered] = useState({
    sources: [] as string[],
    publishers: [] as string[],
  });
  useEffect(() => {
    if (!history) return;
    setDiscovered((previous) => ({
      sources: Array.from(
        new Set([
          ...previous.sources,
          ...history.observations.map((point) => point.source),
        ])
      ),
      publishers: Array.from(
        new Set([
          ...previous.publishers,
          ...history.observations.map((point) => point.publisher),
        ])
      ),
    }));
  }, [history]);
  const sourceOptions = Array.from(
    new Set(
      [...components, ...(history?.observations ?? [])]
        .map((point) => point.source)
        .concat(discovered.sources)
        .concat(sources ?? [])
    )
  ).sort();
  const publisherOptions = Array.from(
    new Set(
      [...components, ...(history?.observations ?? [])]
        .map((point) => point.publisher)
        .concat(discovered.publishers)
        .concat(publisher ? [publisher] : [])
    )
  ).sort();
  const selected = (point: Price) =>
    (!publisher || point.publisher === publisher) &&
    (sources === null || sources.includes(point.source));
  const selectedHistory = (history?.observations ?? []).filter(selected);
  const selectedLatest = components
    .filter(selected)
    .sort(
      (a, b) =>
        a.publisher.localeCompare(b.publisher) ||
        a.source.localeCompare(b.source)
    );
  const groupedSeries = useMemo(() => {
    const groups = new Map<string, { timestamp: number; price: number }[]>();
    for (const point of history?.observations ?? []) {
      if (
        (publisher && point.publisher !== publisher) ||
        (sources !== null && !sources.includes(point.source))
      )
        continue;
      const name = `${getPublisherName(point.publisher)} / ${point.source}`;
      const points = groups.get(name) ?? [];
      points.push({
        timestamp: point.timestamp,
        price: priceNumber(point.price, history!.decimals),
      });
      groups.set(name, points);
    }
    const series: ChartSeries[] = Array.from(groups)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([name, points], index) => ({
        name,
        points,
        color: colors[index % colors.length],
        gap: Math.max(1800, (history?.bucket_seconds ?? 0) * 2),
      }));
    if (showMedian)
      series.unshift({
        name: "Indexed aggregate median",
        color: "#ff7946",
        gap: range === "7d" ? 2700 : 1800,
        points: (aggregate.data?.data ?? []).map((point) => ({
          timestamp: point.timestamp,
          price: priceNumber(point.median_price, point.decimals),
        })),
      });
    return series;
  }, [history, publisher, sources, showMedian, range, aggregate.data]);
  const chart = useMemo(() => chartData(groupedSeries), [groupedSeries]);
  const window = aggregate.data ?? observations.data;
  const pending = aggregate.isLoading || observations.isLoading;
  const exportHistory = () => {
    const rows = [
      ["publisher", "source", "timestamp_utc", "price", "transaction_hash"],
      ...selectedHistory.map((point) => [
        point.publisher,
        point.source,
        exactTime(point.timestamp),
        String(priceNumber(point.price, history!.decimals)),
        point.tx_hash,
      ]),
    ];
    const csv = rows
      .map((row) =>
        row.map((value) => `"${value.replaceAll('"', '""')}"`).join(",")
      )
      .join("\n");
    const url = URL.createObjectURL(
      new Blob([csv], { type: "text/csv;charset=utf-8" })
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = `${asset.ticker.replace("/", "-")}-${range}-observations.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };
  return (
    <>
      <section
        className="explorer-panel"
        id="price-history"
        aria-labelledby="history-heading"
      >
        <div className="explorer-section-title">
          <div>
            <span className="eyebrow">01 / Price history</span>
            <h2 id="history-heading">The price, source by source.</h2>
          </div>
          <div className="history-ranges" aria-label="History time range">
            {(Object.keys(HISTORY_RANGES) as HistoryRange[]).map((value) => (
              <button
                key={value}
                aria-pressed={range === value}
                onClick={() => setRange(value)}
              >
                {value.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
        <div className="history-controls">
          <label className="explorer-select">
            Publisher{" "}
            <select
              value={publisher}
              onChange={(event) => setPublisher(event.target.value)}
            >
              <option value="">All publishers</option>
              {publisherOptions.map((value) => (
                <option value={value} key={value}>
                  {getPublisherName(value)}
                </option>
              ))}
            </select>
          </label>
          <details className="source-picker">
            <summary>
              Sources{" "}
              <span>
                {sources === null
                  ? `All ${sourceOptions.length}`
                  : `${sources.length} selected`}{" "}
                ⌄
              </span>
            </summary>
            <div>
              <div className="source-picker-actions">
                <button onClick={() => setSources(null)}>Select all</button>
                <button onClick={() => setSources([])}>Clear</button>
              </div>
              {sourceOptions.map((source) => (
                <label key={source}>
                  <input
                    type="checkbox"
                    checked={sources === null || sources.includes(source)}
                    onChange={(event) => {
                      const current = sources ?? sourceOptions;
                      setSources(
                        event.target.checked
                          ? [...current, source]
                          : current.filter((value) => value !== source)
                      );
                    }}
                  />
                  {source}
                </label>
              ))}
            </div>
          </details>
          <label className="median-toggle">
            <input
              type="checkbox"
              checked={showMedian}
              onChange={(event) => setShowMedian(event.target.checked)}
            />{" "}
            Aggregate median
          </label>
          <button
            className="history-export"
            onClick={exportHistory}
            disabled={!selectedHistory.length}
          >
            Export observations ↓
          </button>
        </div>
        {(aggregate.isError ||
          (observations.isError && sources?.length !== 0)) && (
          <div className="explorer-notice" role="status">
            {aggregate.isError ? "Aggregate history is unavailable. " : ""}
            {observations.isError && sources?.length !== 0
              ? "Source history is unavailable. "
              : ""}
            Available series remain visible.{" "}
            <button
              onClick={() => {
                aggregate.refetch();
                if (sources?.length !== 0) observations.refetch();
              }}
            >
              Retry history
            </button>
          </div>
        )}
        {history?.truncated && (
          <p className="explorer-notice">
            This request reached the 20,000-observation limit. Select a
            publisher or a single source, or shorten the time range to see
            complete history.
          </p>
        )}
        <div
          className="asset-history-chart"
          aria-label={`${asset.ticker} price history`}
        >
          {chart.rows.length ? (
            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
              <LineChart
                data={chart.rows}
                margin={{ top: 20, right: 15, bottom: 4, left: 6 }}
                accessibilityLayer
              >
                <CartesianGrid stroke="#ffffff12" vertical={false} />
                <XAxis
                  dataKey="timestamp"
                  allowDuplicatedCategory={false}
                  type="number"
                  domain={
                    window ? [window.start, window.end] : ["dataMin", "dataMax"]
                  }
                  tickFormatter={(timestamp) =>
                    range === "7d" || range === "24h"
                      ? new Date(timestamp * 1000)
                          .toISOString()
                          .slice(5, 16)
                          .replace("T", " ")
                      : timeLabel(timestamp)
                  }
                  tick={{ fill: "#aaaead", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  minTickGap={55}
                />
                <YAxis
                  domain={["auto", "auto"]}
                  tickFormatter={priceLabel}
                  tick={{ fill: "#aaaead", fontSize: 11 }}
                  width={85}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  labelFormatter={(label) => exactTime(Number(label))}
                  formatter={(value: number, name: string) => [
                    priceLabel(value),
                    name,
                  ]}
                  contentStyle={{
                    background: "#191d20",
                    border: "1px solid #ffffff24",
                    color: "#f2f0e9",
                    fontSize: 11,
                    maxHeight: 320,
                    overflow: "auto",
                  }}
                />
                {chart.lines.map((line) => (
                  <Line
                    key={line.key}
                    name={line.name}
                    data={line.data}
                    dataKey="price"
                    type="linear"
                    stroke={line.color}
                    strokeWidth={
                      line.name === "Indexed aggregate median" ? 2.5 : 1.3
                    }
                    strokeOpacity={
                      line.name === "Indexed aggregate median" ? 1 : 0.75
                    }
                    dot={
                      chart.rows.length < 50 || line.data.length === 1
                        ? { r: 2 }
                        : false
                    }
                    activeDot={{ r: 4 }}
                    connectNulls
                    isAnimationActive={false}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="explorer-empty" role="status">
              {pending
                ? "Loading submitted prices…"
                : "No price points for this selection. Choose another source or time range."}
            </div>
          )}
        </div>
        <div className="history-legend">
          {groupedSeries
            .filter((series) => series.points.length)
            .map((series) => (
              <span key={series.name}>
                <i style={{ background: series.color }} />
                {series.name}
              </span>
            ))}
        </div>
        <p className="explorer-caption">
          Times are UTC.{" "}
          {history?.bucket_seconds
            ? `Source lines show the last submitted observation in each ${history.bucket_seconds / 60}-minute interval.`
            : "Source lines show individual submitted observations."}{" "}
          Lines connect observations and break across gaps longer than{" "}
          {Math.max(30, (history?.bucket_seconds ?? 0) / 30)} minutes. The
          aggregate is the indexer’s {range === "7d" ? "15-minute" : "1-minute"}{" "}
          median, not a recomputation from the selected sources.
        </p>
        <p className="explorer-caption">
          {selectedHistory.length.toLocaleString("en-US")} source observations ·{" "}
          {
            groupedSeries.filter(
              (series) => series.name !== "Indexed aggregate median"
            ).length
          }{" "}
          publisher / source series · Refreshes every 30 seconds
        </p>
      </section>
      <section
        className="explorer-panel"
        aria-labelledby="latest-observations-heading"
      >
        <div className="explorer-section-title">
          <div>
            <span className="eyebrow">02 / Latest source observations</span>
            <h2 id="latest-observations-heading">Inspect the inputs.</h2>
          </div>
          <span className="explorer-caption">
            {selectedLatest.length} observations with the selected filters
          </span>
        </div>
        {latest.isError && (
          <p className="explorer-notice" role="status">
            Latest-observation refresh failed. Showing the last loaded values.
          </p>
        )}
        <div className="explorer-table-scroll">
          <table className="observation-table">
            <thead>
              <tr>
                <th>Publisher</th>
                <th>Underlying source</th>
                <th>Reported price</th>
                <th>Observation time (UTC)</th>
                <th>Age</th>
                <th>Transaction</th>
              </tr>
            </thead>
            <tbody>
              {selectedLatest.map((point) => (
                <tr key={`${point.publisher}:${point.source}`}>
                  <td>
                    <Link
                      href={`/provider/${encodeURIComponent(getPublisherName(point.publisher))}`}
                    >
                      {getPublisherName(point.publisher)} ↗
                    </Link>
                  </td>
                  <td>{point.source}</td>
                  <td>
                    {priceLabel(
                      priceNumber(
                        point.price,
                        latest.data.decimals ?? asset.decimals ?? 0
                      )
                    )}
                  </td>
                  <td>{exactTime(point.timestamp).replace(" UTC", "")}</td>
                  <td
                    className={
                      now - point.timestamp <= 900
                        ? "freshness recent"
                        : "freshness older"
                    }
                  >
                    {ageLabel(point.timestamp, now)}
                  </td>
                  <td>
                    <a
                      href={`https://voyager.online/tx/${encodeURIComponent(point.tx_hash)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {truncateTxHash(point.tx_hash)} ↗
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!selectedLatest.length && (
          <p className="explorer-empty">
            No latest observations match the selected publisher and sources.
          </p>
        )}
        <p className="explorer-caption">
          Orange ages are older than 15 minutes. Prices and source names are
          reported by the publisher; each transaction link lets you inspect its
          onchain submission.
        </p>
      </section>
    </>
  );
}
