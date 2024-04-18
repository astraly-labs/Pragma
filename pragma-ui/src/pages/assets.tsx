import React, { useState } from "react";
import styles from "./styles.module.scss";
import BoxContainer from "../components/common/BoxContainer";
import classNames from "classnames";
import BasicHero from "../components/Ecosystem/BasicHero";
import AssetList from "../components/Assets/AssetList";

const options = [
  { name: "v1 mainnet" },
  { name: "v1 testnet" },
  { name: "API" },
  { name: "v2 testnet" },
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
        <AssetList options={options} isAsset={true} />
      </BoxContainer>
      <BoxContainer>
        <AssetList options={options} isAsset={false} />
      </BoxContainer>
    </div>
  );
};

export default AssetsPage;
