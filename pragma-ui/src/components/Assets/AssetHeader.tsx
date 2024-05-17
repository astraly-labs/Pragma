import React from "react";
import classNames from "classnames";
import styles from "./styles.module.scss";
import Image from "next/image";
import DoubleText from "./DoubleText";
import Link from "next/link";

const AssetHeader = ({ isAsset, assets }) => {
  return (
    <div
      className={classNames(
        "w-full flex-col justify-between gap-8 md:flex-row md:gap-5",
        styles.greenBox
      )}
    >
      <h2 className="my-auto flex flex-row items-center gap-4 text-lightGreen">
        <Image height={60} width={60} alt="arrowDown" src={assets.image} />
        <div className="flex flex-col">
          {isAsset ? assets.ticker : assets.name}
          <Link
            href={assets.link}
            className="pt-1 font-mono text-sm tracking-widest text-LightGreenFooter"
          >
            {isAsset ? "" : assets.link}
          </Link>
          <div className="font-mono text-sm tracking-widest text-LightGreenFooter">
            {isAsset ? "" : assets.type}
          </div>
        </div>
      </h2>
      {isAsset ? (
        <div className="flex flex-row gap-3 sm:gap-10 lg:gap-20">
          <div className="flex flex-col gap-4">
            <DoubleText bigText={`$${assets.price}`} smolText={"Price"} />
            <DoubleText bigText={assets.type} smolText={"Asset Type"} />
          </div>
          <div className="flex flex-col gap-4">
            <DoubleText bigText={assets.sources} smolText={"Nb Sources"} />
            <DoubleText bigText={assets.ema} smolText={"1h EMA"} />
          </div>
          <div className="flex flex-col gap-4">
            <DoubleText
              bigText={assets.lastUpdated}
              smolText={"Last Updated"}
            />
            <DoubleText bigText={assets.macd} smolText={"1h MACD"} />
          </div>
        </div>
      ) : (
        <div className="flex flex-row gap-3 sm:gap-10 lg:gap-20">
          <div className="flex flex-col gap-4">
            <DoubleText bigText={assets.nbFeeds} smolText={"Nb Feeds"} />
            <DoubleText bigText={assets.type} smolText={"DP Type"} />
          </div>
          <div className="flex flex-col gap-4">
            <DoubleText
              bigText={assets.reputationScore}
              smolText={"Reputation score"}
            />
            <DoubleText
              bigText={assets.reputationScore}
              smolText={"24h updates"}
            />
          </div>
          <div className="flex flex-col gap-4">
            <DoubleText
              bigText={assets.lastUpdated}
              smolText={"Last Updated"}
            />
            <DoubleText
              bigText={assets.totalUpdates}
              smolText={"Total updates"}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AssetHeader;
