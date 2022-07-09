import React from "react";
import SectionContainer from "../components/common/SectionContainer";
<<<<<<< HEAD
import Heading from "../components/Heading";
import Hero from "../components/Landing/Hero";
import AssetsSection from "../components/Landing/AssetsSection";
import ProvidersSection from "../components/Landing/ProvidersSection";
=======
import Header from "../components/Header";
import Hero from "../components/Landing/Hero";
import AssetsSection from "../components/Landing/AssetsSection";
import ProvidersSection from "../components/Landing/ProvidersSection";
import FeatureSection from "../components/Landing/FeatureSection";
>>>>>>> ui-v1.0
import Testimonial from "../components/Landing/Testimonial";
import CTASection from "../components/CTASection";
import Code from "../components/Code/Code";
import { ChatIcon, CodeIcon } from "@heroicons/react/outline";
<<<<<<< HEAD
import InfoSection from "../components/Info/InfoSection";
=======
>>>>>>> ui-v1.0

const IndexPage = () => {
  return (
    <div className="w-screen">
<<<<<<< HEAD
      <SectionContainer className="bg-slate-50 pt-12">
=======
      <SectionContainer className="bg-slate-50">
>>>>>>> ui-v1.0
        <Hero />
      </SectionContainer>
      <SectionContainer className="!pt-0">
        <AssetsSection />
      </SectionContainer>
      <SectionContainer className="bg-slate-50 !pt-0">
        <ProvidersSection />
      </SectionContainer>
      <SectionContainer>
<<<<<<< HEAD
        <Testimonial />
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
      <SectionContainer>
        <Heading
          title="3 easy steps"
          subtitle="Try it yourself"
          text="We offer a variety of ways to integrate the data feeds you need into your project."
          href="#"
          hrefText="Read the documentation"
        />
=======
        <Header
          title="Reimagining Oracles"
          subtitle="Why Pontis?"
          text="Pontis is the first oracle live on Starknet. Built zk-first from the ground up, we power the DeFi ecosystem, from exchanges to stable coins to money markets."
          href="#"
          hrefText="Learn more about how Pontis works"
        />
        <FeatureSection />
      </SectionContainer>
      <SectionContainer>
        <Testimonial />
>>>>>>> ui-v1.0
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
