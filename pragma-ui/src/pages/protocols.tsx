import React from "react";
import { NextSeo } from "next-seo";
import { DefaultCTASection } from "../components/CTASection";
import SectionContainer from "../components/common/SectionContainer";
import Code from "../components/Code/Code";
import Heading from "../components/Heading";
import ProtocolSection from "../components/Protocol/ProtocolSection";

const ProtocolsPage = () => (
  <>
    <NextSeo title="Protocols" />
    <div className="w-full">
      <SectionContainer className="bg-dark" first>
        <Heading
          title="StarkNet's leading protocols"
          subtitle="Meet our users"
          text="We work closely with teams to ensure they get exactly what they need. Reach out to us if you need a custom solution."
          href="https://docs.pragmaoracle.com/using-pragma/consuming-data"
          hrefText="Get verifiable data for your project"
        />
      </SectionContainer>
      <SectionContainer className="bg-black sm:!pt-0">
        <ProtocolSection />
      </SectionContainer>
      <SectionContainer className="bg-dark">
        <Heading
          title="A few simple lines to integrate"
          subtitle="Try it yourself"
          text="We offer a variety of ways to get high-quality, robust data from the oracle."
          href="https://docs.pragmaoracle.com/using-pragma/consuming-data"
          hrefText="Read the documentation"
        />
        <Code />
      </SectionContainer>
      <SectionContainer className="bg-black">
        <DefaultCTASection />
      </SectionContainer>
    </div>
  </>
);

export default ProtocolsPage;
