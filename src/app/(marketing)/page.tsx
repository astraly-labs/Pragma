import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Database,
  Braces,
  Radio,
} from "lucide-react";
export default function HomePage() {
  return (
    <div className="marketing-page">
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
        <div
          className="signal-art"
          role="img"
          aria-label="A globe of data signals converging into an onchain oracle"
        >
          <div className="art-topline">
            <span>PRAGMA / DATA NETWORK</span>
            <span>01 → ∞</span>
          </div>
          <svg viewBox="0 0 560 520" aria-hidden="true">
            <defs>
              <clipPath id="globe-clip">
                <circle cx="280" cy="250" r="185" />
              </clipPath>
              <radialGradient id="globe-fill">
                <stop offset="0" stopColor="#ff9566" stopOpacity=".2" />
                <stop offset="1" stopColor="#ff6b35" stopOpacity=".02" />
              </radialGradient>
            </defs>
            <g stroke="#ff7946" fill="none" strokeWidth=".8">
              <circle cx="280" cy="250" r="185" fill="url(#globe-fill)" />
              <g clipPath="url(#globe-clip)">
                {[40, 85, 130, 165, 185].map((rx) => (
                  <ellipse key={rx} cx="280" cy="250" rx={rx} ry="185" />
                ))}
                {[-150, -100, -50, 0, 50, 100, 150].map((y) => (
                  <ellipse
                    key={y}
                    cx="280"
                    cy={250 + y}
                    rx="185"
                    ry={Math.max(12, 50 - Math.abs(y) / 5)}
                  />
                ))}
              </g>
              <ellipse
                cx="280"
                cy="250"
                rx="246"
                ry="65"
                transform="rotate(-28 280 250)"
                stroke="#e4dfd3"
                strokeOpacity=".5"
              />
              <ellipse
                cx="280"
                cy="250"
                rx="222"
                ry="65"
                transform="rotate(44 280 250)"
                strokeOpacity=".5"
              />
              <path
                d="M31 250H529M280 23V480"
                strokeDasharray="2 7"
                strokeOpacity=".3"
              />
            </g>
            <g fill="#ff7946">
              <circle cx="114" cy="157" r="5" />
              <circle cx="417" cy="354" r="5" />
              <circle cx="280" cy="65" r="4" />
              <circle cx="95" cy="250" r="4" />
            </g>
            <g fill="#f3efe5" fontSize="10" fontFamily="monospace">
              <text x="34" y="134">
                SOURCES
              </text>
              <text x="400" y="395">
                ONCHAIN
              </text>
              <text x="293" y="43">
                DATA IN MOTION
              </text>
            </g>
          </svg>
          <div className="art-bottomline">
            <span>REAL-WORLD INPUTS</span>
            <span>VERIFIABLE OUTPUTS ↗</span>
          </div>
        </div>
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
        <a href="https://docs.pragma.build/miden/introduction">
          <span className="miden-symbol">m</span> Miden{" "}
          <ArrowUpRight size={20} />
        </a>
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
            Pragma is also the Miden oracle. Explore the integration and bring
            external data into your Miden application.
          </p>
          <a
            className="site-button"
            href="https://docs.pragma.build/miden/introduction"
          >
            Build on Miden <ArrowUpRight size={18} />
          </a>
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
