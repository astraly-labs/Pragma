"use client";

import { motion } from "motion/react";
import { fadeInUp } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { DoubleText } from "./double-text";
import { AssetInfo } from "@/app/(dashboard)/assets/_types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type AssetHeaderProps = {
  asset: AssetInfo;
};

export const AssetHeader = ({ asset }: AssetHeaderProps) => (
  <motion.div
    initial="hidden"
    animate="visible"
    variants={fadeInUp}
    className={cn(
      "w-full flex-col justify-between gap-8 self-stretch md:flex-row md:gap-5",
      "rounded-2xl border border-lightGreen/20 p-6"
    )}
  >
    <h2 className="my-auto flex flex-row items-center gap-4 text-lightGreen">
      <Avatar className="w-16 h-16">
        <AvatarImage width={64} height={64} src={asset.image} />
        <AvatarFallback className="bg-lightBlur">
          {asset.ticker[0]}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col">{asset.ticker}</div>
    </h2>
    <div className="flex flex-row gap-3 sm:gap-10 lg:gap-20">
      <div className="flex flex-col gap-4">
        <DoubleText bigText={`$${asset.price}`} smallText="Price" />
        <DoubleText bigText={asset.type} smallText="Asset Type" />
      </div>
      <div className="flex flex-col gap-4">
        <DoubleText bigText={String(asset.sources)} smallText="Nb Sources" />
        <DoubleText bigText={asset.ema} smallText="1h EMA" />
      </div>
      <div className="flex flex-col gap-4">
        <DoubleText bigText={asset.lastUpdated} smallText="Last Updated" />
        <DoubleText bigText={asset.macd} smallText="1h MACD" />
      </div>
    </div>
  </motion.div>
);
