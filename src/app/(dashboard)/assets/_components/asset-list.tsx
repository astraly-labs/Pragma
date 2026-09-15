"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AssetInfo } from "../_types";
import { SearchBar } from "./searchbar";
import { columns } from "./assets-table/columns";
import { DataTable } from "./data-table";
import { EXPLORER_NETWORKS } from "@/lib/explorer-networks";

type Props = {
  options: string[];
  assets: AssetInfo[];
  selectedSource?: string;
  loading: boolean;
  error?: string;
};
export default function AssetList({
  options,
  assets,
  selectedSource,
  loading,
  error,
}: Props) {
  const [search, setSearch] = useState("");
  const filtered = useMemo(
    () =>
      assets.filter((a) =>
        a.ticker.toLowerCase().includes(search.toLowerCase())
      ),
    [assets, search]
  );
  const failed = assets.filter(
    (a) => a.error && a.error !== "Waiting for price"
  ).length;
  return (
    <section className="explorer-panel" aria-labelledby="feeds-title">
      <div className="explorer-section-title">
        <div>
          <span className="eyebrow">01 / Market data</span>
          <h2 id="feeds-title">
            Price feeds
            <span className="explorer-count">
              {loading ? "—" : assets.length}
            </span>
          </h2>
        </div>
        {selectedSource !== "miden" && (
          <a
            href="https://status.production.pragma.build/status/mainnet"
            className="text-link"
          >
            Service status ↗
          </a>
        )}
      </div>
      <div className="explorer-toolbar">
        <nav className="explorer-tabs" aria-label="Data source">
          {options.map((option) => (
            <Link
              key={option}
              href={`/assets?source=${option}`}
              scroll={false}
              aria-current={option === selectedSource ? "page" : undefined}
            >
              {EXPLORER_NETWORKS[option]}
            </Link>
          ))}
        </nav>
        <SearchBar label="Search price feeds" onInputChange={setSearch} />
      </div>
      <p className="explorer-caption">
        {selectedSource === "miden"
          ? `${EXPLORER_NETWORKS.miden} oracle medians · refreshes every 30 seconds. Observation times and source counts are not reported.`
          : "Onchain observations · refreshes every 30 seconds. Timestamps show the age of each observation."}
      </p>
      {error && (
        <p className="explorer-notice" role="status">
          {error}
        </p>
      )}
      {failed > 0 && (
        <p className="explorer-notice" role="status">
          {failed} {failed === 1 ? "feed is" : "feeds are"} temporarily
          unavailable. Retrying automatically.
        </p>
      )}
      {loading ? (
        <div className="explorer-empty" role="status">
          <span className="explorer-spinner" />
          Loading price observations…
        </div>
      ) : filtered.length ? (
        <DataTable columns={columns(selectedSource)} data={filtered} />
      ) : (
        <div className="explorer-empty">
          {error
            ? "Waiting for Miden price data."
            : search
              ? "No feeds match your search."
              : "No price observations received yet."}
        </div>
      )}
    </section>
  );
}
