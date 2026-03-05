"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import styles from "./styles.module.scss";
import GreenText from "@/components/common/GreenText";
import { ButtonLink } from "@/components/common/Button";
import GreenUpperText from "@/components/common/GreenUpperText";
import { useRef } from "react";

const ReadyBox = ({ version }: { version: boolean }) => {
  const [windowWidth, setWindowWidth] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const getImageSource = () => {
    if (windowWidth && windowWidth < 640) {
      return "/assets/vectors/vector5bis.svg";
    }
    return "/assets/vectors/vector5.svg";
  };

  return (
    <div ref={containerRef} className={styles.darkGreenBoxBis}>
      <GreenUpperText className="pb-3">Get in touch</GreenUpperText>
      <h2 className="w-full pb-6 leading-loose text-lightGreen md:w-5/12">
        {version
          ? "Ready to get the data you need?"
          : "Need help on ideas or integration?"}
      </h2>
      <GreenText isAligned={false} className="w-full max-w-3xl pb-10 md:w-5/12">
        {version
          ? "Leverage recent breakthroughs in zero-knowledge computation by using verifiable and composable data in your decentralized application."
          : "We'd love to hear from you, about your ideas and how we can help. Reach out!"}
      </GreenText>

      <div className="relative z-10 mb-40 md:mb-0">
        {version ? (
          <ButtonLink
            center={false}
            variant="solid"
            color="mint"
            href="https://docs.pragma.build/starknet"
            className="shadow-[0_0_20px_rgba(21,255,129,0.15)] transition-shadow hover:shadow-[0_0_40px_rgba(21,255,129,0.3)]"
          >
            Start building
          </ButtonLink>
        ) : (
          <ButtonLink
            center={false}
            variant="outline"
            color="mint"
            href="https://cal.com/0xmatteo/15min"
            className="transition-shadow hover:shadow-[0_0_30px_rgba(21,255,129,0.2)]"
          >
            Book a call
          </ButtonLink>
        )}
        <div className="absolute -inset-3 -z-10 animate-pulse-glow rounded-full bg-mint/5 blur-xl" />
      </div>

      <motion.div
        className="absolute bottom-0 right-0 -z-10 mx-auto w-full lg:w-10/12 2xl:w-auto"
        style={{ y: imageY }}
      >
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-darkGreen/80" />
        <Image
          width={900}
          height={400}
          src={getImageSource()}
          alt="vectorImage"
          className="h-auto w-full"
        />
      </motion.div>
    </div>
  );
};
export default ReadyBox;
