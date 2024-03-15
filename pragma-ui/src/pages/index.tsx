import React, { useEffect, useState } from "react";
import Hero from "../components/Landing/Hero";
import styles from "./styles.module.scss";
import MarqueeLogo from "../components/Landing/MarqueeLogo";
import BoxContainer from "../components/common/BoxContainer";
import BlurBox from "../components/common/BlurBox";
import CodeSnippet from "../components/Landing/CodeSnippet";
import Architecture from "../components/Landing/Architecture";
import Testimonial from "../components/Landing/Testimonial/Testimonial";
import Blog from "../components/Landing/Blog/Blog";
import Events from "../components/Landing/Events";
import ReadyBox from "../components/common/ReadyBox";
import { ChartBox } from "../components/common/ChartBox";
import AssetBox, { AssetPair, AssetT } from "../components/common/AssetBox";
import classNames from "classnames";

export const initialAssets: AssetT[] = [
  { ticker: "BTC/USD", address: "0x0", decimals: 8 },
  { ticker: "ETH/USD", address: "0x1", decimals: 8 },
  { ticker: "USDC/USD", address: "0x2", decimals: 6 },
  { ticker: "USDT/USD", address: "0x2", decimals: 6 },
  // { ticker: "ETH/STRK", address: "0x2", decimals: 18 },
  // { ticker: "DAI/USD", address: "0x2", decimals: 8 },
];

const IndexPage = () => {
  const [windowWidth, setWindowWidth] = useState(null);
  const [selectedAsset, setSelectedAsset] = useState<AssetPair>(null);

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
        const data = await response.json();
        console.log(data);

        const variation24h = data.data[0].open - data.data[96].open;
        const relativeVariation24h = (variation24h / data.data[96].open) * 100;

        // Update your state with the new data
        const assetData = {
          ticker: data.pair_id,
          lastPrice: data.data[0].open,
          variation24h,
          relativeVariation24h,
          priceData: data.data.reverse().map((d: any) => ({
            time: new Date(d.time).getTime() / 1000,
            value: parseInt(d.open) / 10 ** decimals,
          })),
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

  useEffect(() => {
    // Check if the window object is available
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);

      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };

      window.addEventListener("resize", handleResize);

      // Clean-up function to remove event listener
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  // Define different image sources based on screen size
  const getImageSource1 = () => {
    if (windowWidth < 640) {
      return "/assets/vectors/vector1bis.svg";
    } else {
      return "/assets/vectors/vector1.svg";
    }
  };

  const getImageSource2 = () => {
    if (windowWidth < 640) {
      return "/assets/vectors/vector2bis.svg";
    } else {
      return "/assets/vectors/vector2.svg";
    }
  };

  return (
    <div
      className={classNames(
        "relative w-full overflow-x-hidden",
        styles.bigScreen
      )}
    >
      {/* <Banner /> */}
      <Hero />
      <BoxContainer>
        <MarqueeLogo />
      </BoxContainer>

      <BoxContainer>
        <BlurBox
          firstText="Price Feeds"
          title="The data your smart-contracts always wanted."
          generalText="Your smart contracts are decentralized, transparent and composable. The data you’re using to feed them should have the same properties. Start integrating Pragma’s price feed now and unlock the power of verifiable data."
          urlSvg={getImageSource1()}
          textButton="Integrate Now"
          linkButton="https://docs.pragma.build/GettingStarted/Consuming%20Data%20Feed"
        />
        <div className="flex h-full w-full flex-col gap-3 sm:gap-8">
          <ChartBox assetPair={selectedAsset} />
          <AssetBox
            assets={initialAssets}
            onAssetSelect={handleAssetSelect}
            data={allData.sort((a, b) => a.ticker.localeCompare(b.ticker))}
          />
        </div>
      </BoxContainer>
      <BoxContainer>
        <CodeSnippet />
        <BlurBox
          firstText="Start Building"
          title="Integrate existing feeds, or build new ones."
          generalText="A few lines to integrate any existing data feed, a few more if you want to create a new feed using our raw data."
          urlSvg={getImageSource2()}
          textButton="Start Building"
          linkButton="https://docs.pragma.build/Resources/Cairo%201/computational-feeds/what-are-computational-feeds"
        />
      </BoxContainer>
      <BoxContainer>
        <Architecture />
      </BoxContainer>
      <BoxContainer>
        <Testimonial />
      </BoxContainer>
      <Blog />
      <BoxContainer>
        <Events />
      </BoxContainer>
      <BoxContainer>
        <ReadyBox version={true} />
      </BoxContainer>
    </div>
  );
};

export default IndexPage;
