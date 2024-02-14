import React, { useState } from "react";
import styles from "./styles.module.scss";
import GreenText from "../common/GreenText";
import { ButtonLink } from "../common/Button";
import { AssetPair, AssetT } from "../common/AssetBox";
import classNames from "classnames";

interface PriceFeedBoxProps {
  ChartComponent: React.ComponentType<any>;
  AssetComponent: React.ComponentType<any>;
  selectedAsset: AssetPair;
  initialAssets: AssetT[];
  handleAssetSelect: (asset: AssetT) => void;
  data: AssetPair[];
}

const PriceFeedBox: React.FC<PriceFeedBoxProps> = ({
  ChartComponent,
  AssetComponent,
  selectedAsset,
  initialAssets,
  handleAssetSelect,
  data,
}) => {
  const [isFront, setIsFront] = useState(false);

  const handleClick = () => {
    setIsFront(!isFront);
  };
  return (
    <div className={styles.darkGreenBox}>
      <div className="my-auto w-10/12 items-center md:pb-20">
        <h2 className="mb-4 text-lightGreen">Data Feeds</h2>
        <GreenText isAligned={false} className="mb-10">
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
          href="https://docs.pragma.build/GettingStarted/Consuming%20Data%20Feed"
          center={false}
          className="w-fit"
        >
          Integrate Feeds
        </ButtonLink>
      </div>
      <div className="relative flex w-full flex-col md:px-20 lg:px-0">
        <div
          className={classNames(
            "relative w-full overflow-hidden sm:w-96 xl:w-xlarge",
            isFront ? styles.front : styles.back,
            styles.transi
          )}
          onClick={handleClick}
        >
          <ChartComponent assetPair={selectedAsset} />
        </div>
        <div
          className={classNames(
            "relative ml-auto w-full overflow-hidden py-8 backdrop-blur-md  sm:w-96 sm:-translate-y-20 sm:py-0 xl:w-xlarge",
            isFront ? styles.back : styles.front,
            styles.transi
          )}
          onClick={handleClick}
        >
          <AssetComponent
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
