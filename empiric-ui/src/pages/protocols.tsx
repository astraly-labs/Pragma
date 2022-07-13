import React from "react";
import { ChatIcon, CodeIcon } from "@heroicons/react/outline";
import CTASection from "../components/CTASection";
import SectionContainer from "../components/common/SectionContainer";
import Code from "../components/Code/Code";
import Heading from "../components/Heading";
import ProtocolSection from "../components/Protocol/ProtocolSection";

const ProtocolsPage = () => {
  return (
    <div className="w-screen">
      <SectionContainer className="bg-slate-50" first>
        <Heading
          title="StarkNet's leading protocols"
          subtitle="Meet our users"
          text="We work closely with teams to ensure they get exactly what they need. Reach out to us if you need a custom solution."
          href="#"
          hrefText="Get verifyable data for your project"
        />
      </SectionContainer>
      <SectionContainer className="sm:!pt-0">
        <ProtocolSection />
      </SectionContainer>
      <SectionContainer className="bg-slate-50">
        <Heading
          title="3 easy steps"
          subtitle="Try it yourself"
          text="We offer a variety of ways to interact with the oracle."
          href="#"
          hrefText="Read the documentation"
        />
        <Code />
      </SectionContainer>
      <SectionContainer className="sm:!px-0">
        <CTASection
          title="Ready to get the data you need?"
          description="Leverage recent breakthroughs in zero knowledge computation by using verifyable and composable data in your application."
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

export default ProtocolsPage;
