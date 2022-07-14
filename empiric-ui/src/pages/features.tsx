import React from "react";
import SectionContainer from "../components/common/SectionContainer";
import Heading from "../components/Heading";
import { DefaultCTASection } from "../components/CTASection";
import FAQ from "../components/FAQ";
import FeaturesDisplay from "../components/Features/FeaturesDisplay";
import TimelineExplanation from "../components/TimelineExplanation";

const FeaturesPage = () => {
  return (
    <div className="w-screen">
      <SectionContainer className="bg-slate-50" first>
        <Heading
          title="Reimagining Oracles"
          subtitle="Transparent, Decentralized &amp; Composable"
          text="Empiric Network has a uniquely robust and transparent architecture made possible by leveraging new zk-technology. "
          href="https://docs.empiric.network/quickstart"
          hrefText="Integrate verifiable data into your project"
        />
        <FeaturesDisplay />
      </SectionContainer>
      <SectionContainer>
        <Heading
          title="Step by Step Overview"
          subtitle="How it works"
          text="Follow along as the data moves from the sources on-chain and to your smart contract."
        />
        <TimelineExplanation />
      </SectionContainer>
      <SectionContainer className="bg-slate-50">
        <Heading
          title="Frequently asked questions"
          subtitle="Answers to"
          href="mailto:hello@42labs.xyz?body=Hi%20Empiric-Team,"
          hrefText="Send us your question"
        />
        <FAQ />
      </SectionContainer>
      <SectionContainer className="sm:!px-0">
        <DefaultCTASection />
      </SectionContainer>
    </div>
  );
};

export default FeaturesPage;
