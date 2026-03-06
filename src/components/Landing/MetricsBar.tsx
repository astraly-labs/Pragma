"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface Metric {
  value: number;
  suffix: string;
  label: string;
}

const metrics: Metric[] = [
  { value: 10, suffix: "M+", label: "Data Points" },
  { value: 50, suffix: "K+", label: "Daily Updates" },
  { value: 20, suffix: "+", label: "Data Publishers" },
  { value: 200, suffix: "ms", label: "Latency" },
];

const AnimatedCounter = ({
  target,
  suffix,
  label,
  delay,
}: {
  target: number;
  suffix: string;
  label: string;
  delay: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const timeout = setTimeout(() => {
      const duration = 1200;
      const steps = 40;
      const increment = target / steps;
      let current = 0;
      const interval = setInterval(() => {
        current += increment;
        if (current >= target) {
          setCount(target);
          clearInterval(interval);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [isInView, target, delay]);

  return (
    <motion.div
      ref={ref}
      className="flex flex-col items-center gap-1 px-4 py-3"
      initial={{ opacity: 0, y: 15 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: delay / 1000 }}
    >
      <span className="font-mono text-2xl font-medium tracking-tight text-mint md:text-3xl">
        {count}
        {suffix}
      </span>
      <span className="text-xs uppercase tracking-widest text-lightGreen/50">
        {label}
      </span>
    </motion.div>
  );
};

export const MetricsBar = () => (
  <div className="mx-auto w-full max-w-4xl px-4">
    <div className="grid grid-cols-2 gap-4 rounded-2xl bg-darkGreen/60 px-4 py-4 backdrop-blur-md md:grid-cols-4 md:gap-0 md:px-0 md:py-2">
      {metrics.map((metric, i) => (
        <AnimatedCounter
          key={metric.label}
          target={metric.value}
          suffix={metric.suffix}
          label={metric.label}
          delay={i * 150}
        />
      ))}
    </div>
  </div>
);
