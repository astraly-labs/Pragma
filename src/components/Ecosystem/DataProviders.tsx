"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import GreenUpperText from "@/components/common/GreenUpperText";
import GreenText from "@/components/common/GreenText";
import { ButtonLink } from "@/components/common/Button";
import { fadeInUp, staggerContainer, scaleIn } from "@/lib/animations";

const DataProviders = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  return (
    <div
      ref={sectionRef}
      className="relative w-full overflow-hidden py-14 lg:py-28"
    >
      {/* Full-bleed background illustration */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <Image
          src="/assets/vectors/vector4.svg"
          height={900}
          width={1400}
          alt="divider"
          className="absolute right-[-15%] top-[-20%] h-[140%] w-auto max-w-none opacity-40"
        />
      </motion.div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-linear-to-r from-darkGreen via-darkGreen/70 to-transparent" />
      <div className="absolute inset-x-0 top-0 h-20 bg-linear-to-b from-darkGreen to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-darkGreen to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex w-full flex-col gap-14 lg:flex-row lg:px-10 xl:gap-28">
        <motion.div
          className="flex w-full flex-col items-center justify-center md:items-start lg:w-6/12"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div variants={fadeInUp}>
            <GreenUpperText className="pb-3">Data Providers</GreenUpperText>
          </motion.div>
          <motion.h2 variants={fadeInUp} className="pb-6 text-lightGreen">
            Data you can trust
          </motion.h2>
          <motion.div variants={fadeInUp}>
            <GreenText className="pb-10 text-center md:text-left">
              20+ data providers already provide data for Pragma. You have
              first-class data and want to monetize it in order to help DeFi
              being safer?
            </GreenText>
          </motion.div>
          <motion.div variants={fadeInUp}>
            <ButtonLink
              variant="solid"
              color="mint"
              center={false}
              href="/"
              className="w-fit shadow-[0_0_20px_rgba(21,255,129,0.15)] transition-shadow hover:shadow-[0_0_40px_rgba(21,255,129,0.25)]"
            >
              Discover now
            </ButtonLink>
          </motion.div>
        </motion.div>
        <div className="flex w-full flex-col items-center justify-center lg:w-6/12">
          <motion.div
            className="flex flex-col gap-4 p-6"
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            <h2 className="text-center text-lightGreen">10,000,000</h2>
            <GreenUpperText className="text-center">Data points</GreenUpperText>
          </motion.div>
          <motion.div
            className="mt-4 flex translate-y-6 flex-col gap-4 p-6"
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            <h2 className="text-center text-lightGreen">50,000</h2>
            <GreenUpperText className="text-center">Updates 24h</GreenUpperText>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DataProviders;
