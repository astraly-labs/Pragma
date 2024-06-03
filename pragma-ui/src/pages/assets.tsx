import React from "react";
import styles from "./styles.module.scss";
import BoxContainer from "../components/common/BoxContainer";
import classNames from "classnames";
import BasicHero from "../components/Ecosystem/BasicHero";
import AssetList from "../components/Assets/AssetList";
import { useData } from "../providers/data";
import moment from "moment";
import { COINGECKO_MAPPING_IDS } from "../utils/types";

export const options = [
  "testnet", "mainnet", "offchain"
];

export type AssetInfo = {
  image: string;
  type: string;
  ticker: string;
  lastUpdated: string;
  price: number;
  sources: number;
  variations: {
    past1h: number;
    past24h: number;
    past7d: number;
  };
  chart: string;
  ema: string;
  macd: string;
};

export const dataProviders = [
  {
    image: "/assets/publishers/pragma.svg",
    type: "Third-party",
    link: "https://flowdesk.co",
    name: "Flowdesk",
    lastUpdated: "2s ago",
    reputationScore: "soon",
    nbFeeds: "6",
    dailyUpdates: "3000",
    totalUpdates: "50000",
  },
  {
    image: "/assets/publishers/pragma.svg",
    type: "Third-party",
    link: "https://pragma.build",
    name: "Pragma",
    lastUpdated: "2s ago",
    reputationScore: "soon",
    nbFeeds: "6",
    dailyUpdates: "3000",
    totalUpdates: "50000",
  },
];

const formatAssets = (data: { [ticker: string]: any }): AssetInfo[] => {
  return Object.keys(data).map(ticker => {
    const assetData = data[ticker];
    const lastUpdated = moment(assetData.last_updated_timestamp * 1000).fromNow(); // Using moment.js to format time
    return {
      image: `/assets/currencies/${ticker.toLowerCase().split('/')[0]}.svg`,
      type: "Crypto",
      ticker: ticker.replace('/', ''),
      lastUpdated: lastUpdated,
      price: assetData.price,
      sources: assetData.nb_sources_aggregated,
      variations: {
        past1h: assetData.variations?.past1h || 0,
        past24h: assetData.variations?.past24h || 0,
        past7d: assetData.variations?.past7d || 0,
      },
      chart: `https://www.coingecko.com/coins/${COINGECKO_MAPPING_IDS[ticker.toLowerCase().split('/')[0]]}/sparkline.svg`,
      ema: "soon",
      macd: "soon",
    };
  });
};

const AssetsPage = () => {
  const { data, loading, error, switchSource, currentSource } = useData();

  const formattedAssets = formatAssets(data || {});

  return (
    <div
      className={classNames(
        "relative w-full overflow-x-hidden",
        styles.bigScreen
      )}
    >
      <BasicHero
        title={"Your gate to secure"}
        greenTitle={"real-time market data"}
        description={""}
        solidButton={"Read docs"}
        solidButtonLink={"https://docs.pragma.build"}
        outlineButton={"Data Feeds"}
        outlineButtonLink={"#feeds"}
        illustrationLink={"/assets/vectors/chart.svg"}
        illustrationSmallLink={"/assets/vectors/chartSmall.svg"}
      />
      <BoxContainer>
        <AssetList options={options} isAsset={true} assets={formattedAssets} onSourceChange={switchSource} selectedSource={currentSource} />
      </BoxContainer>
      <BoxContainer>
        <AssetList options={options} isAsset={false} assets={dataProviders} onSourceChange={switchSource} selectedSource={currentSource} />
      </BoxContainer>
    </div>
  );
};

export default AssetsPage;
