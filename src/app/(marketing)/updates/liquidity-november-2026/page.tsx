import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowDownToLine } from "lucide-react";
import report from "../../../../../public/reports/liquidity-2026-11-27/data.json";

const title = "November 2026 liquidity and source-risk report";
const description =
  "A 27 November snapshot of Pragma feed liquidity: exchange books, Starknet quotes, source concentration and downloadable evidence.";
const downloads = "/reports/liquidity-2026-11-27";
export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/updates/liquidity-november-2026" },
  openGraph: {
    title,
    description,
    url: "/updates/liquidity-november-2026",
    type: "article",
    publishedTime: "2026-11-27",
    authors: ["Pragma"],
  },
  twitter: { card: "summary_large_image", title, description },
};
const money = (n: number | null) =>
  n == null
    ? "Not verified"
    : new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: n < 100 ? 2 : 0,
      }).format(n);
const utc = (s: string) => `${s.slice(0, 10)} ${s.slice(11, 19)} UTC`;
type Curve = (typeof report.assets)[number]["dex"][number];
function Grade({ value }: { value: string }) {
  return (
    <span className={`liquidity-grade liquidity-grade-${value.toLowerCase()}`}>
      {value}
    </span>
  );
}
function QuoteCurve({ curve }: { curve: Curve }) {
  const label = curve.base.endsWith("_CURRENT")
    ? `${curve.base.replace("_CURRENT", "")} current token`
    : curve.base === "DAI"
      ? "DAIv0 (SDK token)"
      : curve.base === "WSTETH"
        ? "wstETH legacy (SDK token)"
        : curve.base;
  const deterioration = (direction: string, size: number) => {
    const sample = curve.samples.find(
      (s) => s.direction === direction && s.notional_usdc === size
    );
    return curve.non_monotonic
      ? "Unreliable curve"
      : sample?.deterioration_pct == null
        ? "No quote"
        : `${sample.deterioration_pct.toFixed(2)}%`;
  };
  return (
    <div className="liquidity-curve">
      <h4>{label}: Starknet quotes</h4>
      <p className="liquidity-address">
        Token: <code>{curve.token_address}</code>
      </p>
      {curve.non_monotonic && (
        <p className="liquidity-warning">
          A larger request returned less total output than a smaller one. No
          capacity estimate is accepted from this curve.
        </p>
      )}
      <div className="incident-table-wrap" tabIndex={0}>
        <table>
          <caption>
            Output deterioration against the same-direction 10 USDC baseline.
            Indicative quotes, not executed trades.
          </caption>
          <thead>
            <tr>
              <th scope="col">Nominal size (USDC)</th>
              <th scope="col">Buy deterioration</th>
              <th scope="col">Sell deterioration</th>
            </tr>
          </thead>
          <tbody>
            {[100, 1000, 10000, 100000].map((n) => (
              <tr key={n}>
                <th scope="row">{n.toLocaleString("en-US")}</th>
                <td>{deterioration("buy", n)}</td>
                <td>{deterioration("sell", n)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function NovemberLiquidityReport() {
  return (
    <div className="marketing-page incident-page liquidity-report">
      <header className="incident-hero">
        <Link href="/updates" className="text-link">
          <ArrowLeft size={16} /> All updates
        </Link>
        <div className="eyebrow">Monthly liquidity report / November 2026</div>
        <h1>
          Liquidity remains
          <br />
          <span>uneven.</span>
        </h1>
        <p>
          Exchange depth, Starknet sale quotes and source dependencies across 22
          Pragma mainnet market and rate feeds.
        </p>
        <div className="incident-byline">
          <span>Pragma</span>
          <time dateTime="2026-11-27">Published 27 November 2026</time>
          <span>27 November snapshot, not a full-month average</span>
        </div>
        <div className="liquidity-stats">
          {[
            [String(report.grades.Critical), "Critical-risk feeds"],
            [String(report.grades.High), "High-risk feeds"],
            [
              String(report.source_count),
              "Stored market / source combinations",
            ],
            [String(report.miden.length), "Miden testnet listings"],
          ].map(([value, label]) => (
            <div key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </header>
      <div className="incident-layout">
        <nav className="incident-contents" aria-label="In this report">
          <span className="eyebrow">November 2026</span>
          {[
            ["findings", "Key findings"],
            ["ratings", "Reading the ratings"],
            ["assets", "Every assessed mainnet feed"],
            ["other-feeds", "Conversions and Miden"],
            ["method", "Method and limitations"],
            ["evidence", "Data and evidence"],
          ].map(([id, label]) => (
            <a key={id} href={`#${id}`}>
              {label}
            </a>
          ))}
        </nav>
        <article className="incident-body">
          <section id="findings">
            <div className="incident-update">
              <span className="eyebrow">Assessment at the snapshot</span>
              <h2>Five critical feeds. Ten more at high risk.</h2>
              <p>
                BROTHER, DOG, EKUBO, LORDS and NSTR meet this report&apos;s
                critical-risk criteria. Their measured exit routes or current
                source coverage leave material weaknesses. A published oracle
                price does not establish that a liquidation can execute at that
                price.
              </p>
            </div>
            <h3>Small markets remain expensive to exit.</h3>
            <p>
              At a nominal sale size of 10,000 USDC, quoted output deteriorates
              by 39.19% for BROTHER, 12.28% for EKUBO, 20.44% for LORDS and
              17.64% for NSTR against their small-sale baselines. Gate&apos;s
              DOG book contains about $50 on its thinner side within 1% of the
              midpoint.
            </p>
            <h3>Deeper markets still have weak individual inputs.</h3>
            <p>
              BTC and ETH have several large spot books. STRK is more uneven:
              Binance and LBank exceed $100,000 on their thinner sides within
              1%, while the sampled HTX book has about $6. OKX inputs use
              perpetual contracts, so their depth is kept separate from spot
              exit liquidity.
            </p>
            <h3>Quotes and source labels need their own checks.</h3>
            <p>
              LBTC and mRe7BTC return non-monotonic curves. mRe7YIELD returns no
              quote at the tested 10,000 USDC-equivalent size. Current DAI has a
              much flatter sampled sale curve than the earlier September
              observation, but still only one recent source label. These
              observations do not establish reliable redemption capacity.
            </p>
            <p>
              BROTHER has no stored source observation within one hour of the
              contract snapshot. Its indicative swap quotes are assessed
              separately from that stale source coverage.
            </p>
          </section>
          <section id="ratings">
            <h2>Reading the ratings</h2>
            <p>
              These are screening assessments of the saved evidence, not
              protocol settings, borrowing limits or safety certifications. The
              22 feeds comprise {report.grades.Critical} critical,{" "}
              {report.grades.High} high, {report.grades.Moderate} moderate and{" "}
              {report.grades.Lower} lower-risk assessments.
            </p>
            <dl className="liquidity-rubric">
              <div>
                <dt>
                  <Grade value="Critical" />
                </dt>
                <dd>
                  More than 10% sale deterioration at 10,000 USDC on an accepted
                  curve, or severely thin observed spot liquidity with
                  concentrated source coverage.
                </dd>
              </div>
              <div>
                <dt>
                  <Grade value="High" />
                </dt>
                <dd>
                  Thin or uneven markets, concentrated valuation inputs,
                  unreliable quotes or unverified exits prevent a lower-risk
                  assessment.
                </dd>
              </div>
              <div>
                <dt>
                  <Grade value="Moderate" />
                </dt>
                <dd>
                  Meaningful measured depth, with publisher concentration,
                  thinner venues or wrapped-asset dependencies.
                </dd>
              </div>
              <div>
                <dt>
                  <Grade value="Lower" />
                </dt>
                <dd>
                  Several recent spot inputs have at least $100,000 on each side
                  within 1%. This relative assessment does not establish stress
                  safety or local exit capacity.
                </dd>
              </div>
            </dl>
          </section>
          <section id="assets">
            <h2>Every assessed mainnet market and rate feed</h2>
            <p>
              The contract returned {report.source_count} distinct market/source
              combinations; {report.recent_source_count} had an observation
              within the preceding hour. Publisher names are listed separately.
              An aggregator or rate label is not counted as an executable venue.
            </p>
            {report.assets.map((asset) => (
              <details className="liquidity-detail" key={asset.pair}>
                <summary>
                  <strong>{asset.pair}</strong>
                  <Grade value={asset.grade} />
                  <span>{asset.recent_sources} recent source labels</span>
                </summary>
                <p>{asset.reason}</p>
                <div className="incident-table-wrap" tabIndex={0}>
                  <table className="liquidity-sources">
                    <caption>
                      1% depth is the smaller bid or ask USD notional within ±1%
                      of the midpoint. ≥ marks a book that ends before the full
                      band is visible.
                    </caption>
                    <thead>
                      <tr>
                        <th scope="col">Source / instrument</th>
                        <th scope="col">Coverage</th>
                        <th scope="col">1% depth</th>
                      </tr>
                    </thead>
                    <tbody>
                      {asset.sources.map((source) => (
                        <tr key={source.source}>
                          <th scope="row">
                            {source.book_url ? (
                              <a href={source.book_url}>{source.source}</a>
                            ) : (
                              source.source
                            )}
                            <small>{source.instrument}</small>
                            {source.source === "OKX" && (
                              <small>
                                Perpetual, excluded from spot depth.
                              </small>
                            )}
                          </th>
                          <td>
                            {source.recent ? "Recent" : "Older than one hour"}
                            <small>
                              {source.publishers.join(", ") ||
                                "No recent publisher observation"}
                            </small>
                            <small>
                              Last reported {utc(source.last_reported)}
                            </small>
                          </td>
                          <td className="liquidity-number">
                            {source.depth_complete === false ? "≥ " : ""}
                            {money(source.depth_usd)}
                            {source.spread_bps != null && (
                              <small>
                                {source.spread_bps.toFixed(2)} bps spread
                              </small>
                            )}
                            {source.book_error && (
                              <small>
                                No usable direct book. See saved response.
                              </small>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {asset.dex.map((c) => (
                  <QuoteCurve key={c.base} curve={c} />
                ))}
              </details>
            ))}
          </section>
          <section id="other-feeds">
            <h2>Conversion feeds and Miden</h2>
            <p>
              The seven conversion feeds were also read at the November block.
              They remain <strong>High / exit-risk review required</strong>:
              their underlying source counts do not measure independent wrapper
              markets. This review does not verify vault redemption buffers,
              eligibility or settlement times.
            </p>
            <ul>
              {report.conversions
                .filter((f) => f.pair.startsWith("CONVERSION_"))
                .map((f) => (
                  <li key={f.pair}>
                    {f.pair}: {f.sources} contract-reported underlying sources.
                  </li>
                ))}
            </ul>
            <p>
              FIXEDRESERVED/USD is a configured fixed value, not a
              market-liquidity observation.
            </p>
            <p>
              The Miden testnet endpoint lists {report.miden.length} assets:{" "}
              {report.miden.map((a) => a.ticker).join(", ")}. It exposes neither
              source coverage nor observation timestamps in this response. Their
              source-risk assessment remains <strong>Unverified</strong>; market
              depth elsewhere cannot fill that gap.
            </p>
          </section>
          <section id="method">
            <h2>Method and limitations</h2>
            <p>
              Source coverage comes from read-only contract calls at block{" "}
              {report.block.toLocaleString("en-US")} ({utc(report.block_time)}).
              “Recent” means a stored publisher timestamp within 60 minutes of
              that block, not independently verified freshness of the upstream
              price.
            </p>
            <p>
              Market reads span {utc(report.measured_from)} to{" "}
              {utc(report.measured_to)}. This is an asynchronous snapshot on 27
              November. It is neither a November average nor a measure of
              liquidity during earlier stress events.
            </p>
            <p>
              Spot depth uses the returned bids and asks around each book&apos;s
              midpoint. Quote currencies are converted using sampled reference
              books. Truncated depth is a lower bound; no venue depths are
              summed into a guaranteed capacity. Perpetual contracts are
              normalized by contract size and kept separate.
            </p>
            <p>
              AVNU buy requests use 10, 100, 1,000, 10,000 and 100,000 USDC.
              Sell quantities equal the tokens returned by the 10 USDC buy
              quote, scaled to each nominal size. Deterioration compares output
              with a proportional same-direction 10 USDC quote. It is not the
              discount from the oracle price, a realized fill or a gas-inclusive
              execution cost.
            </p>
            <p>
              This sizing differs from September&apos;s oracle-sized sales, so
              changes in the percentages are not a controlled month-over-month
              comparison. Current and legacy token addresses are kept separate.
              Non-monotonic curves, missing quotes and failed endpoints
              establish no reliable capacity; they do not prove that all
              liquidity is zero.
            </p>
            <p>
              Source dependencies were checked against the public SDK at{" "}
              <a
                href={`https://github.com/astraly-labs/pragma-sdk/tree/${report.sdk.commit}`}
              >
                {report.sdk.commit.slice(0, 7)}
              </a>
              . That code identifies potential shared inputs, not proof of every
              publisher&apos;s deployed configuration. Pool reserves and
              reported volume are not substituted for executable depth.
            </p>
            <p>
              The October report remains pending because historical order books
              and quotes were unavailable. This report makes no changes to
              oracle contracts, published prices or risk parameters.
            </p>
          </section>
          <section id="evidence">
            <h2>Data and evidence</h2>
            <p className="liquidity-address">
              Oracle: <code>{report.contract}</code>
            </p>
            <p>
              Raw responses, request timestamps, token addresses, quote routes
              and collection scripts are available with a SHA-256 manifest. API
              failures remain visible in the evidence.
            </p>
            <div className="button-row">
              {[
                ["data.json", "Report data"],
                ["sources.csv", "Source table"],
                ["order-books.csv", "Order books CSV"],
                ["dex-quotes.csv", "DEX quotes CSV"],
                ["evidence.zip", "Raw evidence"],
              ].map(([file, label]) => (
                <a
                  className="text-link"
                  key={file}
                  href={`${downloads}/${file}`}
                  download
                >
                  <ArrowDownToLine size={16} /> {label}
                </a>
              ))}
            </div>
          </section>
        </article>
      </div>
    </div>
  );
}
