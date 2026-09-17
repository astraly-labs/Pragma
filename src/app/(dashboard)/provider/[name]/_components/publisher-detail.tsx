"use client";

import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import type { Publisher } from "@/app/(dashboard)/assets/_types";
import {
  ageLabel,
  groupMarkets,
  priceLabel,
  priceNumber,
} from "@/lib/explorer-metrics";
import { PublisherHeader } from "./publisher-header";

export function PublisherDetail({
  initialData,
  asOf,
}: {
  initialData: Publisher;
  asOf: number;
}) {
  const [now, setNow] = useState(asOf);
  const [search, setSearch] = useState("");
  const [freshMinutes, setFreshMinutes] = useState(15);
  const [status, setStatus] = useState("all");
  const {
    data: publisher,
    isError,
    isFetching,
    refetch,
  } = useQuery<Publisher>({
    queryKey: ["publisher-detail", initialData.publisher],
    queryFn: async ({ signal }) => {
      const response = await fetch(
        `/api/publisher?name=${encodeURIComponent(initialData.publisher)}`,
        { signal }
      );
      if (!response.ok) throw new Error("Publisher unavailable");
      return response.json();
    },
    initialData,
    staleTime: 30000,
    refetchInterval: 30000,
    retry: false,
  });
  useEffect(() => {
    const timer = setInterval(
      () => setNow(Math.floor(Date.now() / 1000)),
      15000
    );
    return () => clearInterval(timer);
  }, []);
  const markets = useMemo(
    () => groupMarkets(publisher.components),
    [publisher.components]
  );
  const recent = (timestamp: number) =>
    timestamp > 0 && now - timestamp <= freshMinutes * 60;
  const freshMarkets = markets.filter((market) =>
    recent(market.timestamp)
  ).length;
  const freshSources = publisher.components.filter((source) =>
    recent(source.last_updated_timestamp)
  ).length;
  const filtered = markets.filter(
    (market) =>
      (status === "all" ||
        recent(market.timestamp) === (status === "recent")) &&
      `${market.pair} ${market.sources.map((source) => source.source).join(" ")}`
        .toLowerCase()
        .includes(search.toLowerCase())
  );
  const sourceActivity = useMemo(() => {
    const totals = new Map<string, number>();
    publisher.components.forEach((source) =>
      totals.set(
        source.source,
        (totals.get(source.source) ?? 0) + source.daily_updates
      )
    );
    return Array.from(totals).sort((a, b) => b[1] - a[1]);
  }, [publisher.components]);
  const mostUpdates = Math.max(
    1,
    ...sourceActivity.map(([, updates]) => updates)
  );
  const marketUrl = (pair: string, source?: string) => {
    const query = new URLSearchParams({ publisher: publisher.publisher });
    if (source) query.set("source", source);
    return `/asset/${encodeURIComponent(pair.replace("/", "-"))}?${query}#price-history`;
  };
  return (
    <>
      <PublisherHeader publisher={publisher} now={now} />
      {isError && (
        <p className="explorer-notice" role="status">
          Refresh failed. Showing the last loaded observations.{" "}
          <button onClick={() => refetch()} disabled={isFetching}>
            Retry
          </button>
        </p>
      )}
      <section
        className="explorer-panel"
        aria-labelledby="publisher-performance"
      >
        <div className="explorer-section-title">
          <div>
            <span className="eyebrow">01 / Publication activity</span>
            <h2 id="publisher-performance">Freshness & frequency</h2>
          </div>
          <label className="explorer-select">
            Recent means{" "}
            <select
              value={freshMinutes}
              onChange={(event) => setFreshMinutes(Number(event.target.value))}
            >
              {[5, 15, 30, 60].map((value) => (
                <option value={value} key={value}>
                  Within {value} minutes
                </option>
              ))}
            </select>
          </label>
        </div>
        <dl className="publisher-health">
          <div>
            <dt>Markets updated recently</dt>
            <dd>
              {freshMarkets} <small>/ {markets.length}</small>
            </dd>
          </div>
          <div>
            <dt>Recent market / source observations</dt>
            <dd>
              {freshSources} <small>/ {publisher.components.length}</small>
            </dd>
          </div>
          <div>
            <dt>Observations per hour</dt>
            <dd>
              {(publisher.daily_updates / 24).toLocaleString("en-US", {
                maximumFractionDigits: 1,
              })}
            </dd>
          </div>
        </dl>
        <p className="explorer-caption">
          Freshness uses the observation timestamp. The threshold is a viewing
          filter, not an uptime guarantee. Hourly frequency is the average
          across the last 24 hours; one transaction can contain several market /
          source observations.
        </p>
        <details className="source-activity">
          <summary>
            24-hour update activity by underlying source{" "}
            <span>{sourceActivity.length} sources</span>
          </summary>
          <div className="source-activity-bars">
            {sourceActivity.map(([source, updates]) => (
              <div key={source}>
                <span>{source}</span>
                <meter
                  aria-label={`${source} observations in 24 hours`}
                  value={updates}
                  max={mostUpdates}
                />
                <strong>{updates.toLocaleString("en-US")}</strong>
              </div>
            ))}
          </div>
        </details>
      </section>
      <section className="explorer-panel" aria-labelledby="publisher-markets">
        <div className="explorer-section-title">
          <div>
            <span className="eyebrow">02 / Market coverage</span>
            <h2 id="publisher-markets">
              Published markets{" "}
              <span className="explorer-count">{markets.length}</span>
            </h2>
          </div>
          <div className="history-controls">
            <label className="explorer-search">
              <span className="sr-only">Search markets or sources</span>
              <input
                type="search"
                value={search}
                placeholder="Search markets or sources"
                onChange={(event) => setSearch(event.target.value)}
              />
            </label>
            <label className="explorer-select">
              <span className="sr-only">Market freshness</span>
              <select
                value={status}
                onChange={(event) => setStatus(event.target.value)}
              >
                <option value="all">All markets</option>
                <option value="recent">Updated recently</option>
                <option value="older">Older observations</option>
              </select>
            </label>
          </div>
        </div>
        <p className="explorer-caption">
          Every indexed market is included, even if it has no updates in the
          last day. Expand a market to inspect each source, or open its price
          history with this publisher selected.
        </p>
        <div className="market-column-labels" aria-hidden="true">
          <span>Market / sources</span>
          <span>Latest observation</span>
          <span>Updates / 24h</span>
          <span>Explore</span>
        </div>
        {filtered.map((market) => (
          <details className="publisher-market" key={market.pair}>
            <summary>
              <div>
                <strong>{market.pair}</strong>
                <span>
                  {market.sources.length} sources{" "}
                  <span className="market-chevron">⌄</span>
                </span>
              </div>
              <div>
                <span
                  className={
                    recent(market.timestamp)
                      ? "freshness recent"
                      : "freshness older"
                  }
                >
                  {ageLabel(market.timestamp, now)}
                </span>
                <small>
                  {recent(market.timestamp) ? "Recent" : "Older observation"}
                </small>
              </div>
              <div>
                <strong>{market.updates.toLocaleString("en-US")}</strong>
                <small>source observations</small>
              </div>
              <Link
                href={marketUrl(market.pair)}
                onClick={(event) => event.stopPropagation()}
                aria-label={`View ${market.pair} price history for ${publisher.publisher}`}
              >
                Price history ↗
              </Link>
            </summary>
            <div className="explorer-table-scroll">
              <table className="observation-table">
                <thead>
                  <tr>
                    <th>Underlying source</th>
                    <th>Last reported price</th>
                    <th>Observation time (UTC)</th>
                    <th>Age</th>
                    <th>Updates / 24h</th>
                    <th>Avg / hour</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {market.sources.map((source) => (
                    <tr key={source.source}>
                      <td>{source.source}</td>
                      <td>
                        {priceLabel(priceNumber(source.price, source.decimals))}
                      </td>
                      <td>
                        {new Date(source.last_updated_timestamp * 1000)
                          .toISOString()
                          .replace("T", " ")
                          .replace(".000Z", "")}
                      </td>
                      <td
                        className={
                          recent(source.last_updated_timestamp)
                            ? "freshness recent"
                            : "freshness older"
                        }
                      >
                        {ageLabel(source.last_updated_timestamp, now)}
                      </td>
                      <td>{source.daily_updates.toLocaleString("en-US")}</td>
                      <td>{(source.daily_updates / 24).toFixed(1)}</td>
                      <td>
                        <Link
                          href={marketUrl(market.pair, source.source)}
                          aria-label={`Chart ${market.pair} from ${source.source} published by ${publisher.publisher}`}
                        >
                          Chart ↗
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </details>
        ))}
        {!filtered.length && (
          <p className="explorer-empty">No markets match these filters.</p>
        )}
        <p className="explorer-caption">
          {filtered.length} of {markets.length} markets · Refreshes every 30
          seconds
        </p>
      </section>
    </>
  );
}
