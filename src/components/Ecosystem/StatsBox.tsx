"use client";

import { motion } from "motion/react";
import styles from "./styles.module.scss";
import GreenUpperText from "@/components/common/GreenUpperText";
import { staggerContainer, scaleIn } from "@/lib/animations";

interface StatsProps {
  tve: string;
  tvs: string;
}

const StatsBox = ({ tve, tvs }: StatsProps) => (
  <motion.div
    className={styles.statsBox}
    variants={staggerContainer}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.3 }}
  >
    <motion.h2 variants={scaleIn} className="text-lightGreen">
      ${tve}
    </motion.h2>
    <motion.div variants={scaleIn}>
      <GreenUpperText>TVE (Total value enabled)</GreenUpperText>
    </motion.div>
    <motion.h2 variants={scaleIn} className="text-lightGreen">
      ${tvs}
    </motion.h2>
    <motion.div variants={scaleIn}>
      <GreenUpperText>TVS (Total value secured)</GreenUpperText>
    </motion.div>
  </motion.div>
);

export default StatsBox;
