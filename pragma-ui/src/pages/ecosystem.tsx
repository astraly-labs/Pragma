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

const EcosystemPage = () => {
  return (
    <div
      className={classNames(
        "relative w-full overflow-x-hidden",
        styles.bigScreen
      )}
    >
      <BasicHero
        title={"Meet and join our"}
        greenTitle={"ecosystem"}
        description={
          "World-class builders already work on Pragma. If you’re an app builder, a data provider, an open-source contributor, or a smart person, join us in our mission "
        }
        solidButton={"become a publisher"}
        solidButtonLink={"/"}
        outlineButton={"integrate now"}
        outlineButtonLink={"/"}
        illustrationLink={"/assets/vectors/ecosystem.svg"}
        illustrationSmallLink={"/assets/vectors/ecosystemSmall.svg"}
      />
      <BoxContainer>
        <BlurBoxEcosystem
          greenText="50+"
          firstText="Our users"
          title="Projects already use verifiable data."
          generalText="50+ projects already switched to verifiable data using Pragma. You’re next?"
          textButton="Integrate now"
          linkButton="/"
          textButton2="Discover all ecosystem"
          linkButton2="/"
        />
        <StatsBox tve="10,000,000" tvs="10,000,000" />
      </BoxContainer>
      <BoxContainer>
        <CustomerCarousel />
      </BoxContainer>
      <BoxContainer>
        <DataProviders />
      </BoxContainer>
      <BoxContainer>
        <ProvidersList />
      </BoxContainer>
      <BoxContainer>
        <ReadyBox version={false} />
      </BoxContainer>
    </div>
  );
};

export default EcosystemPage;
