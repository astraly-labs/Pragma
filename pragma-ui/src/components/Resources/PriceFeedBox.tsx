import React from "react";
import styles from "./styles.module.scss";
import GreenText from "../common/GreenText";
import { ButtonLink } from "../common/Button";
import { AssetPair, AssetT } from "../common/AssetBox";

interface PriceFeedBoxProps {
  ChartComponent: React.ComponentType<any>;
  AssetComponent: React.ComponentType<any>;
  selectedAsset: AssetPair;
  initialAssets: AssetT[];
  handleAssetSelect: (asset: AssetT) => void;
}

const PriceFeedBox: React.FC<PriceFeedBoxProps> = ({
  ChartComponent,
  AssetComponent,
  selectedAsset,
  initialAssets,
  handleAssetSelect,
}) => {
  return (
    <div className={styles.darkGreenBox}>
      <div className="my-auto w-10/12 items-center md:pb-20">
        <h2 className="mb-4 text-lightGreen">Data Feeds</h2>
        <GreenText isAligned={false} className="mb-10">
          Lorem ipsum dolor sit amet, consectetur adipiscing , sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
          veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
          ea commodo consequat.
        </GreenText>
        <ButtonLink
          variant="outline"
          color="mint"
          href="/"
          center={false}
          className="w-fit"
        >
          Integrate Feeds
        </ButtonLink>
      </div>
      <div className="relative flex w-full flex-col md:px-20 lg:px-0">
        <div className={"w-full overflow-hidden sm:w-96 xl:w-xlarge"}>
          <ChartComponent assetPair={selectedAsset} />
        </div>
        <div
          className={
            "ml-auto w-full overflow-hidden py-8 backdrop-blur-md sm:w-96  sm:-translate-y-20 sm:py-0 xl:w-xlarge "
          }
        >
          <AssetComponent
            assets={initialAssets}
            onAssetSelect={handleAssetSelect}
          />
        </div>
      </div>
    </div>
  );
};
export default PriceFeedBox;
