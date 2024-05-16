import React from "react";
import styles from "./styles.module.scss";
import BoxContainer from "../components/common/BoxContainer";
import classNames from "classnames";
import BasicHero from "../components/Ecosystem/BasicHero";
import AssetList from "../components/Assets/AssetList";

const options = [
  { name: "v1 mainnet" },
  { name: "v1 testnet" },
  { name: "API prod" },
  { name: "v2 testnet" },
];

export const assets = [
  {
    image: "/assets/currencies/btc.svg",
    type: "Crypto",
    ticker: "BTCUSD",
    lastUpdated: "<1s ago",
    price: 62402,
    sources: 3,
    variations: {
      past1h: 0,
      past24h: 10,
      past7d: -2,
    },
    chart: "https://www.coingecko.com/coins/1/sparkline.svg",
  },
  {
    image: "/assets/currencies/sol.svg",
    type: "Crypto",
    ticker: "SOLUSD",
    lastUpdated: "2s ago",
    price: 132.91,
    sources: 10,
    variations: {
      past1h: -3.32,
      past24h: -2.19,
      past7d: 4.3,
    },
    chart: "https://www.coingecko.com/coins/4128/sparkline.svg",
  },
];

const dataProviders = [
  {
    image: "/assets/publishers/pragma.svg",
    type: "Third-party",
    name: "Pragma",
    lastUpdated: "2s ago",
    reputationScore: "0.99",
    nbFeeds: "6",
    dailyUpdates: "3000",
    totalUpdates: "50000",
  },
  {
    image: "/assets/publishers/pragma.svg",
    type: "Third-party",
    name: "Pragma",
    lastUpdated: "2s ago",
    reputationScore: "0.99",
    nbFeeds: "6",
    dailyUpdates: "3000",
    totalUpdates: "50000",
  },
];

const AssetsPage = () => {
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
        <AssetList options={options} isAsset={true} assets={assets} />
      </BoxContainer>
      <BoxContainer>
        <AssetList options={options} isAsset={false} assets={dataProviders} />
      </BoxContainer>
    </div>
  );
};

export default AssetsPage;
