"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import dynamic from "next/dynamic";
import styles from "./styles.module.scss";
import GreenText from "@/components/common/GreenText";
import GreenUpperText from "@/components/common/GreenUpperText";
import { cn } from "@/lib/utils";
import animationData from "@/../public/assets/lottie/pragma_scheme.json";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const Architecture = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <div className={cn("align-center w-full", styles.darkGreenBox)}>
      <GreenUpperText className="mx-auto pb-3">Our Architecture</GreenUpperText>
      <h2 className="mx-auto pb-6 text-lightGreen">
        The first provable oracle
      </h2>
      <GreenText isAligned={true} className="mx-auto max-w-3xl pb-10">
        Pragma utilizes STARK proofs to ensure data correctness. Explore how we
        achieve this while maintaining a 200ms latency in running the oracle,
        enabling composability and programmability.
      </GreenText>
      <div ref={ref} className="m-auto w-full md:w-10/12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <Lottie
            animationData={animationData}
            loop
            style={{ width: "100%", height: "100%" }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Architecture;
