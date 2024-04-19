import React, { useState } from "react";
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

const assets = [
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
    image: "/path/to/image1.png",
    type: "Type 1",
    ticker: "Ticker 1",
    lastUpdated: "2024-04-10T12:00:00Z",
    price: 100,
    sources: 3,
    variations: {
      past1h: 5,
      past24h: 10,
      past7d: -2,
    },
    chart: "/path/to/chart1.png",
  },
  {
    image: "/path/to/image2.png",
    type: "Type 2",
    ticker: "Ticker 2",
    lastUpdated: "2024-04-10T12:00:00Z",
    price: 200,
    sources: 5,
    variations: {
      past1h: 8,
      past24h: 15,
      past7d: 3,
    },
    chart: "/path/to/chart2.png",
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
        illustrationSmallLink={"/assets/vectors/ecosystemSmall.svg"}
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
