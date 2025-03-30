import classNames from "classnames";
import Link from "next/link";
import Image from "next/image";
import sharedStyles from "@/pages/styles.module.scss";
import { DoubleText } from "./double-text";

type AssetHeaderProps = {
  isAsset: boolean;
  asset: any; // @TODO: tobe defined
};

export const AssetHeader = ({ isAsset, asset }: AssetHeaderProps) => (
  <div
    className={classNames(
      "w-full flex-col justify-between gap-8 self-stretch md:flex-row md:gap-5	",
      sharedStyles.greenBox
    )}
  >
    <h2 className="my-auto flex flex-row items-center gap-4 text-lightGreen">
      <Image height={60} width={60} alt="arrowDown" src={asset.image} />
      <div className="flex flex-col">
        {isAsset ? asset.ticker : asset.name}
        {isAsset ? (
          ""
        ) : (
          <Link
            href={asset.link}
            className="pt-1 font-mono text-sm tracking-widest text-LightGreenFooter"
          >
            {asset.link}
          </Link>
        )}
        <div className="font-mono text-sm tracking-widest text-LightGreenFooter">
          {isAsset ? "" : asset.type}
        </div>
      </div>
    </h2>
    {isAsset ? (
      <div className="flex flex-row gap-3 sm:gap-10 lg:gap-20">
        <div className="flex flex-col gap-4">
          <DoubleText bigText={`$${asset.price}`} smallText="Price" />
          <DoubleText bigText={asset.type} smallText="Asset Type" />
        </div>
        <div className="flex flex-col gap-4">
          <DoubleText bigText={asset.sources} smallText="Nb Sources" />
          <DoubleText bigText={asset.ema} smallText="1h EMA" />
        </div>
        <div className="flex flex-col gap-4">
          <DoubleText bigText={asset.lastUpdated} smallText="Last Updated" />
          <DoubleText bigText={asset.macd} smallText="1h MACD" />
        </div>
      </div>
    ) : (
      <div className="flex flex-row gap-3 sm:gap-10 lg:gap-20">
        <div className="flex flex-col gap-4">
          <DoubleText bigText={asset.nbFeeds} smallText="Nb Feeds" />
          <DoubleText bigText={asset.type} smallText="DP Type" />
        </div>
        <div className="flex flex-col gap-4">
          <DoubleText
            bigText={asset.reputationScore}
            smallText="Reputation score"
          />
          <DoubleText bigText={asset.reputationScore} smallText="24h updates" />
        </div>
        <div className="flex flex-col gap-4">
          <DoubleText bigText={asset.lastUpdated} smallText="Last Updated" />
          <DoubleText bigText={asset.totalUpdates} smallText="Total updates" />
        </div>
      </div>
    )}
  </div>
);
