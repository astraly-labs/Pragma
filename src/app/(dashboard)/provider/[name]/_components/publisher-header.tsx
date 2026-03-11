"use client";

import { motion } from "motion/react";
import { staggerContainer, staggerItem } from "@/lib/animations";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { ProcessedPublisher } from "@/app/(dashboard)/assets/_types";
import { DoubleText } from "@/app/(dashboard)/asset/[ticker]/_components/double-text";
import { getPublisherType } from "@/utils";

type PublisherHeaderProps = {
  publisher: ProcessedPublisher;
};

export const PublisherHeader = ({ publisher }: PublisherHeaderProps) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className={clsx(
        "w-full flex-col justify-between gap-8 self-stretch md:flex-row md:gap-5",
        "rounded-2xl border border-lightGreen/20 p-6"
      )}
    >
      <motion.h2
        variants={staggerItem}
        className="my-auto flex flex-row items-center gap-4 text-lightGreen"
      >
        <Image height={60} width={60} alt="arrowDown" src={publisher.image} />
        <div className="flex flex-col">
          {publisher.name}
          <Link
            href={publisher.link}
            className="pt-1 font-mono text-sm tracking-widest text-LightGreenFooter"
          >
            {publisher.link}
          </Link>
          <div className="font-mono text-sm tracking-widest text-LightGreenFooter">
            {getPublisherType(Number(publisher.type))}
          </div>
        </div>
      </motion.h2>
      <motion.div
        variants={staggerItem}
        className="flex flex-row gap-3 sm:gap-10 lg:gap-20"
      >
        <div className="flex flex-col gap-4">
          <DoubleText
            bigText={String(publisher.nbFeeds)}
            smallText="Nb Feeds"
          />
          <DoubleText bigText={publisher.type} smallText="DP Type" />
        </div>
        <div className="flex flex-col gap-4">
          <DoubleText
            bigText={publisher.reputationScore}
            smallText="Reputation score"
          />
          <DoubleText
            bigText={publisher.reputationScore}
            smallText="24h updates"
          />
        </div>
        <div className="flex flex-col gap-4">
          <DoubleText
            bigText={publisher.lastUpdated}
            smallText="Last Updated"
          />
          <DoubleText
            bigText={String(publisher.totalUpdates)}
            smallText="Total updates"
          />
        </div>
      </motion.div>
    </motion.div>
  );
};
