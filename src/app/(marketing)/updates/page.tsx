import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Updates and reports",
  "Pragma incident updates, recovery progress and monthly liquidity reports, with publication dates and the latest status.",
  "/updates"
);

const reports = [
  {
    href: "/updates/nostra-nstr-incident",
    title: "Nostra / NSTR incident",
    published: "2026-09-17",
    updated: "2026-09-17",
    status: "Recovery ongoing",
    description:
      "Updates on the 17 September incident, NSTR liquidity and collateral risk, and recovery efforts. This report is being updated as the situation develops.",
  },
  {
    href: "/updates/vesu-incident",
    title: "Vesu / 4 September oracle incident",
    published: "2026-09-14",
    updated: "2026-09-17",
    status: "Recovery complete / follow-up ongoing",
    description:
      "The pricing failure, asset recovery and remediation progress. Curators handle refunds, and outstanding engineering work remains tracked in the report.",
  },
];

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

export default function UpdatesPage() {
  return (
    <div className="marketing-page">
      <header className="page-intro">
        <span className="eyebrow">The public record</span>
        <h1>
          Updates
          <br />
          <span>&amp; reports.</span>
        </h1>
        <p>
          Incident updates, recovery progress and monthly liquidity reports.
          Follow what happened, what changed and the work still underway.
        </p>
        <nav
          className="button-row updates-topics"
          aria-label="Report categories"
        >
          <a className="text-link" href="#incidents">
            Incident reports <ArrowUpRight size={16} />
          </a>
          <a className="text-link" href="#liquidity">
            Monthly liquidity reports <ArrowUpRight size={16} />
          </a>
        </nav>
      </header>
      <section
        id="incidents"
        className="resource-section"
        aria-labelledby="incidents-heading"
      >
        <h2 id="incidents-heading" className="updates-heading">
          Incident reports
        </h2>
        <div className="resource-list updates-list">
          {reports.map((report) => (
            <Link key={report.href} href={report.href}>
              <div className="updates-date">
                <span className="eyebrow">Published</span>
                <time dateTime={report.published}>
                  {dateFormat.format(new Date(report.published))}
                </time>
              </div>
              <div>
                <span className="eyebrow resource-tag">{report.status}</span>
                <h3>{report.title}</h3>
                <p>{report.description}</p>
                <p className="updates-modified">
                  Updated{" "}
                  <time dateTime={report.updated}>
                    {dateFormat.format(new Date(report.updated))}
                  </time>
                </p>
              </div>
              <ArrowUpRight aria-hidden="true" />
            </Link>
          ))}
        </div>
      </section>
      <section
        id="liquidity"
        className="paper-section updates-liquidity"
        aria-labelledby="liquidity-heading"
      >
        <span className="eyebrow">Monthly reporting</span>
        <h2 id="liquidity-heading">Liquidity reports</h2>
        <p>
          Monthly reviews of market liquidity and source coverage will be
          collected here, with the reporting period and publication date.
        </p>
        <p className="eyebrow">No monthly reports published yet.</p>
      </section>
    </div>
  );
}
