import React from "react";
import styles from "./styles.module.scss";
import BoxContainer from "../components/common/BoxContainer";
import classNames from "classnames";
import AssetList from "../components/Assets/AssetList";
import { PublisherT, useData } from "../providers/data";
import moment from "moment";
import { COINGECKO_MAPPING_IDS } from "../utils/types";
import { getPublisherType } from "../utils";
import AssetHero from "../components/common/AssetHero";
import { useRouter } from "next/router";

export const options = ["sepolia", "mainnet", "api"];

export type AssetInfo = {
  image: string;
  type: string;
  ticker: string;
  lastUpdated: string;
  price: number;
  sources: number;
  variations: {
    past1h: string | number;
    past24h: string | number;
    past7d: string | number;
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
  reputationScore: string | null;
  nbFeeds: number;
  dailyUpdates: number;
  totalUpdates: number;
};

const formatAssets = (data: { [ticker: string]: any }): AssetInfo[] => {
  return Object.keys(data)
    .filter((ticker) => data[ticker]) // Filter out undefined/null entries
    .map((ticker) => {
      const assetData = data[ticker];
      const lastUpdated = moment(
        assetData.last_updated_timestamp * 1000
      ).fromNow(); // Using moment.js to format time
      return {
        image: `/assets/currencies/${ticker.toLowerCase().split("/")[0]}.svg`,
        type: "Crypto",
        ticker,
        lastUpdated: lastUpdated,
        price: parseInt(assetData.price, 16) / 10 ** assetData.decimals,
        sources: assetData.nb_sources_aggregated,
        variations: {
          past1h: (assetData.variations["1h"] * 100).toFixed(2) || 0,
          past24h: (assetData.variations["1d"] * 100).toFixed(2) || 0,
          past7d: (assetData.variations["1w"] * 100).toFixed(2) || 0,
        },
        chart: `https://www.coingecko.com/coins/${
          COINGECKO_MAPPING_IDS[ticker.toLowerCase().split("/")[0]]
        }/sparkline.svg`,
        ema: "soon",
        macd: "soon",
      };
    });
};

const formatPublishers = (publishers: PublisherT[]): DataProviderInfo[] => {
  return publishers.map((publisher) => {
    const lastUpdated = moment(
      publisher.last_updated_timestamp * 1000
    ).fromNow(); // Using moment.js to format time
    return {
      image: `/assets/publishers/${publisher.publisher.toLowerCase()}.svg`,
      type: getPublisherType(publisher.type),
      link: publisher.website_url,
      name: publisher.publisher,
      lastUpdated: lastUpdated,
      reputationScore: "soon",
      nbFeeds: publisher.nb_feeds,
      dailyUpdates: publisher.daily_updates,
      totalUpdates: publisher.total_updates,
    };
  });
};

const AssetsPage = () => {
  const { data, loading, switchSource, currentSource, publishers } = useData();
  const router = useRouter();
  const sourceParam = router.query.source as string;

  // If there's a source parameter and it's valid, switch to it on mount
  React.useEffect(() => {
    if (
      sourceParam &&
      options.includes(sourceParam) &&
      sourceParam !== currentSource
    ) {
      switchSource(sourceParam);
    }
  }, [sourceParam, currentSource, switchSource]);

  const handleSourceChange = (newSource: string) => {
    router.push(`/assets?source=${newSource}`, undefined, { shallow: true });
    switchSource(newSource);
  };

  const formattedAssets = loading ? [] : formatAssets(data);
  const formattedPublishers = loading ? [] : formatPublishers(publishers);
  return (
    <div
      className={classNames(
        "relative w-full overflow-x-hidden",
        styles.bigScreen
      )}
    >
      <AssetHero
        title={"Every asset"}
        greenTitle={"priced the best way"}
        description={
          "Explore the assets supported by Pragma, priced in the most efficient way. Best pricing, no fluff."
        }
        solidButton={"Read docs"}
        solidButtonLink={"https://docs.pragma.build"}
        illustrationLink={"/assets/vectors/chart.svg"}
        illustrationSmallLink={"/assets/vectors/chartSmall.svg"}
      />
      <BoxContainer>
        <AssetList
          options={options}
          isAsset={true}
          assets={formattedAssets}
          onSourceChange={handleSourceChange}
          selectedSource={currentSource}
          loading={loading}
        />
      </BoxContainer>
      {currentSource !== "api" && (
        <BoxContainer>
          <AssetList
            options={options}
            isAsset={false}
            assets={formattedPublishers}
            onSourceChange={handleSourceChange}
            selectedSource={currentSource}
            loading={loading}
          />
        </BoxContainer>
      )}
    </div>
  );
};

export default AssetsPage;
