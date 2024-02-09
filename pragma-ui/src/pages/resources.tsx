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

const EcosystemPage = () => {
  const initialAssets: AssetT[] = [
    { ticker: "BTC/USD", address: "0x0" },
    { ticker: "ETH/USD", address: "0x1" },
  ];

  const [selectedAsset, setSelectedAsset] = useState<AssetPair>({
    ticker: "BTC/USD",
    lastPrice: 50000,
    variation24h: 2000,
    relativeVariation24h: 4,
    priceData: [
      { time: "2018-12-22", value: 32.51 },
      { time: "2018-12-23", value: 31.11 },
      // Add more data as needed
    ],
  });

  const [allData, setAllData] = useState<AssetPair[]>([]); // Initialize state with empty array

  const [selectedAssetPair, setSelectedAssetPair] = useState<AssetT>({
    ticker: "BTC/USD",
    address: "0x0",
  });

  // Function to handle asset selection
  const handleAssetSelect = (assetPair: AssetT) => {
    setSelectedAssetPair(assetPair); // Update selected asset in state
  };

  useEffect(() => {
    const fetchData = async (pairId: string) => {
      try {
        // This URL is now pointing to your Next.js API route (the proxy)
        const url = `/api/proxy?pair=${pairId}`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);

        // Update your state with the new data
        const assetData = {
          ticker: data.pair_id,
          lastPrice: data.data[0].close,
          variation24h: 2000,
          relativeVariation24h: 4,
          priceData: data.data.reverse().map((d) => ({
            time: new Date(d.time).getTime() / 1000,
            value: parseInt(d.close) / 10 ** 8,
          })),
        };
        setAllData((data) => [...data, assetData]);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    for (let i = 0; i < initialAssets.length; i++) {
      const asset = initialAssets[i];
      fetchData(asset.ticker);
    }
  }, []); // Dependency array is empty to run once on mount

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
        <PriceFeedBox
          ChartComponent={ChartBox}
          AssetComponent={AssetBox}
          selectedAsset={selectedAsset}
          initialAssets={initialAssets}
          handleAssetSelect={handleAssetSelect}
        />
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
