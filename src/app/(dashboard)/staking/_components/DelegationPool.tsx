"use client";

import { motion } from "motion/react";
import { ExternalLink, Copy, Check } from "lucide-react";
import { useState } from "react";
import type { StakingDataSerialized } from "@/lib/staking";
import { formatSTRK, truncateAddress } from "@/lib/staking";
import { fadeInUp } from "@/lib/animations";

function CopyableAddress({
  address,
  label,
}: {
  address: string;
  label: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs uppercase tracking-widest text-lightGreen/40">
        {label}
      </span>
      <div className="flex items-center gap-2">
        <span className="font-mono text-sm text-lightGreen/70">
          {truncateAddress(address)}
        </span>
        <button
          onClick={handleCopy}
          className="text-lightGreen/30 transition-colors hover:text-mint"
        >
          {copied ? (
            <Check className="h-3.5 w-3.5 text-mint" />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}
        </button>
        <a
          href={`https://voyager.online/contract/${address}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-lightGreen/30 transition-colors hover:text-mint"
        >
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  );
}

export function DelegationPool({ data }: { data: StakingDataSerialized }) {
  const { stakerInfo } = data;

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="flex h-full flex-col gap-5 rounded-2xl border border-lightGreen/10 bg-darkGreen/40 p-6 backdrop-blur-sm"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg text-lightGreen">Delegation Pool</h3>
        {stakerInfo.hasPool ? (
          <span className="rounded-full bg-mint/10 px-3 py-1 text-xs text-mint">
            Open for delegation
          </span>
        ) : (
          <span className="rounded-full bg-redDown/10 px-3 py-1 text-xs text-redDown">
            Not accepting delegation
          </span>
        )}
      </div>

      {stakerInfo.hasPool && stakerInfo.poolContract && (
        <div className="flex flex-col gap-4">
          <CopyableAddress
            address={stakerInfo.poolContract}
            label="Pool Contract"
          />
          <CopyableAddress
            address={stakerInfo.operationalAddress}
            label="Operational Address"
          />
          <CopyableAddress
            address={stakerInfo.rewardAddress}
            label="Reward Address"
          />

          <div className="mt-2 grid grid-cols-2 gap-4 rounded-xl bg-lightGreen/5 p-4">
            <div className="flex flex-col gap-1">
              <span className="text-xs uppercase tracking-widest text-lightGreen/40">
                Delegated Amount
              </span>
              <span className="font-mono text-base text-lightGreen">
                {formatSTRK(stakerInfo.poolDelegatedAmount)}{" "}
                <span className="text-xs text-lightGreen/40">STRK</span>
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs uppercase tracking-widest text-lightGreen/40">
                Commission Rate
              </span>
              <span className="font-mono text-base text-lightGreen">
                {stakerInfo.poolCommission}%
              </span>
            </div>
          </div>
        </div>
      )}

      {!stakerInfo.hasPool && (
        <p className="text-sm text-lightGreen/40">
          This validator does not currently have an active delegation pool.
        </p>
      )}
    </motion.div>
  );
}
