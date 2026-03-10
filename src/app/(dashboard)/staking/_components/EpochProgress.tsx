"use client";

import { motion, useSpring, useTransform } from "motion/react";
import { useEffect, useRef } from "react";
import { Clock, Hash, Timer } from "lucide-react";
import type { StakingDataSerialized } from "@/lib/staking";
import { fadeInUp } from "@/lib/animations";

export function EpochProgress({ data }: { data: StakingDataSerialized }) {
  const { epochInfo, currentBlockNumber } = data;

  const epochStartBlock =
    epochInfo.startingBlock +
    (epochInfo.currentEpoch - epochInfo.startingEpoch) * epochInfo.epochLength;
  const blocksIntoEpoch = currentBlockNumber - epochStartBlock;
  const progress = Math.min(
    Math.max(blocksIntoEpoch / epochInfo.epochLength, 0),
    1
  );
  const progressPercent = Math.round(progress * 100);
  const blocksRemaining = Math.max(epochInfo.epochLength - blocksIntoEpoch, 0);

  const springProgress = useSpring(0, { stiffness: 60, damping: 20 });

  useEffect(() => {
    springProgress.set(progress);
  }, [progress, springProgress]);

  const progressWidth = useTransform(springProgress, (v) => `${v * 100}%`);

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="flex h-full flex-col gap-5 rounded-2xl border border-lightGreen/10 bg-darkGreen/40 p-6 backdrop-blur-sm"
    >
      <h3 className="text-lg text-lightGreen">Epoch Progress</h3>

      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-sm text-lightGreen/50">
            <Hash className="h-3.5 w-3.5" />
            Epoch {epochInfo.currentEpoch}
          </span>
          <span className="font-mono text-sm text-mint">
            {progressPercent}%
          </span>
        </div>

        <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-lightGreen/10">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full bg-linear-to-r from-mint/80 to-mint"
            style={{ width: progressWidth }}
          />
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full bg-mint/30 blur-sm"
            style={{ width: progressWidth }}
          />
        </div>

        <div className="flex items-center justify-between text-xs text-lightGreen/40">
          <span>Block {epochStartBlock.toLocaleString()}</span>
          <span>
            Block {(epochStartBlock + epochInfo.epochLength).toLocaleString()}
          </span>
        </div>
      </div>

      <div className="mt-auto grid grid-cols-2 gap-4 rounded-xl bg-lightGreen/5 p-4">
        <div className="flex flex-col gap-1">
          <span className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-lightGreen/40">
            <Clock className="h-3 w-3" />
            Blocks Remaining
          </span>
          <span className="font-mono text-base text-lightGreen">
            {blocksRemaining.toLocaleString()}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-lightGreen/40">
            <Timer className="h-3 w-3" />
            Epoch Length
          </span>
          <span className="font-mono text-base text-lightGreen">
            {epochInfo.epochLength.toLocaleString()}{" "}
            <span className="text-xs text-lightGreen/40">blocks</span>
          </span>
        </div>
      </div>
    </motion.div>
  );
}
