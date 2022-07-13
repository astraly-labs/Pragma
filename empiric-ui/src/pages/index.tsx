import React from "react";
import SectionContainer from "../components/common/SectionContainer";
import Heading from "../components/Heading";
import Hero from "../components/Landing/Hero";
import AssetsSection from "../components/Asset/AssetsSection";
import Testimonial from "../components/Landing/Testimonial";
import CTASection from "../components/CTASection";
import Code from "../components/Code/Code";
import { ChatIcon, CodeIcon } from "@heroicons/react/outline";
import InfoSection from "../components/Info/InfoSection";
import Banner from "../components/Banner";
import LogoCloud from "../components/LogoCloud";
import Stats from "../components/Stats";
import Marquee from "../components/Marquee";
import { protocols } from "../components/Protocol/ProtocolSection";
import { publishers } from "../components/Publisher/PublishersSection";

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
    <SectionContainer className="bg-slate-50 pt-12">
      <Hero />
    </SectionContainer>
    <SectionContainer className="bg-slate-50 !pt-0">
      <LogoCloud title="Used by" logos={protocols} square />
    </SectionContainer>
    <SectionContainer className="!pt-0">
      <AssetsSection />
      <Marquee title="Data from" logos={publishers} />
    </SectionContainer>
    <SectionContainer className="bg-slate-50">
      <Heading
        title="A few simple lines to integrate"
        subtitle="Try it yourself"
        text="Ready to get going? Copy the code below and start using high-quality data in your smart contracts!
        Or read our documentation to understand more about how Empiric works and how you can use Empiric to go beyond simple price feeds."
        href="https://docs.empiric.network/quickstart"
        hrefText="Read the documentation"
      />
      {/* <Code />*/}
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
      <CTASection
        title="Ready to get the data you need?"
        description="Leverage recent breakthroughs in zero knowledge computation by using verifiable and composable data in your application."
        mainAction={{
          href: "https://docs.empiric.network/quickstart",
          actionText: "Get started",
          icon: CodeIcon,
        }}
        secondaryAction={{
          href: "mailto:oskar@42labs.xyz?body=Hi%20Oskar,",
          actionText: "Request asset",
          icon: ChatIcon,
        }}
      />
    </SectionContainer>
  </div>
);

export default IndexPage;
