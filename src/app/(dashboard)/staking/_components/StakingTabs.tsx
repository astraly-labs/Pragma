"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useQuery } from "@tanstack/react-query";
import { ExternalLink, Copy, Check } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import type { StakingEventsData } from "@/lib/staking";
import { formatSTRK, truncateAddress } from "@/lib/staking";

const TABS = ["Delegators", "Activity", "Attestations"] as const;
type Tab = (typeof TABS)[number];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
      className="text-lightGreen/30 transition-colors hover:text-mint"
    >
      {copied ? (
        <Check className="h-3 w-3 text-mint" />
      ) : (
        <Copy className="h-3 w-3" />
      )}
    </button>
  );
}

function VoyagerLink({ path, label }: { path: string; label: string }) {
  return (
    <a
      href={`https://voyager.online/${path}`}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 font-mono text-sm text-lightGreen/70 transition-colors hover:text-mint"
    >
      {label}
      <ExternalLink className="h-3 w-3" />
    </a>
  );
}

function DelegatorsTable({ data }: { data: StakingEventsData }) {
  if (data.delegators.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-lightGreen/40">
        No delegators found.
      </p>
    );
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-[540px]">
        <thead>
          <tr>
            <th className="whitespace-nowrap px-3 py-3 text-left font-mono text-[10px] font-normal uppercase tracking-wider text-lightGreen/40 sm:text-xs">
              Delegator Address
            </th>
            <th className="whitespace-nowrap px-3 py-3 text-left font-mono text-[10px] font-normal uppercase tracking-wider text-lightGreen/40 sm:text-xs">
              Delegated Stake (STRK)
            </th>
            <th className="whitespace-nowrap px-3 py-3 text-left font-mono text-[10px] font-normal uppercase tracking-wider text-lightGreen/40 sm:text-xs">
              Share
            </th>
            <th className="whitespace-nowrap px-3 py-3 text-left font-mono text-[10px] font-normal uppercase tracking-wider text-lightGreen/40 sm:text-xs">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {data.delegators.map((d, i) => (
            <motion.tr
              key={d.address}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i * 0.03, 0.5), duration: 0.2 }}
              className="group transition-colors hover:bg-lightBlur/10"
            >
              <td className="whitespace-nowrap px-3 py-3 text-sm text-lightGreen">
                <div className="flex items-center gap-2">
                  <VoyagerLink
                    path={`contract/${d.address}`}
                    label={truncateAddress(d.address)}
                  />
                  <CopyButton text={d.address} />
                </div>
              </td>
              <td className="whitespace-nowrap px-3 py-3 font-mono text-sm text-lightGreen">
                {formatSTRK(d.amount)}
              </td>
              <td className="whitespace-nowrap px-3 py-3 text-sm">
                <span className="rounded-md bg-mint/10 px-2 py-0.5 font-mono text-xs text-mint">
                  {d.share.toFixed(2)}%
                </span>
              </td>
              <td className="whitespace-nowrap px-3 py-3 text-sm">
                <span className="inline-flex items-center gap-1.5 text-xs text-mint">
                  ACTIVE
                  <span className="h-1.5 w-1.5 rounded-full bg-mint" />
                </span>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ActivityTable({ data }: { data: StakingEventsData }) {
  if (data.activity.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-lightGreen/40">
        No recent activity.
      </p>
    );
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-[640px]">
        <thead>
          <tr>
            <th className="whitespace-nowrap px-3 py-3 text-left font-mono text-[10px] font-normal uppercase tracking-wider text-lightGreen/40 sm:text-xs">
              Operation
            </th>
            <th className="whitespace-nowrap px-3 py-3 text-left font-mono text-[10px] font-normal uppercase tracking-wider text-lightGreen/40 sm:text-xs">
              Origin
            </th>
            <th className="whitespace-nowrap px-3 py-3 text-left font-mono text-[10px] font-normal uppercase tracking-wider text-lightGreen/40 sm:text-xs">
              Amount
            </th>
            <th className="whitespace-nowrap px-3 py-3 text-left font-mono text-[10px] font-normal uppercase tracking-wider text-lightGreen/40 sm:text-xs">
              Transaction
            </th>
          </tr>
        </thead>
        <tbody>
          {data.activity.map((ev, i) => (
            <motion.tr
              key={`${ev.transactionHash}-${i}`}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i * 0.03, 0.5), duration: 0.2 }}
              className="group transition-colors hover:bg-lightBlur/10"
            >
              <td className="whitespace-nowrap px-3 py-3 text-sm">
                <span className="rounded-md bg-lightGreen/10 px-2.5 py-1 text-xs font-medium text-lightGreen">
                  {ev.operation}
                </span>
              </td>
              <td className="whitespace-nowrap px-3 py-3 text-sm">
                <div className="flex items-center gap-2">
                  <VoyagerLink
                    path={`contract/${ev.origin}`}
                    label={truncateAddress(ev.origin)}
                  />
                  <CopyButton text={ev.origin} />
                </div>
              </td>
              <td className="whitespace-nowrap px-3 py-3 font-mono text-sm text-mint">
                +{formatSTRK(ev.amount)}
              </td>
              <td className="whitespace-nowrap px-3 py-3 text-sm">
                <div className="flex items-center gap-2">
                  <VoyagerLink
                    path={`tx/${ev.transactionHash}`}
                    label={truncateAddress(ev.transactionHash)}
                  />
                  <CopyButton text={ev.transactionHash} />
                </div>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function AttestationsTable({ data }: { data: StakingEventsData }) {
  if (data.attestations.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-lightGreen/40">
        No attestations found.
      </p>
    );
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-[480px]">
        <thead>
          <tr>
            <th className="whitespace-nowrap px-3 py-3 text-left font-mono text-[10px] font-normal uppercase tracking-wider text-lightGreen/40 sm:text-xs">
              Epoch ID
            </th>
            <th className="whitespace-nowrap px-3 py-3 text-left font-mono text-[10px] font-normal uppercase tracking-wider text-lightGreen/40 sm:text-xs">
              Block Number
            </th>
            <th className="whitespace-nowrap px-3 py-3 text-left font-mono text-[10px] font-normal uppercase tracking-wider text-lightGreen/40 sm:text-xs">
              Transaction
            </th>
          </tr>
        </thead>
        <tbody>
          {data.attestations.map((att, i) => (
            <motion.tr
              key={att.transactionHash}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i * 0.03, 0.5), duration: 0.2 }}
              className="group transition-colors hover:bg-lightBlur/10"
            >
              <td className="whitespace-nowrap px-3 py-3 font-mono text-sm text-lightGreen">
                {att.epochId}
              </td>
              <td className="whitespace-nowrap px-3 py-3 text-sm">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-lightGreen/70">
                    {att.blockNumber.toLocaleString()}
                  </span>
                  <CopyButton text={att.blockNumber.toString()} />
                </div>
              </td>
              <td className="whitespace-nowrap px-3 py-3 text-sm">
                <div className="flex items-center gap-2">
                  <VoyagerLink
                    path={`tx/${att.transactionHash}`}
                    label={truncateAddress(att.transactionHash)}
                  />
                  <CopyButton text={att.transactionHash} />
                </div>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function StakingTabs() {
  const [activeTab, setActiveTab] = useState<Tab>("Delegators");

  const { data, isLoading } = useQuery<StakingEventsData>({
    queryKey: ["staking-events"],
    queryFn: async () => {
      const res = await fetch("/api/staking/events");
      if (!res.ok) throw new Error("Failed to fetch staking events");
      return res.json();
    },
    staleTime: 60000,
    refetchOnWindowFocus: false,
  });

  return (
    <div className="w-full rounded-2xl border border-lightGreen/10 bg-darkGreen/40 backdrop-blur-sm">
      <div className="flex border-b border-lightGreen/10">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="relative px-5 py-4 text-sm font-medium transition-colors"
          >
            {activeTab === tab && (
              <motion.div
                layoutId="stakingTab"
                className="absolute inset-x-0 bottom-0 h-0.5 bg-mint"
                transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
              />
            )}
            <span
              className={
                activeTab === tab ? "text-lightGreen" : "text-lightGreen/40"
              }
            >
              {tab}
            </span>
          </button>
        ))}
      </div>

      <div className="p-4 sm:p-6">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center gap-3 py-12">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-lightGreen/20 border-t-mint" />
            <span className="font-mono text-sm text-lightGreen/50">
              Loading on-chain data...
            </span>
          </div>
        ) : data ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === "Delegators" && <DelegatorsTable data={data} />}
              {activeTab === "Activity" && <ActivityTable data={data} />}
              {activeTab === "Attestations" && (
                <AttestationsTable data={data} />
              )}
            </motion.div>
          </AnimatePresence>
        ) : (
          <p className="py-8 text-center text-sm text-lightGreen/40">
            Failed to load data. Please try again later.
          </p>
        )}
      </div>
    </div>
  );
}
