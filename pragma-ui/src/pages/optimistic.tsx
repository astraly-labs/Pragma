import React from "react";
import styles from "./styles.module.scss";
import BoxContainer from "../components/common/BoxContainer";
import classNames from "classnames";
import BasicHero from "../components/Ecosystem/BasicHero";
import BlurBoxEcosystem from "../components/common/BlurBoxEcosystem";
import StatsBox from "../components/Ecosystem/StatsBox";
import CustomerCarousel from "../components/Ecosystem/Customer/CustomerCarousel";
import DataProviders from "../components/Ecosystem/DataProviders";
import ReadyBox from "../components/common/ReadyBox";
import ProvidersList from "../components/Ecosystem/ProvidersList";

const OptimisticPage = () => {
  return (
    <div
      className={classNames(
        "relative w-full overflow-x-hidden",
        styles.bigScreen
      )}
    >
      <BasicHero
        title={"Propose, ask"}
        greenTitle={"dispute"}
        description={
          "The Pragma Optimistic Oracle is built for you. Ask any question, get the answer onchain."
        }
        solidButton={"Make an assertion"}
        solidButtonLink={"/assertion"}
        outlineButton={"Integrate"}
        outlineButtonLink={
          "https://docs.pragma.build/Resources/Cairo%201/optimistic-oracle/Overview"
        }
        illustrationLink={"/assets/vectors/optimistic.svg"}
        illustrationSmallLink={"/assets/vectors/optimistic.svg"}
      />
    </div>
  );
};

export default OptimisticPage;
