"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import GreenUpperText from "@/components/common/GreenUpperText";
import GreenText from "@/components/common/GreenText";
import { ButtonLink } from "@/components/common/Button";
import { fadeInUp, staggerContainer, scaleIn } from "@/lib/animations";

const DataProviders = () => (
  <div className="flex w-full flex-col gap-14 overflow-hidden py-14 lg:flex-row lg:py-28 lg:px-10 xl:gap-28">
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
          20+ data providers alreday provide data for Pragma. You have
          first-class data and want to monetize it in order to help DeFi being
          safer?
        </GreenText>
      </motion.div>
      <motion.div variants={fadeInUp}>
        <ButtonLink
          variant="solid"
          color="mint"
          center={false}
          href="/"
          className="w-fit"
        >
          Discover now
        </ButtonLink>
      </motion.div>
    </motion.div>
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden lg:w-6/12">
      <Image
        src="/assets/vectors/vector4.svg"
        height={900}
        width={400}
        alt="divider"
        className="absolute z-0 w-full"
      />
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
);

export default DataProviders;
