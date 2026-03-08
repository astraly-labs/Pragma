"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import clsx from "clsx";
import styles from "./styles.module.scss";
import GreenText from "../common/GreenText";
import { ButtonLink } from "../common/Button";
import { ChartBox } from "@/components/common/ChartBox";
import { fadeInUp } from "@/lib/animations";

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

const PriceFeedBox = () => {
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
    <motion.div
      className={styles.darkGreenBox}
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="flex w-full flex-col gap-10 lg:flex-row lg:items-start lg:gap-16">
        <div className="flex flex-col lg:w-5/12">
          <h2 className="mb-4 text-lightGreen">Data Feeds</h2>
          <GreenText isAligned={false} className="mb-8">
            Data feeds are the most secure means of obtaining price information
            on Starknet, and soon, everywhere. Pragma harnesses its network of
            data providers to deliver prices for any asset you require. The
            aggregation process is validated by STARK proofs, ensuring that
            security is never compromised.
          </GreenText>
          <ButtonLink
            variant="outline"
            color="mint"
            href="https://docs.pragma.build/starknet"
            center={false}
            className="w-fit"
          >
            Integrate Feeds
          </ButtonLink>
        </div>
        <div
          className="flex flex-col gap-4 lg:w-7/12"
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
                    layoutId="resourcesChartTab"
                    className="absolute inset-0 rounded-full bg-mint/10 ring-1 ring-mint/20"
                    transition={{
                      type: "spring",
                      bounce: 0.15,
                      duration: 0.5,
                    }}
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
            >
              <ChartBox ticker={selectedTicker} height={420} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default PriceFeedBox;
