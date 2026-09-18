import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowDownToLine } from "lucide-react";
import report from "../../../../../public/reports/liquidity-2026-09-18/data.json";

const title = "September 2026 liquidity and source-risk report";
const description =
  "A dated assessment of Pragma feeds: exchange depth, Starknet swap quotes, source dependencies and gaps in verifiable liquidity.";
const downloads = "/reports/liquidity-2026-09-18";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/updates/liquidity-september-2026" },
  openGraph: {
    title,
    description,
    url: "/updates/liquidity-september-2026",
    type: "article",
    publishedTime: "2026-09-18",
    modifiedTime: "2026-09-18",
    authors: ["Pragma"],
  },
  twitter: { card: "summary_large_image", title, description },
};

const money = (n: number | null) =>
  n === null
    ? "Not verified"
    : new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: n < 100 ? 2 : 0,
      }).format(n);
const percent = (n: number | null | undefined) =>
  n == null ? "No quote" : `${n.toFixed(2)}%`;
const utc = (s: string) => `${s.slice(0, 10)} ${s.slice(11, 19)} UTC`;
type Curve = NonNullable<(typeof report.assets)[number]["dex"][number]>;

function Grade({ value }: { value: string }) {
  return (
    <span className={`liquidity-grade liquidity-grade-${value.toLowerCase()}`}>
      {value}
    </span>
  );
}

function CurveTable({ curve }: { curve: Curve }) {
  const label = curve.base.endsWith("_CURRENT")
    ? `${curve.base.replace("_CURRENT", "")} current Starknet token`
    : curve.base === "DAI"
      ? "DAIv0 (SDK address)"
      : curve.base === "WSTETH"
        ? "wstETH legacy (SDK address)"
        : curve.base;
  return (
    <div className="liquidity-curve">
      <h4>{label}: Starknet quote curve</h4>
      <p className="liquidity-address">
        Token: <code>{curve.token_address ?? "Not identified"}</code>
      </p>
      {curve.non_monotonic && (
        <p className="liquidity-warning">
          Unreliable curve: a larger request returned less total output than a
          smaller request. No capacity estimate is accepted. Raw quotes remain
          available in the download.
        </p>
      )}
      <div className="incident-table-wrap" tabIndex={0}>
        <table>
          <caption>
            Output deterioration against the same-direction $10 baseline.
            Indicative quotes, not executed trades. Buy sizes are in USDC; sell
            quantities use the saved Pragma USD price.
          </caption>
          <thead>
            <tr>
              <th scope="col">Size</th>
              <th scope="col">Buy</th>
              <th scope="col">Sell</th>
              <th scope="col">Sell proceeds (USDC)</th>
            </tr>
          </thead>
          <tbody>
            {[100, 1000, 10000, 100000].map((size) => {
              const buy = curve.samples.find(
                (q) => q.direction === "buy" && q.notional === size
              );
              const sell = curve.samples.find(
                (q) => q.direction === "sell" && q.notional === size
              );
              return (
                <tr key={size}>
                  <th scope="row">{money(size)}</th>
                  <td>
                    {curve.non_monotonic
                      ? "Unreliable"
                      : percent(buy?.deterioration_pct)}
                  </td>
                  <td>
                    {curve.non_monotonic
                      ? "Unreliable"
                      : percent(sell?.deterioration_pct)}
                  </td>
                  <td>
                    {curve.non_monotonic
                      ? "Unverified"
                      : sell?.sell_proceeds_usdc == null
                        ? "No quote"
                        : sell.sell_proceeds_usdc.toLocaleString("en-US", {
                            maximumFractionDigits: 2,
                          })}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="liquidity-small">
        Pools and route splits for every size are in the quote CSV. These routes
        can share liquidity with the publisher&apos;s inputs. They are not an
        additional independent source.
      </p>
    </div>
  );
}

const sections = [
  ["findings", "Key findings"],
  ["ratings", "Reading the ratings"],
  ["assets", "Every mainnet feed"],
  ["conversions", "Conversion feeds"],
  ["miden", "Miden coverage"],
  ["method", "Method and limitations"],
  ["evidence", "Data and evidence"],
];

export default function LiquidityReport() {
  return (
    <div className="marketing-page incident-page liquidity-report">
      <header className="incident-hero">
        <Link href="/updates" className="text-link">
          <ArrowLeft size={16} /> All updates
        </Link>
        <div className="eyebrow">Monthly liquidity report / September 2026</div>
        <h1>
          A price is not
          <br />
          <span>exit liquidity.</span>
        </h1>
        <p>
          How much liquidity sits behind Pragma&apos;s supported feeds, where
          sources overlap, and which risks remain unverified.
        </p>
        <div className="incident-byline">
          <span>Pragma</span>
          <time dateTime="2026-09-18">Published 18 September 2026</time>
          <span>18 September snapshot, not a monthly average</span>
        </div>
        <div className="liquidity-stats">
          {[
            ["22", "Mainnet market / rate feeds"],
            [String(report.source_count), "Market / source combinations"],
            ["7", "Additional conversion feeds"],
            ["14", "Miden testnet listings"],
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
          <span className="eyebrow">September 2026</span>
          {sections.map(([id, label]) => (
            <a key={id} href={`#${id}`}>
              {label}
            </a>
          ))}
          <a href={`${downloads}/sources.csv`} download>
            Download source table ↓
          </a>
        </nav>
        <article className="incident-body">
          <section id="findings">
            <div className="incident-update">
              <span className="eyebrow">Assessment at the snapshot</span>
              <h2>Six critical feeds. Nine more at high risk.</h2>
              <p>
                Of the 22 mainnet market and rate feeds assessed, six meet this
                report&apos;s critical-risk criteria and nine are high risk.
                Three are moderate and four have lower observed liquidity risk.
                These are our assessments of the evidence, not protocol-enforced
                risk limits or safety certifications.
              </p>
              <p>
                <strong>
                  BROTHER, DAI, DOG, EKUBO, LORDS and NSTR should not be treated
                  as safe collateral simply because an oracle price is
                  available.
                </strong>{" "}
                Their observed depth, source concentration or quote
                deterioration leaves material liquidation and manipulation
                exposure.
              </p>
            </div>
            <h3>Thin markets cannot support large liquidations</h3>
            <p>
              At a $10,000 oracle-sized sale, the quoted output deteriorates by
              about 15% for NSTR, 17% for EKUBO, 22% for LORDS and 20% for
              BROTHER against their small-trade baselines. DOG&apos;s first
              measured Bitget and Gate books contain just $463 and $1,254
              respectively on the thinner side within 1% of the midpoint. A
              repeat remains thin at approximately $387 and $2,140.
            </p>
            <h3>A familiar asset name does not make every source liquid</h3>
            <p>
              STRK&apos;s measured spot books mostly hold $10,000–$40,000 on
              their thinner side within 1%. Huobi has about $23 in the first
              sample and $29 in the repeat. The inspected SDK uses OKX perpetual
              prices: their book depth is shown separately from spot liquidity.
              BTC and ETH have much deeper measured global spot books.
            </p>
            <h3>Source labels overstate independent price discovery</h3>
            <p>
              DAI has only one recently reported label, DeFiLlama. WSTETH&apos;s
              LIDO and WSTETH_RATE labels read the same conversion rate.
              Multiple publishers repeating those inputs do not create new
              markets. The NSTR DeFiLlama response independently fetched during
              this review carries a timestamp more than four hours old, despite
              a recent publisher observation.
            </p>
            <h3>Token identity and quote reliability matter</h3>
            <p>
              Current and legacy DAI and wstETH deployments have different exit
              curves. The current DAI route shows roughly 62% sell deterioration
              at $10,000. DOG, LBTC and several BTC staking wrappers return
              non-monotonic quote curves, so we decline to infer reliable
              capacity from them. mRe7BTC returns no sell quote at the tested
              oracle-sized amounts. These are evidence gaps and failed quote
              checks, not proof that all liquidity everywhere is zero.
            </p>
          </section>
          <section id="ratings">
            <h2>Reading the ratings</h2>
            <p>
              Ratings combine liquidity and source risk. A liquid underlying
              asset can still have a weak feed. The thresholds are screening
              conventions for this report; they are not recommended borrowing
              caps or estimates of attack cost.
            </p>
            <dl className="liquidity-rubric">
              <div>
                <dt>
                  <Grade value="Critical" />
                </dt>
                <dd>
                  Severe measured weakness: over 10% deterioration at $10,000 on
                  an accepted local curve, or all observed spot books below
                  $10,000 on their thinner side within 1%, with concentrated
                  pricing or exit dependencies. Material shared-collateral use
                  is unsafe without controls that address the specific failure.
                </dd>
              </div>
              <div>
                <dt>
                  <Grade value="High" />
                </dt>
                <dd>
                  Thin markets, correlated or single valuation dependencies,
                  unreliable quotes, or unverified exits prevent a lower-risk
                  assessment. Rate-based feeds require separate market-discount
                  and redemption controls even when a sampled DEX route is deep.
                </dd>
              </div>
              <div>
                <dt>
                  <Grade value="Moderate" />
                </dt>
                <dd>
                  Meaningful depth exists at several venues, with residual
                  concentration, thinner individual inputs or wrapped-asset
                  risk.
                </dd>
              </div>
              <div>
                <dt>
                  <Grade value="Lower" />
                </dt>
                <dd>
                  Several recently reported spot inputs have at least $100,000
                  on each side within 1%. Lower relative liquidity risk in this
                  sample does not establish stress safety or local exit
                  capacity.
                </dd>
              </div>
            </dl>
          </section>
          <section id="assets">
            <h2>Every mainnet market and rate feed</h2>
            <p>
              Open a feed for every observed source, publisher coverage and
              measured liquidity. “Recent” means a reported timestamp within 60
              minutes of that inventory read. It does not verify the age of the
              original market observation. Historical sources stay visible and
              are excluded from recent counts.
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
                      1% depth is the smaller of bid and ask USD notional inside
                      ±1% of the midpoint. ≥ indicates a truncated book. It is
                      neither guaranteed fill size nor manipulation cost.
                    </caption>
                    <thead>
                      <tr>
                        <th scope="col">Source / instrument</th>
                        <th scope="col">Coverage</th>
                        <th scope="col">1% depth</th>
                        <th scope="col">Assessment</th>
                      </tr>
                    </thead>
                    <tbody>
                      {asset.sources.map((source) => (
                        <tr key={source.source}>
                          <th scope="row">
                            <a href={source.evidence_url}>{source.source}</a>
                            <small>{source.instrument}</small>
                          </th>
                          <td>
                            <strong>
                              {source.recent ? "Recent" : "Inactive"}
                            </strong>
                            <small>{source.publishers.join(", ")}</small>
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
                          </td>
                          <td>
                            {source.assessment}
                            <small>{source.note}</small>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {asset.dex.map((curve) => (
                  <CurveTable curve={curve} key={curve.base} />
                ))}
                {asset.pools.length > 0 && (
                  <details className="liquidity-pools">
                    <summary>
                      Pool reserve context, not executable depth
                    </summary>
                    <p>
                      First three pools returned per queried network. Pool
                      reserves include liquidity that may be outside the trading
                      range. No reserve figure is used to assign a safe
                      capacity.
                    </p>
                    <ul>
                      {asset.pools.map((pool) => (
                        <li key={`${pool.network}-${pool.address}`}>
                          <a href={pool.url}>
                            {pool.name} ({pool.network})
                          </a>
                          : {money(pool.reserve_usd)}
                          <code className="liquidity-address">
                            {pool.address}
                          </code>
                        </li>
                      ))}
                    </ul>
                  </details>
                )}
              </details>
            ))}
          </section>
          <section id="conversions">
            <h2>Conversion feeds are not market exit prices</h2>
            <p>
              All seven documented conversion feeds were read at Starknet block{" "}
              {report.rpc_block.toLocaleString("en-US")}. Their configured vault
              addresses and reference assets were also read directly. The
              returned source count belongs to the underlying price calculation;
              it does not count independent markets for the wrapper.
            </p>
            <p>
              These feeds receive a{" "}
              <strong>High / exit-risk review required</strong> assessment. A
              vault conversion ratio does not guarantee immediate redemption,
              collateral backing or a sale at that valuation. The five BTC
              wrappers below all reference BTC in this contract snapshot; that
              does not establish equivalence between each wrapped asset and BTC.
            </p>
            {report.conversions.map((feed) => (
              <details className="liquidity-detail" key={feed.pair}>
                <summary>
                  <strong>{feed.pair}</strong>
                  <Grade value="High" />
                </summary>
                <p>
                  Reference: {feed.underlying}/USD. Contract-reported underlying
                  source count: {feed.sources}. Independent wrapper-market depth
                  and stressed redemption capacity remain unverified.
                </p>
                <p className="liquidity-address">
                  Vault: <code>{feed.address}</code>
                </p>
                {feed.dex ? (
                  <CurveTable curve={feed.dex} />
                ) : (
                  <p>
                    No quote curve verified: the token lookup did not return
                    usable metadata.
                  </p>
                )}
              </details>
            ))}
            <p>
              <strong>FIXEDRESERVED/USD</strong> was also checked. It returns
              the configured $1 value, not a market observation or an asset with
              an order book. It has no liquidity or depeg protection to assess.
            </p>
          </section>
          <section id="miden">
            <h2>Miden: market context, unverified source coverage</h2>
            <p>
              All 14 assets listed by the Miden testnet endpoint are included.
              That endpoint exposes neither publisher/source observations nor
              their timestamps. Each feed therefore remains{" "}
              <strong>Unverified</strong> for source safety. The independent
              venue checks below are market benchmarks, not claims about what
              Miden publishes.
            </p>
            {report.miden.map((asset) => (
              <details className="liquidity-detail" key={asset.pair}>
                <summary>
                  <strong>{asset.pair}</strong>
                  <Grade value="Unverified" />
                </summary>
                <div className="incident-table-wrap" tabIndex={0}>
                  <table>
                    <caption>
                      External spot-book benchmarks. These do not establish
                      Miden source coverage.
                    </caption>
                    <thead>
                      <tr>
                        <th scope="col">Venue / instrument</th>
                        <th scope="col">1% depth</th>
                        <th scope="col">Result</th>
                      </tr>
                    </thead>
                    <tbody>
                      {asset.benchmarks.map((book) => (
                        <tr key={`${book.source}-${book.quote}`}>
                          <th scope="row">
                            <a href={book.url}>
                              {book.source} {book.base}/{book.quote}
                            </a>
                          </th>
                          <td>
                            {book.complete_1pct === false ? "≥ " : ""}
                            {money(book.min_1pct_usd ?? null)}
                          </td>
                          <td>{book.assessment}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </details>
            ))}
          </section>
          <section id="method">
            <h2>What was measured</h2>
            <p>
              The source inventory was captured at {utc(report.inventory_at)}.
              Public market responses span {utc(report.measured_from)} to{" "}
              {utc(report.measured_to)}. BTC/EUR and WBTC/BTC entries and the
              conversion feeds were recovered directly from the oracle when the
              explorer API could not serve them.
            </p>
            <h3>Order books</h3>
            <p>
              Sum price × base quantity independently on each side within 1% and
              2% of the best-bid/best-ask midpoint. Display the thinner 1% side;
              both sides, the 2% band, spread and completeness flags are in the
              CSV. Below $10,000 is “Very thin”, $10,000 to $100,000 is “Thin”,
              and at least $100,000 is “Deeper”. A truncated book below a
              threshold is “Incomplete depth”, not proof of a thin full book.
            </p>
            <p>
              USDT books use a measured median of six direct USD book midpoints
              ({report.quote_fx.usdt_usd.toFixed(6)} USD/USDT). BTC quotes use
              the saved Binance BTC/USDT midpoint and that conversion; EUR uses
              the Kraken EUR/USD midpoint. These are asynchronous snapshots. OKX
              contract quantities are converted using instrument metadata and
              remain labelled perpetuals. Posted orders can be cancelled; depth
              excludes fees, transfer delays and available account balances.
            </p>
            <h3>DEX quotes</h3>
            <p>
              AVNU public quotes were requested in both directions at 10, 100,
              1,000, 10,000 and 100,000. Buys spend that many native USDC; token
              sales are sized at the saved Pragma USD price, with verified token
              decimals. Deterioration is 100 × (1 − large output / proportional
              $10 output) for the same direction. It measures size effects,
              separately from an initial spread or oracle/market disagreement.
              Negative values can result from different routes or market
              movement.
            </p>
            <p>
              Quotes include the provider&apos;s route pricing but are not
              signed transactions or independently simulated fills. Gas is
              excluded. USDC is the output unit, not a guaranteed dollar.
              Non-monotonic curves fail the capacity check. Empty responses and
              HTTP failures mean unverified capacity, not zero liquidity. No
              cross-chain depth, pool reserves or overlapping routes are added
              together.
            </p>
            <h3>Source dependencies and coverage</h3>
            <p>
              Instrument and rate mappings follow the public SDK v2.16.1 code,
              pinned in the references. Runtime configuration for every
              publisher was not independently inspected. Aggregator constituent
              weights, exact publisher-selected DEX pool depth, redemption
              queues and stress liquidity were not fully observable. Those gaps
              remain explicit rather than receiving a safe rating.
            </p>
            <p>
              Scope is the supported onchain catalogue and explorer listings:
              the 22 mainnet market/rate feeds, seven conversion feeds, the
              fixed reference and 14 Miden testnet listings. Deprecated Starknet
              SSTRK/USD, UNI/USD, KSTRK/USD, LUSD/USD and futures are excluded
              as documented. This is not an inventory of every offchain API or
              custom feed, nor a month-long, time-weighted liquidity study.
            </p>
            <h3>How integrations should use this</h3>
            <p>
              Set collateral eligibility and dollar exposure limits against
              independently verified exits on the relevant chain. Apply haircuts
              for stress, shared routes and redemption delays. Validate
              freshness and independent source quorum through every conversion
              leg, with explicit behaviour on failure. A source count, a recent
              publisher timestamp or a large TVL figure alone cannot justify a
              borrowing cap.
            </p>
          </section>
          <section id="evidence">
            <h2>Data and evidence</h2>
            <p>
              The snapshot contains public API and read-only contract responses.
              Request URLs, collection timestamps, token addresses and file
              hashes are retained. The page is static; reading it does not query
              an exchange or change a publisher or oracle.
            </p>
            <div className="liquidity-downloads">
              {[
                ["sources.csv", "All 113 source combinations"],
                ["order-books.csv", "Order-book measurements"],
                ["dex-quotes.csv", "DEX quotes and routes"],
                ["data.json", "Complete report data"],
                ["evidence.zip", "Raw evidence and calculations (ZIP)"],
              ].map(([file, label]) => (
                <a key={file} href={`${downloads}/${file}`} download>
                  {label} <ArrowDownToLine size={15} />
                </a>
              ))}
            </div>
            <ul className="incident-references">
              <li>
                <a href="https://docs.pragma.build/starknet/assets">
                  Pragma supported assets and conversion-feed caveats
                </a>
              </li>
              <li>
                <a href="https://github.com/astraly-labs/pragma-sdk/tree/1fe7bad29874cbe321f65b9b2e815f52333cd34c/pragma-sdk/pragma_sdk/common/fetchers">
                  SDK source mappings, pinned v2.16.1
                </a>
              </li>
              <li>
                <a href="https://docs.avnu.fi/api/swap/get-quotes">
                  AVNU quote API and route fields
                </a>
              </li>
              <li>
                <a href="https://apiguide.geckoterminal.com/faq">
                  GeckoTerminal top-pool price selection
                </a>
              </li>
              <li>
                <a href="https://docs.ekubo.org/reference/pool-math/">
                  Ekubo active ranges and pool math
                </a>
              </li>
              <li>
                <a href="https://www.okx.com/docs-v5/en/">
                  OKX order-book and contract-quantity conventions
                </a>
              </li>
              <li>
                <Link href="/assets">Live explorer</Link> and{" "}
                <Link href="/updates">incident reports</Link>
              </li>
            </ul>
          </section>
        </article>
      </div>
    </div>
  );
}
