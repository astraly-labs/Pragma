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
    value: "8",
  },
  {
    label: "Data providers",
    value: "14",
  },
  {
    label: "Data integrity members",
    value: "6",
  },
  {
    label: "Raised",
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
        title="3 easy steps"
        subtitle="Try it yourself"
        text="We offer a variety of ways to integrate the data feeds you need into your project."
        href="https://docs.empiric.network/"
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
        subtitle="Why Pontis?"
        text="Built zk-first from the ground up, we power the DeFi ecosystem, from exchanges to stable coins to money markets."
        href="/features"
        hrefText="Learn more about how Pontis works"
      />
      <InfoSection />
    </SectionContainer>
    <SectionContainer className="sm:!px-0">
      <CTASection
        title="Ready to get the data you need?"
        description="Leverage recent breakthroughs in zero knowledge computation by using verifyable and composable data in your application."
        mainAction={{
          href: "https://docs.empiric.network/",
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
