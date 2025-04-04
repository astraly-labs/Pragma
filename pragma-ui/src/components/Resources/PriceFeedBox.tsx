"use client";

import React, { ReactNode, useState } from "react";
import { cn } from "@/lib/utils";
import styles from "./styles.module.scss";
import GreenText from "../common/GreenText";
import { ButtonLink } from "../common/Button";
import { AssetPair, AssetT } from "../common/AssetBox";

import { ChartBox } from "@/components/common/ChartBox";
import AssetBox from "@/components/common/AssetBox";

interface PriceFeedBoxProps {
  selectedAsset: AssetPair;
  initialAssets: AssetT[];
  handleAssetSelect: (asset: AssetT) => void;
  data: AssetPair[];
}

const PriceFeedBox = ({
  selectedAsset,
  initialAssets,
  handleAssetSelect,
  data,
}: PriceFeedBoxProps) => {
  const [isFront, setIsFront] = useState(false);

  const handleClick = () => {
    setIsFront(!isFront);
  };

  return (
    <div className={styles.darkGreenBox}>
      <div className="my-auto w-full items-center md:pb-20 lg:w-10/12">
        <h2 className="mb-4 text-center text-lightGreen lg:text-left">
          Data Feeds
        </h2>
        <GreenText
          isAligned={false}
          className="mb-10 text-center  lg:text-left"
        >
          Data feeds are the most secure means of obtaining price information on
          Starknet, and soon, everywhere. Pragma harnesses its network of data
          providers, including market makers, centralized and decentralized
          exchanges, solvers, and aggregators, to deliver prices for any asset
          you require. The aggregation process is validated by STARK proofs,
          ensuring that security is never compromised.
        </GreenText>
        <ButtonLink
          variant="outline"
          color="mint"
          href="https://docs.pragma.build/Resources/Consuming%20Data%20Feed"
          center={false}
          className="mr-auto ml-auto w-fit lg:ml-0"
        >
          Integrate Feeds
        </ButtonLink>
      </div>
      <div className="relative flex w-full flex-col md:px-20 lg:px-0">
        <div
          className={cn(
            "relative w-full overflow-hidden sm:w-96 xl:w-xlarge",
            isFront ? styles.front : styles.back,
            styles.transi
          )}
          onClick={handleClick}
        >
          <ChartBox assetPair={selectedAsset} />
        </div>
        <div
          className={cn(
            "relative ml-auto w-full overflow-hidden py-8 sm:w-96  sm:-translate-y-20 sm:py-0 lg:backdrop-blur-md xl:w-xlarge",
            isFront ? styles.back : styles.front,
            styles.transi
          )}
          onClick={handleClick}
        >
          <AssetBox
            assets={initialAssets}
            onAssetSelect={handleAssetSelect}
            data={data.sort((a, b) => a.ticker.localeCompare(b.ticker))}
          />
        </div>
      </div>
    </div>
  );
};
export default PriceFeedBox;
