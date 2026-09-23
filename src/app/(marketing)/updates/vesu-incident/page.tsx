import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

const title = "4 September oracle incident: post-mortem and updates";
const description =
  "What failed in Pragma’s price publishing pipeline, the impact on Vesu, the recovery process, and the work completed and still outstanding.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/updates/vesu-incident" },
  openGraph: {
    title,
    description,
    url: "/updates/vesu-incident",
    type: "article",
    publishedTime: "2026-09-14",
    modifiedTime: "2026-09-17",
    authors: ["Pragma"],
  },
  twitter: { card: "summary_large_image", title, description },
};

const sections = [
  ["latest", "Latest update"],
  ["summary", "What happened"],
  ["cause", "Root cause"],
  ["timeline", "Timeline"],
  ["impact", "Impact"],
  ["response", "Response & recovery"],
  ["remediation", "Remediation tracker"],
  ["lessons", "What we learned"],
  ["sources", "Technical references"],
];

export default function IncidentPage() {
  return (
    <div className="marketing-page incident-page">
      <header className="incident-hero">
        <Link href="/updates" className="text-link">
          <ArrowLeft size={16} /> All updates
        </Link>
        <div className="eyebrow">Incident report / Starknet mainnet</div>
        <h1>
          The 4 September
          <br />
          <span>oracle incident.</span>
        </h1>
        <p>
          An explanation of the pricing failure that triggered liquidations on
          Vesu, what we changed, and what remains to be done.
        </p>
        <div className="incident-byline">
          <span>Pragma</span>
          <time dateTime="2026-09-14">Published 14 September 2026</time>
          <time dateTime="2026-09-23">Updated 23 September 2026</time>
        </div>
      </header>
      <div className="incident-layout">
        <nav className="incident-contents" aria-label="In this report">
          <span className="eyebrow">In this report</span>
          {sections.map(([id, title]) => (
            <a key={id} href={`#${id}`}>
              {title}
            </a>
          ))}
        </nav>
        <article className="incident-body">
          <section id="latest" className="incident-update">
            <span className="eyebrow">Latest update / 17 September</span>
            <h2>
              Recovery complete. Refunds and remediation remain in follow-up.
            </h2>
            <p>
              In its{" "}
              <a href="https://x.com/vesuxyz/status/2099125070304076013">
                13 September recovery update <ArrowUpRight size={14} />
              </a>
              , Vesu reported 95% recovery at 11 September prices, or 93% at
              prices on the morning of the incident. Each pool curator holds its
              recovered funds and arranges refunds. The asset recovery phase is
              closed. As of 17 September, Vesu has not announced completion of
              all curator refunds.{" "}
              <a href="#response">Recovery figures and next steps ↓</a>
            </p>
            <p>
              The 4 September publisher hotfix removed the use of the oracle’s
              USDT/USD median as a conversion input for other feeds. On 13
              September we deployed additional monitoring corrections and
              verified fresh deviation calculations in production.
            </p>
            <p>
              The Starknet Foundation is now publishing on mainnet and listed in
              the explorer. Successful submissions from all five publishers were
              verified on 17 September. Publisher pages now expose market
              coverage, source freshness and update frequency, and asset charts
              let users inspect price history by publisher and source.{" "}
              <Link href="/provider/STARKNET_FOUNDATION">
                View the Foundation publisher ↓
              </Link>
            </p>
            <p>
              The SDK now includes measured USDT conversion and stronger
              reference-source requirements; its production image update was
              merged on 15 September. Runtime rollout verification across
              publishers remains open. Oracle and publisher-registry
              administration moved to a 3-of-5 multisig on 22 September,
              replacing the single administrator key.
            </p>
            <p>
              Accurate source-count reporting for composed prices is also an
              immediate remediation priority. Vesu already checks minimum source
              counts. Our reporting did not expose the weak conversion input
              behind otherwise populated feeds. The reporting fix remains open.{" "}
              <a href="#remediation">See the remediation tracker ↓</a>
            </p>
          </section>
          <section id="summary">
            <h2>What happened</h2>
            <p>
              On 4 September 2026, an incorrect price produced by Pragma’s
              publishing pipeline propagated into several Starknet price feeds.
              Vesu consumed those prices and liquidated positions that would not
              have been liquidatable at the correct market prices. Our
              reconstruction identified 47 liquidations affecting 42 borrower
              wallets across seven pools.
            </p>
            <p>
              This was a failure in our pricing system. The affected users
              relied on data we provided, and we are sorry for the harm this
              caused. Publishing the incident mechanism, its impact, and the
              remaining work is part of taking responsibility.
            </p>
            <p>
              The underlying markets did not fall by half. Multiple exchange
              observations were transformed by the same incorrect conversion
              factor inside the publisher software. Running that software
              through multiple publishers did not make those observations
              independent.
            </p>
          </section>
          <section id="cause">
            <h2>How the error propagated</h2>
            <h3>1. A token mapping pointed to a stale conversion route</h3>
            <p>
              The publisher’s asset registry mapped USDC to legacy bridged
              USDC.e rather than native USDC. The Ekubo-derived price
              calculation consequently used a route through an inactive USDC.e
              pool. Its stale price relationship produced a USDT/USD observation
              of approximately $3.07.
            </p>
            <p>
              This was a problem in how Pragma selected and used the route. It
              was not evidence that exchange USDT prices had actually risen to
              $3.07. Healthy observations normally outvoted the incorrect
              source.
            </p>
            <h3>2. Freshness filtering left only two observations</h3>
            <p>
              At 04:07:52 UTC, three healthy USDT/USD source observations were
              outside the oracle’s 60-minute freshness window. The remaining
              values were Bitstamp at approximately $0.99995 and the faulty
              Ekubo-derived value at $3.073203. With two observations, the
              median calculation returned their average: $2.036576.
            </p>
            <div className="incident-equation">
              <span className="eyebrow">The triggering aggregate</span>
              <code>($0.99995 + $3.073203) / 2 = $2.036576</code>
            </div>
            <h3>3. The publisher fed the aggregate back into other prices</h3>
            <p>
              The publisher SDK read that onchain USDT/USD result and divided
              USDT-quoted venue prices by it. Both active publishers ran the
              same software. BTC, WBTC, ETH, STRK and USDC observations were
              therefore divided by approximately 2.0366, making them appear to
              have lost about half their value.
            </p>
            <p>
              Many affected feeds still contained numerous source observations,
              but those observations shared a conversion input supported by only
              two sources. Pragma’s reported counts described the final feed’s
              sources without exposing that shared dependency.
            </p>
            <h3>4. Derived assets updated at different times</h3>
            <p>
              wstETH/USD was derived from ETH/USD on a separate update cadence.
              Its fall and recovery lagged ETH. During one interval, wstETH
              collateral was valued at roughly half its correct price while ETH
              debt was valued at its recovered price. That mismatch increased
              the damage.
            </p>
            <p>
              Vesu’s minimum-source check rejected the two-source USDT feed. It
              received larger source counts for affected BTC and ETH feeds,
              without the information needed to apply that safeguard to their
              weak conversion input. Accurate reporting of the sources behind
              the composed price is Pragma’s responsibility. The remediation
              must verify that Vesu’s existing check rejects those prices when
              their supporting source count falls below its configured minimum.
            </p>
          </section>
          <section id="timeline">
            <h2>Timeline</h2>
            <p className="incident-note">
              All times are UTC on 4 September 2026 unless stated otherwise.
            </p>
            <ol className="incident-timeline">
              <li>
                <time>04:07:52</time>
                <div>
                  <strong>USDT/USD aggregate becomes incorrect</strong>
                  <p>
                    Freshness filtering leaves two observations. The resulting
                    median is $2.036576.
                  </p>
                </div>
              </li>
              <li>
                <time>04:08:14</time>
                <div>
                  <strong>The conversion error spreads</strong>
                  <p>
                    Publishers use the incorrect factor in USDT-quoted prices.
                    Several major asset feeds fall by approximately half.
                  </p>
                </div>
              </li>
              <li>
                <time>04:08:16 to 04:10:04</time>
                <div>
                  <strong>47 liquidations</strong>
                  <p>
                    The reconstructed Vesu liquidation window affects 42
                    borrower wallets in seven pools.
                  </p>
                </div>
              </li>
              <li>
                <time>By approximately 04:40</time>
                <div>
                  <strong>Reported medians normalize</strong>
                  <p>
                    The main liquidation window ends earlier; derived feeds
                    recover on their own cadence.
                  </p>
                </div>
              </li>
              <li>
                <time>07:59</time>
                <div>
                  <strong>SDK 2.13.1 hotfix</strong>
                  <p>
                    The conversion factor used to construct other feeds is fixed
                    at 1.00, removing the feedback path.
                  </p>
                </div>
              </li>
              <li>
                <time>7 September</time>
                <div>
                  <strong>Main recovery transfer confirmed</strong>
                  <p>
                    Funds returned by the principal liquidator reach the Vesu
                    Security Council multisig. Curator distribution work
                    follows.
                  </p>
                </div>
              </li>
              <li>
                <time>13 September</time>
                <div>
                  <strong>Vesu announces completion of asset recovery</strong>
                  <p>
                    Vesu publishes the recovery figures and recommended refund
                    approach. Pool curators are responsible for distributions.
                  </p>
                </div>
              </li>
              <li>
                <time>13 September</time>
                <div>
                  <strong>Monitoring corrections deployed</strong>
                  <p>
                    Decimal normalization, reference collection,
                    publishing-cadence health checks and reorg recovery are
                    corrected and deployed.
                  </p>
                </div>
              </li>
              <li>
                <time>15 September</time>
                <div>
                  <strong>Reference conversion improvements released</strong>
                  <p>
                    The SDK adds measured USDT conversion before reference
                    aggregation and a four-source default for USDT and USDC.
                    Production configuration is updated to v2.16.1; this records
                    the configuration change, not verified rollout to every
                    publisher.
                  </p>
                </div>
              </li>
              <li>
                <time>16 September</time>
                <div>
                  <strong>Foundation publisher listed and verified</strong>
                  <p>
                    The funded Foundation address is publishing on mainnet and
                    visible in the explorer with 14 markets.
                  </p>
                </div>
              </li>
              <li>
                <time>17 September</time>
                <div>
                  <strong>Publisher and source history goes live</strong>
                  <p>
                    The explorer adds full indexed market coverage, freshness,
                    update frequency and price history with publisher and source
                    filters. Successful submissions from all five publishers are
                    verified.
                  </p>
                </div>
              </li>
            </ol>
          </section>
          <section id="impact">
            <h2>Impact on users and pools</h2>
            <p>
              The initial reconstruction used pre-incident Pragma median prices
              to value the affected transactions. These are incident estimates,
              not a final recovery or compensation statement.
            </p>
            <div className="incident-table-wrap">
              <table>
                <caption>Initial incident reconstruction</caption>
                <thead>
                  <tr>
                    <th>Measure</th>
                    <th>Estimated value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Liquidated positions</td>
                    <td>47</td>
                  </tr>
                  <tr>
                    <td>Borrower wallets</td>
                    <td>42</td>
                  </tr>
                  <tr>
                    <td>Affected pools</td>
                    <td>7</td>
                  </tr>
                  <tr>
                    <td>Collateral seized</td>
                    <td>$3,077,500</td>
                  </tr>
                  <tr>
                    <td>Debt repaid by liquidators</td>
                    <td>$1,674,711</td>
                  </tr>
                  <tr>
                    <td>Borrower equity lost</td>
                    <td>$783,905</td>
                  </tr>
                  <tr>
                    <td>Bad debt absorbed by pools</td>
                    <td>$618,884</td>
                  </tr>
                  <tr>
                    <td>Liquidator proceeds above debt repaid</td>
                    <td>$1,402,789</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              Collateral seized is not the same measure as users’ net loss.
              Liquidators repaid debt, borrowers lost equity, and pools absorbed
              bad debt. Recovery proceeds reduce the final loss only once
              received and allocated; the figures above should not be read as
              the amount still outstanding today.
            </p>
          </section>
          <section id="response">
            <h2>Response and recovery</h2>
            <p>
              Pragma released SDK 2.13.1 at 07:59 UTC. The change stops the SDK
              from using its own oracle’s USDT/USD output to construct other
              feeds. The direct USDT/USD feed remains separately published and
              aggregated.
            </p>
            <p>
              The initial 1.00 factor was a containment measure, not a model of
              a real stablecoin depeg. Subsequent SDK releases use measured
              references. The 15 September release also normalizes USDT-quoted
              reference prices before aggregation and strengthens the USDT and
              USDC source quorum. Rollout verification and composed-price
              source-count reporting remain in the remediation tracker below.
            </p>
            <p>
              Recovery coordination involved Vesu, pool curators, StarkWare, the
              Starknet Foundation and Pragma. The principal liquidator’s
              recovery transfer was confirmed in the Vesu Security Council
              multisig on 7 September. The subsequent allocation to borrowers
              and lending pools is handled with the curators.
            </p>
            <p>
              Vesu confirmed completion of asset recovery on 13 September. The
              Vesu and Starknet Security Councils, curators and partners worked
              with liquidators who voluntarily returned funds; some liquidators
              could not be identified or reached. Vesu’s published accounting
              uses 11 September prices:
            </p>
            <div className="incident-table-wrap">
              <table>
                <caption>
                  Vesu recovery accounting / 11 September prices
                </caption>
                <thead>
                  <tr>
                    <th>Measure</th>
                    <th>Reported value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Assets recovered, before conversion costs</td>
                    <td>$1,330,278.93</td>
                  </tr>
                  <tr>
                    <td>Available for distribution after swaps</td>
                    <td>$1,324,085.08</td>
                  </tr>
                  <tr>
                    <td>Lender claims from bad debt</td>
                    <td>$657,386.80</td>
                  </tr>
                  <tr>
                    <td>Borrower claims</td>
                    <td>$737,913.96</td>
                  </tr>
                  <tr>
                    <td>Total claims</td>
                    <td>$1,395,300.76</td>
                  </tr>
                  <tr>
                    <td>Reported recovery rate</td>
                    <td>95%</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              At prices on the morning of 4 September, Vesu values the same
              recovery at 93%. The difference reflects market movements between
              valuation dates. These figures use a different price basis from
              our initial incident estimates above; they do not mean 95% of
              every original position has been restored.
            </p>
            <h3>How refunds work</h3>
            <p>
              Vesu, Re7 Labs and Clearstar hold recovered assets for their
              respective pools. Vesu recommends applying the same recovery rate
              to lenders’ bad-debt losses and borrowers’ net losses, but each
              curator decides its pool’s refund process. Under the recommended
              approach:
            </p>
            <ul>
              <li>
                Lenders still holding an affected position receive value through
                a top-up of the pool reserve; no action is needed.
              </li>
              <li>
                Lenders who withdrew after absorbing bad debt should contact
                their curator for a direct refund.
              </li>
              <li>
                Liquidated borrowers should contact their curator. Their claim
                is the collateral lost minus the debt repaid, with a direct
                refund in the collateral asset. The liquidation is not reversed.
              </li>
            </ul>
            <p>
              Vesu also reports separate compensation for missed BTCfi rewards
              while liquidated positions were closed. This is outside the
              recovery pot and is available through the regular BTCfi rewards
              process.
            </p>
            <p>
              See{" "}
              <a href="https://docs.vesu.xyz/blog/2026-09-13-incident-refunds">
                Vesu’s refund guide <ArrowUpRight size={14} />
              </a>{" "}
              for the full methodology and open a ticket in{" "}
              <a href="https://discord.gg/G9Gxgujj8T">
                Vesu’s official Discord
              </a>{" "}
              to reach your curator about a specific position. Refunds go to the
              addresses that held those positions. Vesu warns that neither it
              nor a curator will contact you asking you to connect a wallet or
              sign a message to claim an incident refund. Questions about
              Pragma’s feeds can be sent to{" "}
              <a href="mailto:support@pragma.build">support@pragma.build</a>.
            </p>
          </section>
          <section id="remediation">
            <h2>Remediation tracker</h2>
            <p>
              Updated 23 September. Monitoring deployment and fresh calculations
              were verified on 13 September at 21:21 UTC; publisher submissions
              and the explorer release were verified on 17 September, and the
              administration migration onchain on 22 September. The SDK entry
              distinguishes a merged deployment configuration from runtime
              verification. Recovery completion does not close the outstanding
              engineering and operational work.
            </p>
            <div className="remediation-list">
              <div>
                <span className="remediation-status">Deployed</span>
                <h3>Remove the conversion feedback path</h3>
                <p>
                  The 4 September SDK 2.13.1 hotfix removed reuse of the onchain
                  USDT/USD median when constructing other feeds.
                </p>
              </div>
              <div>
                <span className="remediation-status pending">
                  Released / rollout verification open
                </span>
                <h3>
                  Normalize reference prices and strengthen source quorums
                </h3>
                <p>
                  SDK v2.16.1 includes measured USDT-to-USD conversion before
                  reference aggregation, a default minimum of four accepted
                  sources for USDT and USDC, and omission of USDT quotes when
                  their conversion cannot be verified. Converted references
                  inherit the conversion’s verification time. The mainnet image
                  configuration was merged on 15 September; runtime rollout
                  across publishers still needs verification. This does not
                  implement composed-price source-count reporting.
                </p>
              </div>
              <div>
                <span className="remediation-status pending">
                  Immediate priority / open
                </span>
                <h3>Report accurate source counts for composed prices</h3>
                <p>
                  Carry source-count information through conversion and derived
                  price calculations so a weak shared input cannot be hidden by
                  the number of final observations. Validate the corrected
                  reporting against Vesu’s existing minimum-source check with an
                  incident regression test before marking this item complete.
                  Implementation and deployment are pending.
                </p>
              </div>
              <div>
                <span className="remediation-status">Deployed</span>
                <h3>Monitor publishers, freshness and deviations</h3>
                <p>
                  Rules cover publisher outages, stale core feeds, insufficient
                  source counts, nonpositive prices, stablecoin deviations,
                  independent references and publisher gas. Telegram reports are
                  grouped to reduce repeated messages. A separate urgent
                  response path and named responders still need to be finalized.
                </p>
              </div>
              <div>
                <span className="remediation-status">Deployed</span>
                <h3>Correct the monitoring calculations</h3>
                <p>
                  Monitoring v0.1.30 fixes overflow when normalizing 18-decimal
                  sources and restores independent reference lookups. v0.1.31
                  aligns indexer health with the deployed 30-minute publishing
                  heartbeat.
                </p>
              </div>
              <div>
                <span className="remediation-status">
                  Deployed / live observation pending
                </span>
                <h3>Resume deviation metrics after a reorg</h3>
                <p>
                  v0.1.32 restores the monitor’s synced state when replacement
                  events catch up. Regression tests passed and fresh production
                  calculations were verified. No natural reorg occurred during
                  the deployment check, so recovery after a live reorg was not
                  yet observed in that window.
                </p>
              </div>
              <div>
                <span className="remediation-status">
                  Migrated / 22 September
                </span>
                <h3>Move contract administration to a 3-of-5 multisig</h3>
                <p>
                  The publisher registry moved at 19:55:30 UTC on 22 September
                  and the oracle at 19:55:40 UTC; both contracts now return{" "}
                  <code>
                    0x04960b27dbc0bf6e66045baabbffe9875e8cc4ec81367630e0cbc5dfd1e249a9
                  </code>{" "}
                  as their administrator, replacing the single key. This
                  protects administration; it is separate from the pricing bug
                  that caused the incident. The randomness contract has a
                  separate administrator and is not covered by this change.
                </p>
              </div>
              <div>
                <span className="remediation-status">
                  Participation verified / follow-up open
                </span>
                <h3>
                  Restore publisher participation and review remaining
                  discrepancies
                </h3>
                <p>
                  Ready and StarkWare have resumed publishing. The Foundation
                  publisher is funded, publishing and listed with 14 markets.
                  Successful mainnet submissions from Pragma, StarkWare, Ready,
                  AVNU and the Foundation were verified on 17 September. These
                  checks establish participation, not continuous availability or
                  price accuracy. Freshness, independent-reference disagreements
                  and upstream capacity remain operational follow-ups.
                </p>
              </div>
              <div>
                <span className="remediation-status">Live / 17 September</span>
                <h3>Expose publisher coverage, freshness and price history</h3>
                <p>
                  Publisher pages list all indexed markets and sources,
                  including inactive observations, with last-update times,
                  24-hour update counts and average observations per hour. Asset
                  charts support up to seven days of history, publisher and
                  source selection, median comparison, transaction links and CSV
                  export. Views beyond 24 hours use 30-minute samples. These are
                  read-only visibility improvements; they do not change oracle
                  aggregation or fix source-count reporting.{" "}
                  <Link href="/asset/BTC-USD#price-history">
                    Inspect a price history ↓
                  </Link>
                </p>
              </div>
            </div>
          </section>
          <section id="lessons">
            <h2>What we learned</h2>
            <p>
              <strong>
                Publisher redundancy is not software independence.
              </strong>{" "}
              Two operators running the same conversion path can publish the
              same wrong result. We need to evaluate shared dependencies as well
              as operator count.
            </p>
            <p>
              <strong>
                Source counts must describe the inputs behind the price.
              </strong>{" "}
              Vesu’s minimum-source safeguard depends on accurate counts from
              Pragma, including the inputs used for conversions and derived
              prices. We must supply that information so the safeguard can work
              as intended. Freshness checks, independent price comparisons and
              route-liquidity checks remain additional protections.
            </p>
            <p>
              <strong>Derived assets need consistency checks.</strong> A
              derivative and its underlying can become dangerously inconsistent
              when they recover at different times. That failure mode belongs in
              integration testing.
            </p>
            <p>
              <strong>Monitoring must itself be verified.</strong> During the
              follow-up we found that a chain reorg could freeze deviation
              calculations while indexing continued. The presence of a metric
              series was not proof of a newly computed observation. Verification
              now checks changed values alongside sync and indexing state.
            </p>
            <p>
              The remaining work is to turn these lessons into sustained
              operating controls, complete the governance transition and track
              curator distribution updates. This page provides the dated record
              of that work.
            </p>
          </section>
          <section id="sources">
            <h2>Sources and technical references</h2>
            <p>
              This report draws on Pragma’s 4 September technical reconstruction
              shared with incident participants, transaction receipts and
              block-level oracle reads, the verified 13 September monitoring
              deployment, and the 17 September publisher and explorer checks.
              Recovery and refund information comes from Vesu’s public 13
              September update and refund guide, rechecked on 17 September.
            </p>
            <ul className="incident-references">
              <li>
                <a href="https://x.com/vesuxyz/status/2099125070304076013">
                  Vesu recovery update, 13 September ↗
                </a>
              </li>
              <li>
                <a href="https://docs.vesu.xyz/blog/2026-09-13-incident-refunds">
                  Vesu recovery accounting and refund guide ↗
                </a>
              </li>
              <li>
                <a href="https://voyager.online/tx/0x2dfe997bf4552a23cff7a70d373b2a0df2baf56eb66c4298d49fb68f386c142">
                  Triggering oracle update, block 14,333,752 ↗
                </a>
              </li>
              <li>
                <a href="https://github.com/astraly-labs/pragma-sdk">
                  Publisher SDK and release history ↗
                </a>
              </li>
              <li>
                <a href="https://github.com/astraly-labs/pragma-oracle">
                  Oracle aggregation contracts ↗
                </a>
              </li>
              <li>
                <a href="https://github.com/astraly-labs/pragma-monitoring/pull/78">
                  Source normalization correction ↗
                </a>
              </li>
              <li>
                <a href="https://github.com/astraly-labs/pragma-monitoring/pull/82">
                  Publishing-cadence health correction ↗
                </a>
              </li>
              <li>
                <a href="https://github.com/astraly-labs/pragma-monitoring/pull/83">
                  Reorg recovery correction ↗
                </a>
              </li>
              <li>
                <a href="https://github.com/astraly-labs/pragma-sdk/pull/335">
                  Measured reference conversion and source quorums ↗
                </a>
              </li>
              <li>
                <a href="https://github.com/astraly-labs/devops/pull/218">
                  Publisher v2.16.1 deployment configuration ↗
                </a>
              </li>
              <li>
                <a href="https://github.com/astraly-labs/Pragma/pull/498">
                  Publisher coverage and source-history release ↗
                </a>
              </li>
            </ul>
          </section>
        </article>
      </div>
    </div>
  );
}
