import React from "react";
import styles from "./styles.module.scss";
import BoxContainer from "../components/common/BoxContainer";
import classNames from "classnames";
import BasicHero from "../components/Ecosystem/BasicHero";
import AssetList from "../components/Assets/AssetList";
import { PublisherT, useData } from "../providers/data";
import moment from "moment";
import { COINGECKO_MAPPING_IDS } from "../utils/types";
import { getPublisherType } from "../utils";

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

export type DataProviderInfo = {
  image: string;
  type: string;
  link: string;
  name: string;
  lastUpdated: string;
  reputationScore: number | null;
  nbFeeds: number;
  dailyUpdates: number;
  totalUpdates: number;
};

const formatAssets = (data: { [ticker: string]: any }): AssetInfo[] => {
  return Object.keys(data).map(ticker => {
    const assetData = data[ticker];
    const lastUpdated = moment(assetData.last_updated_timestamp * 1000).fromNow(); // Using moment.js to format time
    return {
      image: `/assets/currencies/${ticker.toLowerCase().split('/')[0]}.svg`,
      type: "Crypto",
      ticker,
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

const formatPublishers = (publishers: PublisherT[]): DataProviderInfo[] => {
  return publishers.map(publisher => {
    const lastUpdated = moment(publisher.last_updated_timestamp * 1000).fromNow(); // Using moment.js to format time
    return {
      image: `/assets/publishers/${publisher.publisher.toLowerCase()}.svg`,
      type: getPublisherType(publisher.type),
      link: publisher.website_url,
      name: publisher.publisher,
      lastUpdated: lastUpdated,
      reputationScore: null,
      nbFeeds: publisher.nb_feeds,
      dailyUpdates: publisher.daily_updates,
      totalUpdates: publisher.total_updates,
    };
  });
}

const AssetsPage = () => {
  const { data, loading, error, switchSource, currentSource, publishers } = useData();

  const formattedAssets = formatAssets(data || {});
  const formattedPublishers = formatPublishers(publishers || []);

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
        <AssetList options={options} isAsset={true} assets={formattedAssets} onSourceChange={switchSource} selectedSource={currentSource} loading={loading} />
      </BoxContainer>
      <BoxContainer>
        <AssetList options={options} isAsset={false} assets={formattedPublishers} onSourceChange={switchSource} selectedSource={currentSource} loading={loading} />
      </BoxContainer>
    </div>
  );
};

export default AssetsPage;
