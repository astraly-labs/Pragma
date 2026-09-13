"use client";
import Link from "next/link";
export default function ProviderError({ reset }: { reset: () => void }) {
  return (
    <section className="explorer-page">
      <span className="eyebrow">Data temporarily unavailable</span>
      <h1 className="mt-6 text-4xl">We couldn’t load this publisher.</h1>
      <p className="explorer-caption">
        Please try again, or return to the feed directory.
      </p>
      <div className="button-row">
        <button className="site-button" onClick={reset}>
          Try again
        </button>
        <Link className="text-link" href="/assets">
          Back to feeds
        </Link>
      </div>
    </section>
  );
}
