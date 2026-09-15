import { EXPLORER_NETWORKS, MIDEN_DEPLOYMENT } from "@/lib/explorer-networks";

export default function MidenDeployment() {
  return (
    <section
      className="explorer-panel"
      aria-labelledby="miden-deployment-title"
    >
      <div className="explorer-section-title">
        <div>
          <span className="eyebrow">02 / Oracle deployment</span>
          <h2 id="miden-deployment-title">{EXPLORER_NETWORKS.miden}</h2>
        </div>
        <a
          className="text-link"
          href="https://docs.pragma.build/miden/introduction"
        >
          Miden docs ↗
        </a>
      </div>
      <p className="explorer-caption">
        {MIDEN_DEPLOYMENT.network === "testnet" &&
          "Testnet only. For development and testing. "}
        Oracle observation times, source counts and publisher activity are not
        reported by this deployment.
      </p>
      <dl className="grid gap-6 p-6 sm:grid-cols-2">
        {(["oracle", "publisher"] as const).map((role) => (
          <div key={role} className="min-w-0">
            <dt className="mb-2 font-mono text-xs uppercase tracking-widest text-LightGreenFooter">
              {role} account
            </dt>
            <dd>
              <a
                className="break-all font-mono text-sm text-lightGreen hover:text-mint"
                href={`${MIDEN_DEPLOYMENT.explorerUrl}/account/${MIDEN_DEPLOYMENT[role]}`}
              >
                {MIDEN_DEPLOYMENT[role]} ↗
              </a>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
