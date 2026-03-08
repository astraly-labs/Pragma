"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChartBox } from "@/components/common/ChartBox";
import clsx from "clsx";

const SHOWCASE_TICKERS = [
  "BTC/USD",
  "ETH/USD",
  "STRK/USD",
  "SUI/USD",
  "AAVE/USD",
  "SOL/USD",
  "LINK/USD",
  "DOGE/USD",
  "UNI/USD",
];

const ROTATION_INTERVAL = 5000;

export const AssetsSection = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const selectedTicker = SHOWCASE_TICKERS[selectedIndex];

  const goToNext = useCallback(() => {
    setSelectedIndex((prev) => (prev + 1) % SHOWCASE_TICKERS.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(goToNext, ROTATION_INTERVAL);
    return () => clearInterval(timer);
  }, [isPaused, goToNext]);

  return (
    <div
      className="flex w-full flex-col gap-4 lg:min-h-[623px]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Ticker selector */}
      <div className="flex flex-wrap items-center gap-1.5">
        {SHOWCASE_TICKERS.map((ticker, i) => (
          <button
            key={ticker}
            onClick={() => {
              setSelectedIndex(i);
              setIsPaused(true);
            }}
            className={clsx(
              "relative rounded-full px-3 py-1.5 font-mono text-[11px] tracking-wide transition-all duration-200",
              "focus:outline-hidden",
              selectedIndex === i
                ? "text-mint"
                : "text-lightGreen/30 hover:text-lightGreen/60"
            )}
          >
            {selectedIndex === i && (
              <motion.div
                layoutId="chartTab"
                className="absolute inset-0 rounded-full bg-mint/10 ring-1 ring-mint/20"
                transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
              />
            )}
            <span className="relative z-10">{ticker.split("/")[0]}</span>
          </button>
        ))}
      </div>

      {/* Chart */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedTicker}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="flex-1"
        >
          <ChartBox ticker={selectedTicker} height={560} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
