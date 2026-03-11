"use client";

import { motion, AnimatePresence } from "motion/react";
import { Copy, Check, Shield, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import type { StakingDataSerialized } from "@/lib/staking";
import {
  truncateAddress,
  VOYAGER_DELEGATE_URL,
  ENDUR_DELEGATE_URL,
} from "@/lib/staking";
import { staggerContainer, fadeInUp } from "@/lib/animations";

export function StakingHero({ data }: { data: StakingDataSerialized | null }) {
  const [copied, setCopied] = useState(false);
  const [stakeOpen, setStakeOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setStakeOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

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
              {data && data.liveliness > 0 && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-lightGreen/15 px-3 py-1 text-xs text-lightGreen/70">
                  <svg
                    className="h-3.5 w-3.5 text-mint"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <circle
                      cx="8"
                      cy="8"
                      r="6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeDasharray={`${(data.liveliness / 100) * 37.7} 37.7`}
                      strokeLinecap="round"
                      transform="rotate(-90 8 8)"
                    />
                    <circle cx="8" cy="8" r="2" fill="currentColor" />
                  </svg>
                  {data.liveliness.toFixed(2)}% liveliness
                </span>
              )}
              {data && data.apy > 0 && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-mint/20 bg-mint/5 px-3 py-1 text-xs font-medium text-mint">
                  {data.apy.toFixed(2)}% APY
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
          <motion.div
            variants={fadeInUp}
            ref={dropdownRef}
            className="relative"
          >
            <button
              onClick={() => setStakeOpen(!stakeOpen)}
              className="inline-flex items-center gap-2 rounded-full bg-mint px-6 py-3 text-sm font-semibold text-darkGreen shadow-[0_0_20px_rgba(21,255,129,0.15)] transition-all hover:shadow-[0_0_30px_rgba(21,255,129,0.3)]"
            >
              Delegate STRK
              <ChevronDown
                className={`h-4 w-4 transition-transform ${stakeOpen ? "rotate-180" : ""}`}
              />
            </button>
            <AnimatePresence>
              {stakeOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 4, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.97 }}
                  transition={{ duration: 0.12 }}
                  className="absolute right-0 z-20 mt-2 w-56 overflow-hidden rounded-xl border border-lightGreen/10 bg-[#082f28ee] shadow-2xl shadow-black/30 backdrop-blur-2xl"
                >
                  <a
                    href={VOYAGER_DELEGATE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setStakeOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-lightGreen/5"
                  >
                    <Image
                      src="/assets/ecosystem/voyager.png"
                      alt="Voyager"
                      width={24}
                      height={24}
                      className="h-6 w-6 rounded-md"
                    />
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-lightGreen">
                        Voyager
                      </span>
                      <span className="text-[11px] text-lightGreen/40">
                        Native staking
                      </span>
                    </div>
                  </a>
                  <div className="h-px bg-lightGreen/10" />
                  <a
                    href={ENDUR_DELEGATE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setStakeOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-lightGreen/5"
                  >
                    <Image
                      src="/assets/ecosystem/endur.svg"
                      alt="Endur"
                      width={24}
                      height={24}
                      className="h-6 w-6 rounded-md"
                    />
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-lightGreen">
                        Endur
                      </span>
                      <span className="text-[11px] text-lightGreen/40">
                        Native staking dashboard
                      </span>
                    </div>
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
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
