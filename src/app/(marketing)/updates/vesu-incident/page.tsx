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
    modifiedTime: "2026-09-14",
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
        <Link href="/" className="text-link">
          <ArrowLeft size={16} /> Back to Pragma
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
          <span>Remediation verified through 13 September, 21:21 UTC</span>
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
            <span className="eyebrow">Latest update / 14 September</span>
            <h2>The feedback path is removed. Hardening continues.</h2>
            <p>
              The 4 September publisher hotfix removed the use of the oracle’s
              USDT/USD median as a conversion input for other feeds. On 13
              September we deployed additional monitoring corrections and
              verified fresh deviation calculations in production.
            </p>
            <p>
              A 3-of-4 multisig for contract administration is being
              coordinated. The ownership transfer has not happened. Publisher
              availability and independent-reference discrepancies still need
              operational follow-up.
            </p>
            <p>
              Recovery and user distributions are coordinated with Vesu and the
              affected pool curators. We do not yet have a reconciled, final
              distribution total to publish here.
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
              Many affected feeds still contained numerous source observations.
              A source-count check alone could not detect that those sources had
              all been transformed by the same faulty input.
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
              did not reject the populated BTC and ETH feeds carrying the
              correlated error. The reconstruction points to incorrect oracle
              inputs, rather than a defect in Vesu’s liquidation arithmetic.
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
                  <strong>Monitoring corrections deployed</strong>
                  <p>
                    Decimal normalization, reference collection,
                    publishing-cadence health checks and reorg recovery are
                    corrected and deployed.
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
              The 1.00 factor is a containment measure. It prevents this
              particular feedback mechanism, but it does not model a real
              stablecoin depeg. A durable conversion design must explicitly
              handle quote currencies, liquidity, independent references and
              abnormal market conditions.
            </p>
            <p>
              Recovery coordination involved Vesu, pool curators, StarkWare, the
              Starknet Foundation and Pragma. The principal liquidator’s
              recovery transfer was confirmed in the Vesu Security Council
              multisig on 7 September. The subsequent allocation to borrowers
              and lending pools is handled with the curators.
            </p>
            <p>
              We will add a reconciled recovery total when the received funds
              and completed distributions can be accounted for together. We are
              not claiming that every affected user has been made whole.
            </p>
            <p>
              For an affected Vesu position, use{" "}
              <a href="https://vesu.xyz">
                Vesu’s official support channels <ArrowUpRight size={14} />
              </a>{" "}
              and your pool curator for position-specific distribution
              information. Questions about Pragma’s feeds can be sent to{" "}
              <a href="mailto:support@pragma.build">support@pragma.build</a>.
            </p>
          </section>
          <section id="remediation">
            <h2>Remediation tracker</h2>
            <p>
              These statuses describe verified work as of 13 September at 21:21
              UTC. Deployment does not by itself close the wider operating and
              data-quality issues.
            </p>
            <div className="remediation-list">
              <div>
                <span className="remediation-status">Deployed</span>
                <h3>Remove the conversion feedback path</h3>
                <p>
                  SDK 2.13.1 stops reuse of the onchain USDT/USD median when
                  constructing other feeds. The permanent handling of real
                  stablecoin deviations remains a separate design task.
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
                <span className="remediation-status pending">
                  In coordination
                </span>
                <h3>Move contract administration to a 3-of-4 multisig</h3>
                <p>
                  The intended participants are Pragma’s two founders, a
                  Foundation nominee and a StarkWare nominee. Signer nominations
                  and keys are still being collected. No contract ownership
                  transfer has been submitted. This protects administration; it
                  is separate from the pricing bug that caused the incident.
                </p>
              </div>
              <div>
                <span className="remediation-status pending">Open</span>
                <h3>
                  Restore publisher participation and review remaining
                  discrepancies
                </h3>
                <p>
                  Registered Ready/ARGENT and StarkWare publishers still had
                  stale observations in the last operating check. Foundation
                  publisher onboarding is in progress. Independent-reference
                  disagreements and upstream RPC capacity also require
                  follow-up.
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
                A timestamp and a source count are not sufficient quality
                checks.
              </strong>{" "}
              Fresh observations can depend on a stale route. Numerous
              observations can share one incorrect conversion factor.
              Independent price comparisons and route-liquidity checks must
              accompany freshness and count checks.
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
              operating controls, complete the governance transition and publish
              reconciled recovery information. This page provides the dated
              record of that work.
            </p>
          </section>
          <section id="sources">
            <h2>Technical references</h2>
            <p>
              This report draws on Pragma’s 4 September technical reconstruction
              shared with incident participants, transaction receipts and
              block-level oracle reads, and the verified 13 September deployment
              record.
            </p>
            <ul className="incident-references">
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
            </ul>
          </section>
        </article>
      </div>
    </div>
  );
}
