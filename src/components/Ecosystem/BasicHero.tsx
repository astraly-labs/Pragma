"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import GreenText from "@/components/common/GreenText";
import { ButtonLink } from "@/components/common/Button";
import { staggerContainer, fadeInUp } from "@/lib/animations";

type BasicHeroProps = {
  title: string;
  greenTitle: string;
  description: string;
  solidButton: string;
  solidButtonLink: string;
  outlineButton: string;
  outlineButtonLink: string;
  illustrationLink: string;
  illustrationSmallLink: string;
};

const BasicHero = ({
  title,
  greenTitle,
  description,
  solidButton,
  solidButtonLink,
  outlineButton,
  outlineButtonLink,
  illustrationLink,
  illustrationSmallLink,
}: BasicHeroProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const illustrationY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const illustrationScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 40]);

  return (
    <div
      ref={containerRef}
      className="relative min-h-[85vh] w-full overflow-hidden"
    >
      {/* Full-bleed illustration background */}
      <motion.div
        className="absolute inset-0"
        style={{ y: illustrationY, scale: illustrationScale }}
      >
        <Image
          src={illustrationLink}
          alt="Illustration Hero"
          width={1400}
          height={900}
          className="absolute -right-[10%] -top-[5%] hidden h-[110%] w-auto max-w-none opacity-60 md:block"
          priority
        />
        <Image
          src={illustrationSmallLink}
          alt="Illustration Hero"
          width={900}
          height={600}
          className="absolute inset-0 block h-full w-full object-cover opacity-40 md:hidden"
          priority
        />
      </motion.div>

      {/* Gradient overlays for depth */}
      <div className="absolute inset-0 bg-linear-to-r from-darkGreen via-darkGreen/80 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-darkGreen to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex min-h-[85vh] w-full items-center">
        <motion.header
          className="mx-5 flex max-w-2xl flex-col justify-center space-y-8 pb-20 pt-32 text-center md:mx-0 md:text-left md:pl-20 lg:pl-28"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          style={{ y: textY }}
        >
          <motion.h1
            variants={fadeInUp}
            className="text-lightGreen md:whitespace-nowrap"
          >
            {title}
            <br />
            <span className="text-mint">{greenTitle}</span>
          </motion.h1>
          <motion.div variants={fadeInUp}>
            <GreenText isAligned={false} className="hidden md:block">
              {description}
            </GreenText>
            <GreenText isAligned={true} className="block md:hidden">
              {description}
            </GreenText>
          </motion.div>
          <motion.div
            variants={fadeInUp}
            className="mx-auto flex w-full flex-col items-center gap-4 md:mx-0 md:w-auto md:flex-row md:items-start"
          >
            <ButtonLink
              center={false}
              color="mint"
              variant="solid"
              href={solidButtonLink}
              className="w-full text-center shadow-[0_0_20px_rgba(21,255,129,0.15)] transition-shadow hover:shadow-[0_0_40px_rgba(21,255,129,0.25)] sm:w-fit"
            >
              {solidButton}
            </ButtonLink>
            <ButtonLink
              center={false}
              color="mint"
              variant="outline"
              href={outlineButtonLink}
              className="w-full text-center sm:w-fit"
            >
              {outlineButton}
            </ButtonLink>
          </motion.div>
        </motion.header>
      </div>
    </div>
  );
};

export default BasicHero;
