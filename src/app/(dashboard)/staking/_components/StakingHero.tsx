"use client";

import { motion } from "motion/react";
import { Copy, Check, Shield, ExternalLink } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import type { StakingDataSerialized } from "@/lib/staking";
import { truncateAddress, VOYAGER_DELEGATE_URL } from "@/lib/staking";
import { staggerContainer, fadeInUp } from "@/lib/animations";

export function StakingHero({ data }: { data: StakingDataSerialized | null }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!data) return;
    navigator.clipboard.writeText(data.validator.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="w-full rounded-2xl border border-lightGreen/10 bg-darkGreen/60 p-6 backdrop-blur-md sm:p-10"
    >
      <motion.div
        variants={fadeInUp}
        className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between"
      >
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:gap-8">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-mint/20 bg-mint/5 sm:h-20 sm:w-20">
            <Image
              src="/favicon-32x32.png"
              alt="Pragma"
              width={40}
              height={40}
              className="h-8 w-8 sm:h-10 sm:w-10"
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-lightGreen">
                {data?.validator.name || "Pragma"} Validator
              </h2>
              {data && !data.stakerInfo.isUnstaking && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-mint/10 px-3 py-1 text-xs font-medium text-mint">
                  <span className="h-1.5 w-1.5 rounded-full bg-mint" />
                  Active
                </span>
              )}
              {data?.stakerInfo.isUnstaking && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-redDown/10 px-3 py-1 text-xs font-medium text-redDown">
                  <span className="h-1.5 w-1.5 rounded-full bg-redDown" />
                  Unstaking
                </span>
              )}
            </div>

            {data && (
              <button
                onClick={handleCopy}
                className="group flex items-center gap-2 font-mono text-sm text-lightGreen/50 transition-colors hover:text-lightGreen"
              >
                <Shield className="h-3.5 w-3.5" />
                {truncateAddress(data.validator.address)}
                {copied ? (
                  <Check className="h-3.5 w-3.5 text-mint" />
                ) : (
                  <Copy className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                )}
              </button>
            )}

            {!data && (
              <p className="text-sm text-lightGreen/40">
                Unable to load validator data. Please try again later.
              </p>
            )}
          </div>
        </div>

        {data && (
          <motion.a
            variants={fadeInUp}
            href={VOYAGER_DELEGATE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-mint px-6 py-3 text-sm font-semibold text-darkGreen shadow-[0_0_20px_rgba(21,255,129,0.15)] transition-all hover:shadow-[0_0_30px_rgba(21,255,129,0.3)]"
          >
            Delegate STRK
            <ExternalLink className="h-4 w-4" />
          </motion.a>
        )}
      </motion.div>

      {data && (
        <motion.p
          variants={fadeInUp}
          className="mt-6 max-w-2xl text-sm leading-relaxed text-lightGreen/60"
        >
          Pragma operates a Starknet validator node securing the network.
          Delegate your STRK to earn staking rewards while supporting
          decentralized oracle infrastructure.
        </motion.p>
      )}
    </motion.div>
  );
}
