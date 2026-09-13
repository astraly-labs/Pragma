import { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
export const metadata: Metadata = {
  title: "Resources",
  description:
    "Documentation, SDKs, contracts, audits, and integration resources for Pragma on Starknet and Miden.",
  alternates: { canonical: "/resources" },
};
const resources = [
  [
    "01",
    "Starknet documentation",
    "Start with price feeds, supported assets, and integration guidance.",
    "https://docs.pragma.build/starknet/introduction",
    "DOCUMENTATION",
  ],
  [
    "02",
    "Miden integration",
    "Find the oracle implementation and setup instructions for Miden.",
    "https://docs.pragma.build/miden/introduction",
    "MIDEN",
  ],
  [
    "03",
    "Publisher SDK",
    "Run a data publisher or interact with Pragma using Python.",
    "https://github.com/astraly-labs/pragma-sdk",
    "PYTHON",
  ],
  [
    "04",
    "Cairo library",
    "Integrate Pragma directly into your Starknet contracts.",
    "https://github.com/astraly-labs/pragma-lib",
    "CAIRO",
  ],
  [
    "05",
    "Computational feeds",
    "Explore calculations and aggregation built on oracle observations.",
    "https://docs.pragma.build/starknet/advanced/overview",
    "GUIDES",
  ],
  [
    "06",
    "Contracts & audits",
    "Read the contract source and published audit reports.",
    "https://github.com/astraly-labs/pragma-oracle",
    "OPEN SOURCE",
  ],
  [
    "07",
    "Research & updates",
    "Technical articles, product announcements, and the Pragma archive.",
    "https://blog.pragma.build",
    "BLOG",
  ],
  [
    "08",
    "Service status",
    "Check the operational status of Pragma services.",
    "https://status.production.pragma.build/status/mainnet",
    "OPERATIONS",
  ],
];
export default function ResourcesPage() {
  return (
    <div className="marketing-page">
      <section className="page-intro">
        <span className="eyebrow">The builder’s toolkit</span>
        <h1>
          From first read.
          <br />
          <span>To first integration.</span>
        </h1>
        <p>
          Documentation, source code, and practical starting points. Everything
          you need to build with Pragma.
        </p>
        <a className="site-button" href="https://docs.pragma.build">
          Open documentation <ArrowUpRight size={18} />
        </a>
      </section>
      <section className="resource-section">
        <div className="resource-list">
          {resources.map(([n, title, text, href, tag]) => (
            <a key={n} href={href}>
              <span className="eyebrow">{n}</span>
              <div>
                <span className="eyebrow resource-tag">{tag}</span>
                <h2>{title}</h2>
                <p>{text}</p>
              </div>
              <ArrowUpRight />
            </a>
          ))}
        </div>
      </section>
      <section className="paper-section compact-cta">
        <div>
          <span className="eyebrow">Need a hand?</span>
          <h2>Let’s get you building.</h2>
        </div>
        <a className="text-link" href="mailto:support@pragma.build">
          Contact the team <ArrowUpRight size={18} />
        </a>
      </section>
    </div>
  );
}
