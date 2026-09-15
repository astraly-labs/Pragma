import { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
export const metadata: Metadata = {
  title: "Ecosystem",
  description:
    "Build with Pragma on Starknet and Miden, contribute oracle data, and explore the open-source ecosystem.",
  alternates: { canonical: "/ecosystem" },
};
export default function EcosystemPage() {
  return (
    <div className="marketing-page">
      <section className="page-intro">
        <span className="eyebrow">The Pragma ecosystem</span>
        <h1>
          Connected by data.
          <br />
          <span>Built together.</span>
        </h1>
        <p>
          For application builders, data publishers, and open-source
          contributors. Find your place in the network.
        </p>
      </section>
      <section className="paper-section">
        <div className="section-heading">
          <span className="eyebrow">Our networks</span>
          <h2>Native to possibility.</h2>
        </div>
        <div className="network-grid">
          <article>
            <span className="chain-symbol">✳</span>
            <h3>Starknet</h3>
            <p>
              Raw data published onchain, with aggregation in Cairo. Explore
              feeds and build with Pragma’s Starknet contracts.
            </p>
            <a
              className="text-link"
              href="https://docs.pragma.build/starknet/introduction"
            >
              Build on Starknet <ArrowUpRight size={18} />
            </a>
          </article>
          <article>
            <span className="miden-symbol">m</span>
            <h3>Miden</h3>
            <p>
              Pragma is the Miden oracle. Browse its price feeds, then use the
              integration guide to bring external data to Miden.
            </p>
            <div className="button-row">
              <Link className="text-link" href="/assets?source=miden">
                Explore Miden feeds <ArrowUpRight size={18} />
              </Link>
              <a
                className="text-link"
                href="https://docs.pragma.build/miden/introduction"
              >
                Build on Miden <ArrowUpRight size={18} />
              </a>
            </div>
          </article>
        </div>
      </section>
      <section className="resource-section">
        <div className="section-heading">
          <span className="eyebrow">Take part</span>
          <h2>
            More perspectives.
            <br />
            Better inputs.
          </h2>
        </div>
        <div className="resource-list">
          {[
            [
              "01",
              "Integrate a feed",
              "Explore available assets, publishers, and source observations before integrating a feed.",
              "/assets",
            ],
            [
              "02",
              "Become a publisher",
              "Run the open-source SDK and contact the team to coordinate registration and source configuration.",
              "mailto:support@pragma.build?subject=Publisher%20onboarding",
            ],
            [
              "03",
              "Contribute code",
              "Review the contracts, improve the SDK, or help develop the Miden integration.",
              "https://github.com/astraly-labs",
            ],
            [
              "04",
              "Explore ecosystem adoption",
              "See the protocols tracked by DefiLlama and their current oracle integrations.",
              "https://defillama.com/oracles/Pragma",
            ],
          ].map(([n, title, text, href]) => (
            <Link key={n} href={href}>
              <span className="eyebrow">{n}</span>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
              <ArrowUpRight />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
