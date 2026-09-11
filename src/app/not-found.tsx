import Link from "next/link";
import { ArrowRight } from "lucide-react";
export default function NotFound() {
  return (
    <div className="marketing-page">
      <section className="page-intro">
        <span className="eyebrow">404 / Page not found</span>
        <h1>A little offchain.</h1>
        <p>
          This page doesn’t exist. Head back to Pragma or explore the available
          data feeds.
        </p>
        <div className="button-row mt-8">
          <Link className="site-button" href="/">
            Return home <ArrowRight size={18} />
          </Link>
          <Link className="text-link" href="/assets">
            Explore feeds <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
