import styles from "@/pages/styles.module.scss";
import BoxContainer from "@/components/common/BoxContainer";
import classNames from "classnames";
import BasicHero from "@/components/Ecosystem/BasicHero";
import BlurBoxEcosystem from "@/components/common/BlurBoxEcosystem";
import StatsBox from "@/components/Ecosystem/StatsBox";
import CustomerCarousel from "@/components/Ecosystem/Customer/CustomerCarousel";
import DataProviders from "@/components/Ecosystem/DataProviders";
import ReadyBox from "@/components/common/ReadyBox";
import ProvidersList from "@/components/Ecosystem/ProvidersList";

const EcosystemPage = () => {
  return (
    <div
      className={classNames(
        "relative w-full overflow-x-hidden",
        styles.bigScreen
      )}
    >
      <BasicHero
        title="Meet and join our"
        greenTitle="ecosystem"
        description="World-class builders already work on Pragma. If you’re an app builder, a data provider, an open-source contributor, or a smart person, join us in our mission "
        solidButton="become a publisher"
        solidButtonLink="mailto:support@pragma.build?body=Hi%Pragma-Team,%I%want%to%become%a%publisher"
        outlineButton="integrate now"
        outlineButtonLink="https://docs.pragma.build/Resources/Consuming%20Data%20Feed"
        illustrationLink="/assets/vectors/ecosystem.svg"
        illustrationSmallLink="/assets/vectors/ecosystemSmall.svg"
      />
      <BoxContainer>
        <BlurBoxEcosystem
          greenText="10+"
          firstText="Our users"
          title="Projects already use verifiable data."
          generalText="10+ projects already switched to verifiable data using Pragma. You’re next?"
          textButton="Integrate now"
          linkButton="https://docs.pragma.build/Resources/Consuming%20Data%20Feed"
          textButton2="Discover all ecosystem"
          linkButton2="https://defillama.com/oracles/Pragma"
        />
        <StatsBox tve="+5,000,000,000" tvs="+320,000,000" />
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
        <ReadyBox version={true} />
      </BoxContainer>
    </div>
  );
};

export default EcosystemPage;
