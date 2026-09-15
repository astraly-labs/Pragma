"use client";

import { motion } from "motion/react";
import { fadeInUp } from "@/lib/animations";
import { DoubleText } from "./double-text";
import { AssetInfo } from "@/app/(dashboard)/assets/_types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type AssetHeaderProps = {
  asset: AssetInfo;
  networkLabel: string;
};

export const AssetHeader = ({ asset, networkLabel }: AssetHeaderProps) => {
  const timestamp = Number(asset.lastUpdated);
  const updatedAt = new Date(timestamp * 1000);
  const lastUpdated =
    Number.isFinite(updatedAt.getTime()) && timestamp > 0
      ? updatedAt.toISOString().replace("T", " ").replace(".000Z", " UTC")
      : asset.lastUpdated || "Unavailable";
  const price =
    !asset.error && Number.isFinite(Number(asset.price))
      ? new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          maximumFractionDigits: 8,
        }).format(Number(asset.price))
      : "Unavailable";

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      className="explorer-panel explorer-asset-header"
    >
      <span className="eyebrow">{networkLabel}</span>
      <h1 className="flex items-center gap-4 text-2xl text-lightGreen sm:text-4xl">
        <Avatar className="h-16 w-16">
          <AvatarImage width={64} height={64} src={asset.image} alt="" />
          <AvatarFallback className="bg-lightBlur">
            {asset.ticker[0]}
          </AvatarFallback>
        </Avatar>
        <span className="min-w-0 break-words">{asset.ticker}</span>
      </h1>
      <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-3 sm:gap-10">
        <DoubleText bigText={price} smallText="Price" />
        <DoubleText
          bigText={
            asset.error ? "Unavailable" : String(asset.sources ?? "Unavailable")
          }
          smallText="Sources"
        />
        <DoubleText bigText={lastUpdated} smallText="Last updated" />
        <DoubleText bigText={asset.type} smallText="Asset type" />
      </div>
    </motion.div>
  );
};
