"use client";

import React from "react";
import { motion } from "framer-motion";
import styles from "./styles.module.scss";
import clsx from "clsx";
import GreenText from "../common/GreenText";
import { ButtonLink } from "../common/Button";
import { staggerContainer, fadeInUp } from "@/lib/animations";

const Hero = () => {
  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
          src="/assets/lottie/videov2.mp4"
        />
        <div className={styles.grad}></div>
        <div className="absolute inset-0 bg-gradient-to-b from-darkGreen/60 via-transparent to-darkGreen" />
      </div>
      <div
        className={clsx(
          "flex w-full justify-center align-middle",
          styles.videoBg
        )}
      >
        <header className="z-1 relative mx-5 flex flex-col justify-center space-y-10 py-24 text-center md:mx-0 md:w-8/12 md:py-8 lg:my-24 lg:w-6/12">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col space-y-10"
          >
            <motion.div variants={fadeInUp}>
              <h1 className="pt-32 text-lightGreen md:whitespace-nowrap">
                The open infrastructure for
                <br />
                <span className={styles.verifiable}>oracles</span>
              </h1>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <GreenText isAligned={true}>
                Pragma is the open and permissionless infrastructure for oracles,
                enabling anyone to deploy optimized oracles for any application.
              </GreenText>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <ButtonLink
                center={true}
                color="mint"
                variant="solid"
                href="https://docs.pragma.build/Resources/Consuming%20Data%20Feed"
              >
                Start Building
              </ButtonLink>
            </motion.div>
          </motion.div>
        </header>
      </div>
    </div>
  );
};

export default Hero;
