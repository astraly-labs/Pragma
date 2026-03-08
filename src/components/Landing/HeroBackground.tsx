"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import dynamic from "next/dynamic";
import { SceneLoader } from "@/components/3d/SceneLoader";

const OracleNetworkScene = dynamic(
  () => import("@/components/3d/OracleNetworkScene"),
  { ssr: false }
);

export const HeroBackground = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const meshY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const orbScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.3]);
  const orbOpacity = useTransform(scrollYProgress, [0, 0.6], [0.5, 0]);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      {/* CSS gradient mesh -- renders instantly as base layer */}
      <motion.div className="absolute inset-0" style={{ y: meshY }}>
        <div className="absolute -left-1/4 -top-1/4 h-[600px] w-[600px] animate-drift-slow rounded-full bg-[radial-gradient(circle,rgba(21,255,129,0.08)_0%,transparent_70%)]" />
        <div className="absolute -right-1/4 top-1/3 h-[500px] w-[500px] animate-drift-slower rounded-full bg-[radial-gradient(circle,rgba(0,71,56,0.3)_0%,transparent_70%)]" />
        <div className="absolute bottom-0 left-1/3 h-[400px] w-[400px] animate-drift-slow rounded-full bg-[radial-gradient(circle,rgba(21,255,129,0.05)_0%,transparent_70%)]" />
      </motion.div>

      {/* Central glowing orb */}
      <motion.div
        className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2"
        style={{ scale: orbScale, opacity: orbOpacity }}
      >
        <div className="h-[350px] w-[350px] animate-pulse-glow rounded-full bg-[radial-gradient(circle,rgba(21,255,129,0.15)_0%,rgba(21,255,129,0.03)_40%,transparent_70%)] blur-2xl md:h-[500px] md:w-[500px]" />
      </motion.div>

      {/* Three.js particle network -- loads async, layered above CSS gradients */}
      <SceneLoader>
        <OracleNetworkScene scrollProgress={0} />
      </SceneLoader>

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Bottom gradient fade */}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-linear-to-t from-darkGreen to-transparent" />
    </div>
  );
};
