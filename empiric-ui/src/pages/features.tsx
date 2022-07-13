import React from "react";
import { CodeIcon, ChatIcon } from "@heroicons/react/outline";
import SectionContainer from "../components/common/SectionContainer";
import Heading from "../components/Heading";
import CTASection from "../components/CTASection";
import FAQ from "../components/FAQ";
import FeaturesDisplay from "../components/Features/FeaturesDisplay";
import TimelineExplanation from "../components/TimelineExplanation";

const FeaturesPage = () => {
  return (
    <div className="w-screen">
      <SectionContainer className="bg-slate-50" first>
        <Heading
          title="Reimagining oracles"
          subtitle="Meet our compute engine"
          text="Our features empower native protocols to realize their ambitious potential."
          href="https://docs.empiric.network/quickstart"
          hrefText="Integrate verifiable data into your project"
        />
        <FeaturesDisplay />
      </SectionContainer>
      <SectionContainer>
        <Heading
          title="A closer look"
          subtitle="How it works"
          text="Sit laboris adipisicing id culpa veniam magna Lorem occaecat laboris."
        />
        <TimelineExplanation />
      </SectionContainer>
      <SectionContainer className="bg-slate-50">
        <Heading
          title="Frequently asked questions"
          subtitle="Answers to"
          href="mailto:oskar@42labs.xyz?body=Hi%20Oskar,"
          hrefText="Send us your question"
        />
        <FAQ />
      </SectionContainer>
      <SectionContainer className="sm:!px-0">
        <CTASection
          title="Ready to get the data you need?"
          description="Leverage recent breakthroughs in zero knowledge computation by using verifiable and composable data in your application."
          mainAction={{
            href: "https://docs.empiric.network/quickstart",
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

export default FeaturesPage;
