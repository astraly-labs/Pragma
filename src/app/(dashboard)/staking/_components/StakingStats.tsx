"use client";

import { motion, useInView } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { Coins, Users, Layers, Gift, Percent, PieChart } from "lucide-react";
import type { StakingDataSerialized } from "@/lib/staking";
import { formatSTRK } from "@/lib/staking";

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  suffix?: string;
  delay: number;
}

function StatCard({ icon, label, value, suffix, delay }: StatCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="flex flex-col gap-3 rounded-2xl border border-lightGreen/10 bg-darkGreen/40 p-5 backdrop-blur-sm transition-colors hover:border-mint/20"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-mint/10 text-mint">
          {icon}
        </div>
        <span className="text-xs uppercase tracking-widest text-lightGreen/40">
          {label}
        </span>
      </div>
      <div className="flex items-baseline gap-1.5">
        <span className="font-mono text-2xl font-medium tracking-tight text-lightGreen">
          {value}
        </span>
        {suffix && <span className="text-sm text-lightGreen/40">{suffix}</span>}
      </div>
    </motion.div>
  );
}

export function StakingStats({ data }: { data: StakingDataSerialized }) {
  const { stakerInfo, totalNetworkStake } = data;

  const ownStake = BigInt(stakerInfo.amountOwn);
  const delegated = BigInt(stakerInfo.poolDelegatedAmount);
  const totalValidator = ownStake + delegated;
  const networkTotal = BigInt(totalNetworkStake);
  const zero = BigInt(0);
  const networkShare =
    networkTotal > zero
      ? Number((totalValidator * BigInt(10000)) / networkTotal) / 100
      : 0;

  const stats = [
    {
      icon: <Coins className="h-4 w-4" />,
      label: "Own Stake",
      value: formatSTRK(ownStake),
      suffix: "STRK",
    },
    {
      icon: <Users className="h-4 w-4" />,
      label: "Delegated",
      value: formatSTRK(delegated),
      suffix: "STRK",
    },
    {
      icon: <Layers className="h-4 w-4" />,
      label: "Total Stake",
      value: formatSTRK(totalValidator),
      suffix: "STRK",
    },
    {
      icon: <Gift className="h-4 w-4" />,
      label: "Unclaimed Rewards",
      value: formatSTRK(stakerInfo.unclaimedRewardsOwn),
      suffix: "STRK",
    },
    {
      icon: <Percent className="h-4 w-4" />,
      label: "Commission",
      value: `${stakerInfo.poolCommission}`,
      suffix: "%",
    },
    {
      icon: <PieChart className="h-4 w-4" />,
      label: "Network Share",
      value: networkShare.toFixed(2),
      suffix: "%",
    },
  ];

  return (
    <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
      {stats.map((stat, i) => (
        <StatCard key={stat.label} {...stat} delay={i * 0.08} />
      ))}
    </div>
  );
}
