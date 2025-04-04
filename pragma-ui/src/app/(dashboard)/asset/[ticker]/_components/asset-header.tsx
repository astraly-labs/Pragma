import Image from "next/image";
import sharedStyles from "@/pages/styles.module.scss";
import { cn } from "@/lib/utils";
import { DoubleText } from "./double-text";
import { AssetInfo } from "@/app/(dashboard)/assets/_types";

type AssetHeaderProps = {
  asset: AssetInfo;
};

export const AssetHeader = ({ asset }: AssetHeaderProps) => (
  <div
    className={cn(
      "w-full flex-col justify-between gap-8 self-stretch md:flex-row md:gap-5",
      sharedStyles.greenBox
    )}
  >
    <h2 className="my-auto flex flex-row items-center gap-4 text-lightGreen">
      <Image height={60} width={60} alt="arrowDown" src={asset.image} />
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
  </div>
);
