import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const title = "NSTR incident update";
const description =
  "An update on the Nostra incident, NSTR liquidity and collateral risk, and ongoing recovery efforts.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/updates/nostra-nstr-incident" },
  openGraph: {
    title,
    description,
    url: "/updates/nostra-nstr-incident",
    type: "article",
    publishedTime: "2026-09-17",
    modifiedTime: "2026-09-17",
    authors: ["Pragma"],
  },
  twitter: { card: "summary_large_image", title, description },
};

const sections = [
  ["summary", "What happened"],
  ["risk", "Source requirements and collateral risk"],
  ["recovery", "Recovery"],
];

export default function NostraIncidentPage() {
  return (
    <div className="marketing-page incident-page">
      <header className="incident-hero">
        <Link href="/updates" className="text-link">
          <ArrowLeft size={16} /> All updates
        </Link>
        <div className="eyebrow">Incident update / Starknet mainnet</div>
        <h1>
          The NSTR
          <br />
          <span>incident.</span>
        </h1>
        <p>An update on liquidity risk, collateral controls and recovery.</p>
        <div className="incident-byline">
          <span>Pragma</span>
          <time dateTime="2026-09-17">17 September 2026</time>
          <span>Recovery ongoing</span>
        </div>
      </header>
      <div className="incident-layout">
        <nav className="incident-contents" aria-label="In this update">
          <span className="eyebrow">In this update</span>
          {sections.map(([id, label]) => (
            <a key={id} href={`#${id}`}>
              {label}
            </a>
          ))}
        </nav>
        <article className="incident-body">
          <section id="summary">
            <h2>What happened</h2>
            <p>
              Today&apos;s Nostra incident involved manipulation of an illiquid
              NSTR market and the use of NSTR as collateral to borrow other
              assets.
            </p>
            <p>
              NSTR was already classified as a high-risk feed because of its
              limited liquidity and available pricing sources. We had previously
              highlighted these risks to Nostra. Gate.io was removed as a source
              at Nostra&apos;s request, citing illiquidity and manipulation
              concerns, and source coverage remained limited in the months
              preceding the incident.
            </p>
            <p>
              The deviating input reflected a manipulated onchain pool price.
              Our reconstruction found no decimals or median-calculation error.
              A price recorded in a thin market does not establish that
              meaningful amounts of collateral can be liquidated at that price.
            </p>
          </section>
          <section id="risk">
            <h2>Source requirements and collateral risk</h2>
            <p>
              Our integration guidance recommends at least three pricing
              sources, alongside freshness checks and thresholds appropriate to
              the asset&apos;s risk. The affected response had two contributing
              sources. An enforced three-source minimum would have rejected it.
            </p>
            <p>
              Source checks are one safeguard. Using an illiquid token as
              collateral to borrow other assets also requires appropriate
              collateral eligibility, exposure limits and liquidation-depth
              assessment. An oracle listing does not establish that an asset is
              suitable for that use.
            </p>
          </section>
          <section id="recovery">
            <h2>Recovery</h2>
            <p>
              The attacker&apos;s address has been frozen, and we are working on
              recovery. Recovering funds is the immediate priority. We will
              share further updates as the situation develops.
            </p>
          </section>
        </article>
      </div>
    </div>
  );
}
