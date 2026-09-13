"use client";
import { useState } from "react";
import { publisherColumns } from "./publishers-table/columns";
import { DataProviderInfo } from "../_types";
import { SearchBar } from "./searchbar";
import { DataTable } from "./data-table";

type Props = {
  options: string[];
  publishers: DataProviderInfo[];
  selectedSource?: string;
  loading: boolean;
};
export function PublisherList({ publishers, loading }: Props) {
  const [search, setSearch] = useState("");
  const filtered = publishers.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <section className="explorer-panel" aria-labelledby="publishers-title">
      <div className="explorer-section-title">
        <div>
          <span className="eyebrow">02 / Data provenance</span>
          <h2 id="publishers-title">
            Publishers
            <span className="explorer-count">
              {loading ? "—" : publishers.length}
            </span>
          </h2>
        </div>
        <SearchBar label="Search publishers" onInputChange={setSearch} />
      </div>
      <p className="explorer-caption">
        Publishers returned by the mainnet indexer. Activity is measured by
        their last recorded submission.
      </p>
      {loading ? (
        <div className="explorer-empty" role="status">
          Loading publishers…
        </div>
      ) : filtered.length ? (
        <DataTable columns={publisherColumns} data={filtered} />
      ) : (
        <div className="explorer-empty">No publishers match your search.</div>
      )}
    </section>
  );
}
