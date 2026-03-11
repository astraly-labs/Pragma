"use client";

import React from "react";
import { motion } from "motion/react";
import { AlertTriangle } from "lucide-react";
import styles from "./styles.module.scss";
import { ButtonLink } from "../common/Button";
import GreenText from "../common/GreenText";
import Image from "next/image";
import { fadeInUp, cardHover } from "@/lib/animations";

const VerifRandBox = () => {
  return (
    <motion.div
      className={styles.darkGreenBoxBis}
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      whileHover={cardHover}
    >
      <div className="my-auto w-full items-center lg:w-10/12">
        <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-yellow-500/15 px-3 py-1 text-xs font-medium uppercase tracking-wider text-yellow-400">
          <AlertTriangle className="h-3.5 w-3.5" />
          Deprecated
        </span>
        <h2 className="mb-4 text-center text-lightGreen lg:text-left">
          Verifiable random function
        </h2>
        <GreenText isAligned={false} className="mb-10 text-center lg:text-left">
          Pragma offers a verifiable randomness feed that allows protocols to
          request secure randomness on-chain. The randomness proof is posted as
          calldata, and enables games, betting platforms or any other app to
          leverage verifiable randomness securely.
        </GreenText>
        <ButtonLink
          variant="outline"
          color="mint"
          href="https://docs.pragma.build/starknet/deprecated/vrf"
          center={false}
          className="mr-auto ml-auto w-fit lg:ml-0"
        >
          View docs
        </ButtonLink>
      </div>
      <Image
        className="items-center align-middle"
        src="/assets/vectors/verifRand.svg"
        width={900}
        height={400}
        alt="Verifiable Randomness Illustration"
      />
    </motion.div>
  );
};
export default VerifRandBox;
