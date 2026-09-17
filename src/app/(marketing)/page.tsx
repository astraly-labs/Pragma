import SignalGlobe from "@/components/Landing/SignalGlobe";
import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Database,
  Braces,
  Radio,
} from "lucide-react";

export const metadata = pageMetadata(
  "The oracle for Starknet and Miden",
  "Explore Pragma oracle price feeds, inspect onchain data, and integrate market prices into applications on Starknet and Miden.",
  "/",
  "/opengraph-image?v=20260915"
);

export default function HomePage() {
  return (
    <div className="marketing-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Organization",
                "@id": "https://www.pragma.build/#organization",
                name: "Pragma",
                url: "https://www.pragma.build",
                logo: "https://www.pragma.build/brand/apple-touch-icon.png",
                sameAs: [
                  "https://x.com/PragmaOracle",
                  "https://github.com/astraly-labs",
                ],
              },
              {
                "@type": "WebSite",
                "@id": "https://www.pragma.build/#website",
                name: "Pragma",
                url: "https://www.pragma.build",
                publisher: {
                  "@id": "https://www.pragma.build/#organization",
                },
              },
            ],
          }),
        }}
      />
      <Link href="/updates" className="incident-banner">
        <span className="eyebrow">Updates &amp; reports</span>
        <span>Incident updates, recovery progress and liquidity reports</span>
        <ArrowUpRight size={18} aria-hidden="true" />
      </Link>
      <section className="home-hero">
        <div className="hero-copy">
          <span className="eyebrow">
            <span className="accent-square" /> Open data. Onchain computation.
          </span>
          <h1>
            The world moves.
            <br />
            <span>Bring it onchain.</span>
          </h1>
          <p>
            The oracle for Starknet and Miden. Connect your application to
            market data with transparent sources and verifiable computation.
          </p>
          <div className="button-row">
            <a className="site-button" href="https://docs.pragma.build">
              Start building <ArrowUpRight size={18} />
            </a>
            <Link className="text-link" href="/assets">
              Explore the data <ArrowRight size={18} />
            </Link>
          </div>
          <a className="hero-scroll eyebrow" href="#network">
            Explore the network <ArrowDown size={14} />
          </a>
        </div>
        <SignalGlobe />
      </section>
      <section id="network" className="network-strip">
        <span className="eyebrow">
          Built for
          <br />a different kind of chain
        </span>
        <a href="https://docs.pragma.build/starknet/introduction">
          <span className="chain-symbol">✳</span> Starknet{" "}
          <ArrowUpRight size={20} />
        </a>
        <Link href="/assets?source=miden">
          <span className="miden-symbol">m</span> Miden{" "}
          <ArrowUpRight size={20} />
        </Link>
        <p>
          Two ecosystems.
          <br />
          One connection to the world.
        </p>
      </section>
      <section className="paper-section">
        <div className="section-heading">
          <span className="eyebrow">01 / The data layer</span>
          <h2>
            Good applications
            <br />
            start with good data.
          </h2>
          <p>
            From a market price to a custom calculation, give your contracts the
            inputs they need.
          </p>
        </div>
        <div className="product-grid">
          {[
            {
              icon: Radio,
              title: "Price feeds",
              text: "Bring market prices into lending, trading, and collateral systems. Inspect the publishers and sources behind each feed.",
              href: "/assets",
              link: "Explore feeds",
            },
            {
              icon: Braces,
              title: "Computational feeds",
              text: "Build on raw oracle data with onchain aggregation, time-weighted prices, and custom calculations on Starknet.",
              href: "https://docs.pragma.build/starknet/advanced/overview",
              link: "Read the docs",
            },
            {
              icon: Database,
              title: "Data publishing",
              text: "Run a publisher and contribute data to the network. Start with the open-source SDK and coordinate your onboarding.",
              href: "https://github.com/astraly-labs/pragma-sdk",
              link: "Publisher SDK",
            },
          ].map(({ icon: Icon, title, text, href, link }, i) => (
            <article key={title}>
              <div className="product-top">
                <Icon size={26} strokeWidth={1.3} />
                <span className="eyebrow">0{i + 1}</span>
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
              <Link href={href} className="text-link">
                {link}
                <ArrowUpRight size={18} />
              </Link>
            </article>
          ))}
        </div>
      </section>
      <section className="architecture-section">
        <div className="section-heading">
          <span className="eyebrow">02 / Under the hood</span>
          <h2>
            See where your
            <br />
            data comes from.
          </h2>
          <p>
            On Starknet, publishers submit raw observations and contracts
            aggregate them onchain. You can inspect the inputs as well as the
            result.
          </p>
          <a
            className="text-link"
            href="https://github.com/astraly-labs/pragma-oracle"
          >
            Explore the contracts <ArrowUpRight size={18} />
          </a>
        </div>
        <div className="architecture-flow">
          {[
            ["01", "Observe", "Market data from multiple sources"],
            ["02", "Publish", "Publisher observations submitted onchain"],
            ["03", "Compute", "Aggregation your application can inspect"],
          ].map(([n, title, detail]) => (
            <div key={n}>
              <span className="step-number">{n}</span>
              <div>
                <h3>{title}</h3>
                <p>{detail}</p>
              </div>
              <ArrowDown size={20} />
            </div>
          ))}
          <p className="architecture-note">
            Verifiable computation makes aggregation inspectable. Applications
            still need freshness, source-count, and deviation checks.
          </p>
        </div>
      </section>
      <section className="miden-section">
        <span className="eyebrow">03 / Beyond a single ecosystem</span>
        <div>
          <h2>
            Meet Pragma
            <br />
            on Miden.
          </h2>
          <p>
            Pragma is also the Miden oracle. Browse its price feeds in the
            explorer and bring external data into your Miden application.
          </p>
          <div className="button-row">
            <Link className="site-button" href="/assets?source=miden">
              Explore Miden feeds <ArrowRight size={18} />
            </Link>
            <a
              className="text-link"
              href="https://docs.pragma.build/miden/introduction"
            >
              Build on Miden <ArrowUpRight size={18} />
            </a>
          </div>
        </div>
        <span className="miden-word" aria-hidden="true">
          m.
        </span>
      </section>
      <section className="closing-section">
        <span className="eyebrow">Your next building block</span>
        <h2>
          What will you
          <br />
          bring onchain?
        </h2>
        <div className="button-row">
          <a className="site-button" href="https://docs.pragma.build">
            Read the documentation <ArrowUpRight size={18} />
          </a>
          <a className="text-link" href="mailto:support@pragma.build">
            Talk to the team <ArrowRight size={18} />
          </a>
        </div>
      </section>
    </div>
  );
}
