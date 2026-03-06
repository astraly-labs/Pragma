"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { ButtonLink } from "../common/Button";
import { HeroBackground } from "./HeroBackground";
import { useRef } from "react";

const headlineWords = ["The", "open", "infrastructure", "for"];
const accentWord = "oracles";

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const textY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  return (
    <div ref={containerRef} className="relative min-h-[100vh] w-full">
      <HeroBackground />

      <div className="relative z-10 flex min-h-[100vh] w-full items-center justify-center px-5">
        <motion.header
          className="flex max-w-4xl flex-col items-center space-y-8 text-center"
          style={{ y: textY, opacity: textOpacity }}
        >
          <motion.h1
            className="pt-20 text-lightGreen md:pt-0"
            initial="hidden"
            animate="visible"
          >
            <span className="flex flex-wrap items-center justify-center gap-x-[0.35em]">
              {headlineWords.map((word, i) => (
                <motion.span
                  key={i}
                  className="inline-block"
                  initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{
                    duration: 0.6,
                    delay: 0.15 + i * 0.1,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </span>
            <motion.span
              className="mt-1 inline-block border-b border-mint text-mint"
              initial={{ opacity: 0, y: 30, filter: "blur(8px)", scaleX: 0.8 }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)", scaleX: 1 }}
              transition={{
                duration: 0.7,
                delay: 0.6,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              {accentWord}
            </motion.span>
          </motion.h1>

          <motion.p
            className="max-w-2xl text-base leading-relaxed text-lightGreen/70 md:text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            Pragma is the open and permissionless infrastructure for oracles,
            enabling anyone to deploy optimized oracles for any application.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.0 }}
            className="flex flex-col items-center gap-4 sm:flex-row"
          >
            <ButtonLink
              center={false}
              color="mint"
              variant="solid"
              href="https://docs.pragma.build/starknet"
              className="shadow-[0_0_30px_rgba(21,255,129,0.2)] transition-shadow hover:shadow-[0_0_50px_rgba(21,255,129,0.35)]"
            >
              Start Building
            </ButtonLink>
            <ButtonLink
              center={false}
              color="mint"
              variant="outline"
              href="/assets"
            >
              Explore Assets
            </ButtonLink>
          </motion.div>
        </motion.header>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-6 w-6 text-lightGreen/40" />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;
