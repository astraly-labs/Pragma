"use client";
import Link from "next/link";
export default function AssetError({ reset }: { reset: () => void }) {
  return (
    <div className="marketing-page">
      <section className="page-intro">
        <span className="eyebrow">Data temporarily unavailable</span>
        <h1>
          We couldn’t load
          <br />
          this feed.
        </h1>
        <p>
          Please try again, or return to the explorer to select another feed.
        </p>
        <div className="button-row mt-8">
          <button className="site-button" onClick={reset}>
            Try again
          </button>
          <Link className="text-link" href="/assets">
            Back to feeds
          </Link>
        </div>
      </section>
    </div>
  );
}
