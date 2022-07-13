import React from "react";
import { CodeIcon, ChatIcon } from "@heroicons/react/outline";
import SectionContainer from "../components/common/SectionContainer";
import Heading from "../components/Heading";
import CTASection from "../components/CTASection";
import TeamSection from "../components/Team/TeamSection";

const AboutPage = () => {
  return (
    <div className="w-screen">
      <SectionContainer className="bg-slate-50">
        <Heading
          title="Developed by experts"
          subtitle="Meet our team"
          text="At Pontis we are building a culture around bright people that want to move fast and embrace honest feedback."
          href="#"
          hrefText="In fact, give us feedback right now"
        />
        <TeamSection />
      </SectionContainer>
      <SectionContainer>
        <Heading title="Backed by" subtitle="Meet our investors" />
        <TeamSection />
      </SectionContainer>
      <SectionContainer className="sm:!px-0">
        <CTASection
          title="Looking for a way to get involved?"
          description="If you’re looking for somewhere you can learn quickly and make a meaningful impact in a fast-paced company, you’re in the right place."
          mainAction={{
            href: "mailto:oskar@42labs.xyz?body=Hi%20Oskar,",
            actionText: "Reach out to us",
            icon: ChatIcon,
          }}
          secondaryAction={{
            href: "https://docs.empiric.network/quickstart",
            actionText: "Read the docs",
            icon: CodeIcon,
          }}
        />
      </SectionContainer>
    </div>
  );
};

export default AboutPage;
