import React from "react";
import SectionContainer from "../components/common/SectionContainer";
import Heading from "../components/Heading";
import Hero from "../components/Landing/Hero";
import AssetsSection from "../components/Landing/AssetsSection";
import ProvidersSection from "../components/Landing/ProvidersSection";
import FeatureSection from "../components/Landing/FeatureSection";
import Testimonial from "../components/Landing/Testimonial";
import CTASection from "../components/CTASection";
import Code from "../components/Code/Code";
import { ChatIcon, CodeIcon } from "@heroicons/react/outline";

const IndexPage = () => {
  return (
    <div className="w-screen">
      <SectionContainer className="bg-slate-50 pt-12">
        <Hero />
      </SectionContainer>
      <SectionContainer className="!pt-0">
        <AssetsSection />
      </SectionContainer>
      <SectionContainer className="bg-slate-50 !pt-0">
        <ProvidersSection />
      </SectionContainer>
      <SectionContainer>
        <Heading
          title="Reimagining Oracles"
          subtitle="Why Pontis?"
          text="Pontis is the first oracle live on Starknet. Built zk-first from the ground up, we power the DeFi ecosystem, from exchanges to stable coins to money markets."
          href="/features"
          hrefText="Learn more about how Pontis works"
        />
        <FeatureSection />
      </SectionContainer>
      <SectionContainer>
        <Testimonial />
        <Code />
      </SectionContainer>
      <SectionContainer className="sm:!px-0">
        <CTASection
          title="Ready to get the data you need?"
          description="Leverage recent breakthroughs in zero knowledge computation by using verifyable and composable data in your application."
          mainAction={{
            href: "/",
            actionText: "Read the docs",
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
};

export default IndexPage;
