import React from "react";
import SectionContainer from "../components/common/SectionContainer";
import Heading from "../components/Heading";
import Hero from "../components/Landing/Hero";
import AssetsSection from "../components/Asset/AssetsSection";
import Testimonial from "../components/Landing/Testimonial";
import { DefaultCTASection } from "../components/CTASection";
import Code from "../components/Code/Code";
import InfoSection from "../components/Info/InfoSection";
import Banner from "../components/Banner";
import LogoCloud from "../components/LogoClouds/LogoCloud";
import Stats from "../components/Stats";
import { protocols } from "../components/Protocol/ProtocolSection";
import { publishers } from "../components/Publisher/PublishersSection";
import LogoGrid from "../components/LogoClouds/LogoGrid";

const stats = [
  {
    label: "Customers",
    value: "6+",
  },
  {
    label: "Data sources",
    value: "12+",
  },
  {
    label: "Data feeds",
    value: "20+",
  },
  {
    label: "Funding",
    value: "$7M",
  },
];

const IndexPage = () => (
  <div className="w-screen">
    <Banner />
    <SectionContainer className="bg-slate-50" first>
      <Hero />
    </SectionContainer>
    <SectionContainer className="bg-slate-50 !pt-0">
      <LogoGrid
        title="Proprietary data from custom integrations with"
        logos={publishers}
      />
    </SectionContainer>
    <SectionContainer className="!pt-0">
      <AssetsSection />
      <LogoCloud title="Trusted by" logos={protocols} />
    </SectionContainer>
    <SectionContainer className="bg-slate-50">
      <Heading
        title="A few simple lines to integrate"
        subtitle="Try it yourself"
        text="Ready to get going? Head to our documentation using the link below and start using high-quality data in your smart contracts!
        Or, copy the code below to install the Empiric Network SDK and start interacting with our feeds locally."
        href="https://docs.empiric.network/quickstart"
        hrefText="Read the documentation"
      />
      <Code />
    </SectionContainer>
    <SectionContainer>
      <Testimonial />
      <Stats stats={stats} />
    </SectionContainer>
    <SectionContainer className="overflow-hidden bg-slate-50">
      <Heading
        title="Reimagine Oracles"
        subtitle="Why Empiric?"
        text="Built zk-first from the ground up, we power the DeFi ecosystem, from exchanges to stable coins to money markets."
        href="/features"
        hrefText="Learn more about how Empiric works"
      />
      <InfoSection />
    </SectionContainer>
    <SectionContainer className="sm:!px-0">
      <DefaultCTASection />
    </SectionContainer>
  </div>
);

export default IndexPage;
