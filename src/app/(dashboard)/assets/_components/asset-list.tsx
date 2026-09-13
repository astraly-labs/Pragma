"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AssetInfo } from "../_types";
import { SearchBar } from "./searchbar";
import { columns } from "./assets-table/columns";
import { DataTable } from "./data-table";

type Props = {
  options: string[];
  assets: AssetInfo[];
  selectedSource?: string;
  loading: boolean;
};
export default function AssetList({
  options,
  assets,
  selectedSource,
  loading,
}: Props) {
  const [search, setSearch] = useState("");
  const [showAll, setShowAll] = useState(false);
  const isApi = selectedSource === "api";
  const filtered = useMemo(
    () =>
      assets.filter(
        (a) =>
          a.ticker.toLowerCase().includes(search.toLowerCase()) &&
          (!isApi || showAll || Boolean(search.trim()) || !a.error)
      ),
    [assets, search, isApi, showAll]
  );
  const unavailable = assets.filter((a) => a.error).length;
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
        <a
          href="https://status.production.pragma.build/status/mainnet"
          className="text-link"
        >
          Service status ↗
        </a>
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
              {option === "api" ? "Streaming API" : "Starknet mainnet"}
            </Link>
          ))}
        </nav>
        <SearchBar label="Search price feeds" onInputChange={setSearch} />
      </div>
      <p className="explorer-caption">
        {selectedSource === "api"
          ? "Streaming observations · prices update as data arrives"
          : "Onchain observations · refreshes every 30 seconds"}
        . Timestamps show the age of each observation.
      </p>
      {isApi && !loading && (
        <div className="explorer-feed-filter">
          <span>
            {assets.length - unavailable} of {assets.length} registered feeds
            have observations.
          </span>
          <button
            type="button"
            aria-pressed={showAll}
            onClick={() => setShowAll(!showAll)}
          >
            {showAll
              ? "Show feeds with observations"
              : "Show all registered feeds"}
          </button>
        </div>
      )}
      {!isApi && unavailable > 0 && (
        <p className="explorer-notice" role="status">
          {unavailable} {unavailable === 1 ? "feed is" : "feeds are"}{" "}
          temporarily unavailable. Retrying automatically.
        </p>
      )}
      {loading ? (
        <div className="explorer-empty" role="status">
          <span className="explorer-spinner" />
          {selectedSource === "api"
            ? "Connecting to the price stream…"
            : "Loading price observations…"}
        </div>
      ) : filtered.length ? (
        <DataTable columns={columns(selectedSource)} data={filtered} />
      ) : (
        <div className="explorer-empty">
          {search
            ? "No feeds match your search."
            : "No price observations received yet. View the full directory above."}
        </div>
      )}
    </section>
  );
}
