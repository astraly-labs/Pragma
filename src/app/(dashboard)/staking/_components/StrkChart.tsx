"use client";

import { motion } from "motion/react";
import { ChartBox } from "@/components/common/ChartBox";
import { fadeInUp } from "@/lib/animations";

export function StrkChart() {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="flex h-full flex-col gap-4 rounded-2xl border border-lightGreen/10 bg-darkGreen/40 p-6 backdrop-blur-sm"
    >
      <h3 className="text-lg text-lightGreen">STRK Price</h3>
      <ChartBox ticker="STRK/USD" height={340} className="rounded-xl" />
    </motion.div>
  );
}
