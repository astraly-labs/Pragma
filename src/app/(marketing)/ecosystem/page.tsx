import BoxContainer from "@/components/common/BoxContainer";
import clsx from "clsx";
import BasicHero from "@/components/Ecosystem/BasicHero";
import BlurBoxEcosystem from "@/components/common/BlurBoxEcosystem";
import StatsBox from "@/components/Ecosystem/StatsBox";
import CustomerCarousel from "@/components/Ecosystem/Customer/CustomerCarousel";
import DataProviders from "@/components/Ecosystem/DataProviders";
import ReadyBox from "@/components/common/ReadyBox";
import ProvidersList from "@/components/Ecosystem/ProvidersList";
import { ScrollReveal } from "@/components/common/ScrollReveal";

const EcosystemPage = () => {
  return (
    <div
      className={clsx(
        "relative w-full overflow-x-hidden",
        "mx-auto max-w-[1700px]"
      )}
    >
      <BasicHero
        title="Meet and join our"
        greenTitle="ecosystem"
        description="World-class builders already work on Pragma. If you're an app builder, a data provider, an open-source contributor, or a smart person, join us in our mission "
        solidButton="become a publisher"
        solidButtonLink="mailto:support@pragma.build?body=Hi%Pragma-Team,%I%want%to%become%a%publisher"
        outlineButton="integrate now"
        outlineButtonLink="https://docs.pragma.build/starknet"
        illustrationLink="/assets/vectors/ecosystem.svg"
        illustrationSmallLink="/assets/vectors/ecosystemSmall.svg"
      />
      <ScrollReveal delay={0.1}>
        <BoxContainer>
          <BlurBoxEcosystem
            greenText="10+"
            firstText="Our users"
            title="Projects already use verifiable data."
            generalText="10+ projects already switched to verifiable data using Pragma. You're next?"
            textButton="Integrate now"
            linkButton="https://docs.pragma.build/starknet"
            textButton2="Discover all ecosystem"
            linkButton2="https://defillama.com/oracles/Pragma"
          />
          <StatsBox tve="+5,000,000,000" tvs="+320,000,000" />
        </BoxContainer>
      </ScrollReveal>
      <ScrollReveal delay={0.15}>
        <BoxContainer>
          <CustomerCarousel />
        </BoxContainer>
      </ScrollReveal>
      <ScrollReveal delay={0.2}>
        <BoxContainer>
          <DataProviders />
        </BoxContainer>
      </ScrollReveal>
      <ScrollReveal delay={0.25}>
        <BoxContainer>
          <ProvidersList />
        </BoxContainer>
      </ScrollReveal>
      <ScrollReveal delay={0.3}>
        <BoxContainer>
          <ReadyBox version={true} />
        </BoxContainer>
      </ScrollReveal>
    </div>
  );
};

export default EcosystemPage;
