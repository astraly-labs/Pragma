import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import BoxContainer from "../components/common/BoxContainer";
import classNames from "classnames";
import ResourcesHero from "../components/Resources/ResourcesHero";
import ReadyBox from "../components/common/ReadyBox";
import PriceFeedBox from "../components/Resources/PriceFeedBox";
import AssetBox, { AssetPair, AssetT } from "../components/common/AssetBox";
import { ChartBox } from "../components/common/ChartBox";
import CompFeedBox from "../components/Resources/CompFeedBox";
import VerifRandBox from "../components/Resources/VerifRandBox";
import Blog from "../components/Landing/Blog/Blog";
import { removeDuplicateTimestamps, timezone } from ".";
import moment from "moment-timezone";
import { UTCTimestamp } from "lightweight-charts";
import { initialAssets } from "../providers/data";

const EcosystemPage = () => {
  const [selectedAsset, setSelectedAsset] = useState<AssetPair | undefined>(
    undefined
  );

  const [allData, setAllData] = useState<AssetPair[]>([]); // Initialize state with empty array

  const [selectedAssetPair, setSelectedAssetPair] = useState<AssetT>(
    initialAssets[0]
  );

  // Function to handle asset selection
  const handleAssetSelect = (assetPair: AssetT) => {
    setSelectedAssetPair(assetPair); // Update selected asset in state
  };

  useEffect(() => {
    const fetchData = async (pairId: string, decimals: number) => {
      try {
        // This URL is now pointing to your Next.js API route (the proxy)
        const url = `/api/proxy?pair=${pairId}`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const unorderedData = await response.json();

        // TODO: remove hotfix
        const data = removeDuplicateTimestamps(
          unorderedData.data.sort(
            (a, b) =>
              moment.tz(b.time, timezone).valueOf() -
              moment.tz(a.time, timezone).valueOf()
          )
        );

        const priceData = data.reverse().map((d: any) => ({
          time: (moment.tz(d.time, timezone).valueOf() / 1000) as UTCTimestamp,
          value: parseInt(d.open) / 10 ** decimals,
        }));
        const lastIndex = data.length - 1;
        const dayIndex = lastIndex - 96;
        const variation24h = data[lastIndex].open - data[dayIndex].open;
        const relativeVariation24h = (variation24h / data[dayIndex].open) * 100;

        // Update your state with the new data
        const assetData = {
          ticker: unorderedData.pair_id,
          lastPrice: data[lastIndex].open,
          variation24h,
          relativeVariation24h,
          priceData,
        };

        setAllData((data) => [...data, assetData]);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    for (let i = 0; i < initialAssets.length; i++) {
      const asset = initialAssets[i];
      fetchData(asset.ticker, asset.decimals);
    }
  }, []);

  useEffect(() => {
    // Update data when selected asset changes
    if (allData.length > 0) {
      const newAsset = allData.find(
        (asset) => asset.ticker === selectedAssetPair.ticker
      );
      setSelectedAsset(newAsset);
    }
  }, [allData, selectedAssetPair]);

  return (
    <div
      className={classNames(
        "relative w-full overflow-x-hidden",
        styles.bigScreen
      )}
    >
      <ResourcesHero
        title={"Build, build, build"}
        description={
          "If you want to learn more about Pragma, start to build or work on new ideas, you’re in the right place"
        }
        solidButton={"Read docs"}
        solidButtonLink={"https://docs.pragma.build"}
        illustrationLink={"/assets/vectors/resources.svg"}
        illustrationSmallLink={"/assets/vectors/resourcesSmall.svg"}
      />
      <BoxContainer>
        {selectedAsset && (
          <PriceFeedBox
            ChartComponent={ChartBox}
            AssetComponent={AssetBox}
            selectedAsset={selectedAsset}
            initialAssets={initialAssets}
            handleAssetSelect={handleAssetSelect}
            data={allData}
          />
        )}
      </BoxContainer>
      <BoxContainer>
        <CompFeedBox />
      </BoxContainer>
      <BoxContainer>
        <VerifRandBox />
      </BoxContainer>
      <div className="p-10"></div>
      <Blog />
      <BoxContainer>
        <ReadyBox version={false} />
      </BoxContainer>
    </div>
  );
};

export default EcosystemPage;
