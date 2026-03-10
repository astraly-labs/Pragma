"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import type { StakingDataSerialized } from "@/lib/staking";
import { formatSTRK } from "@/lib/staking";
import { fadeInUp } from "@/lib/animations";

function DonutChart({
  segments,
  size = 140,
}: {
  segments: { pct: number; color: string; label: string }[];
  size?: number;
}) {
  const r = size / 2;
  const strokeWidth = 18;
  const innerR = r - strokeWidth / 2;
  const circumference = 2 * Math.PI * innerR;

  let offset = 0;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle
        cx={r}
        cy={r}
        r={innerR}
        fill="none"
        stroke="rgba(181,240,229,0.08)"
        strokeWidth={strokeWidth}
      />
      {segments.map((seg, i) => {
        const dashLen = (seg.pct / 100) * circumference;
        const dashOffset = -offset;
        offset += dashLen;
        return (
          <circle
            key={i}
            cx={r}
            cy={r}
            r={innerR}
            fill="none"
            stroke={seg.color}
            strokeWidth={strokeWidth}
            strokeDasharray={`${dashLen} ${circumference - dashLen}`}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
            transform={`rotate(-90 ${r} ${r})`}
          />
        );
      })}
    </svg>
  );
}

export function StakeBreakdown({ data }: { data: StakingDataSerialized }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const ownStake = BigInt(data.stakerInfo.amountOwn);
  const delegated = BigInt(data.stakerInfo.poolDelegatedAmount);
  const total = ownStake + delegated;
  const zero = BigInt(0);

  const ownPct =
    total > zero ? Number((ownStake * BigInt(100000)) / total) / 1000 : 0;
  const delPct =
    total > zero ? Number((delegated * BigInt(100000)) / total) / 1000 : 0;

  const networkTotal = BigInt(data.totalNetworkStake);
  const validatorPct =
    networkTotal > zero
      ? Number((total * BigInt(10000)) / networkTotal) / 100
      : 0;
  const restPct = Math.max(100 - validatorPct, 0);

  return (
    <motion.div
      ref={ref}
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="flex h-full flex-col gap-6 rounded-2xl border border-lightGreen/10 bg-darkGreen/40 p-6 backdrop-blur-sm"
    >
      <h3 className="text-lg text-lightGreen">Stake Breakdown</h3>

      <div className="flex flex-col gap-6">
        {/* Donut chart + legend */}
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-8">
          <div className="relative shrink-0">
            <DonutChart
              segments={[
                { pct: ownPct, color: "#15FF81", label: "Own" },
                {
                  pct: delPct,
                  color: "rgba(21,255,129,0.35)",
                  label: "Delegated",
                },
              ]}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-mono text-lg font-medium text-lightGreen">
                {(ownPct + delPct).toFixed(0)}%
              </span>
              <span className="text-[10px] uppercase tracking-wider text-lightGreen/40">
                Total
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="h-3 w-3 rounded-full bg-mint" />
              <div className="flex flex-col">
                <span className="text-xs text-lightGreen/50">
                  Own Stake ({ownPct.toFixed(2)}%)
                </span>
                <span className="font-mono text-sm text-lightGreen">
                  {formatSTRK(ownStake)} STRK
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="h-3 w-3 rounded-full bg-mint/35" />
              <div className="flex flex-col">
                <span className="text-xs text-lightGreen/50">
                  Delegated ({delPct.toFixed(2)}%)
                </span>
                <span className="font-mono text-sm text-lightGreen">
                  {formatSTRK(delegated)} STRK
                </span>
              </div>
            </div>
            <div className="mt-1 h-px w-full bg-lightGreen/10" />
            <div className="flex items-center gap-3">
              <span className="h-3 w-3 rounded-sm border border-lightGreen/20" />
              <div className="flex flex-col">
                <span className="text-xs text-lightGreen/50">Total</span>
                <span className="font-mono text-sm font-medium text-lightGreen">
                  {formatSTRK(total)} STRK
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="h-px w-full bg-lightGreen/10" />

        {/* Network share bar */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-lightGreen/60">Network Share</span>
            <span className="font-mono text-sm text-lightGreen">
              {validatorPct.toFixed(2)}%
            </span>
          </div>
          <div className="relative flex h-3 w-full overflow-hidden rounded-full bg-lightGreen/10">
            <motion.div
              className="h-full rounded-full bg-mint"
              initial={{ width: 0 }}
              animate={
                isInView ? { width: `${Math.max(validatorPct, 0.5)}%` } : {}
              }
              transition={{ duration: 1, delay: 0.4, ease: "easeOut" as const }}
            />
          </div>
          <div className="flex gap-6 text-xs">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-mint" />
              <span className="text-lightGreen/50">
                Pragma ({validatorPct.toFixed(2)}%)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-lightGreen/10" />
              <span className="text-lightGreen/50">
                Others ({restPct.toFixed(2)}%)
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
