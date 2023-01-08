import React from "react";
import { NextSeo } from "next-seo";
import { CodeIcon, ChatIcon } from "@heroicons/react/outline";
import SectionContainer from "../components/common/SectionContainer";
import Heading from "../components/Heading";
import CTASection from "../components/CTASection";
import TeamSection from "../components/TeamSection";
import InvestorsSection from "../components/InvestorsSection";
import AngelsSection from "../components/AngelsSection";

const AboutPage = () => (
  <>
    <NextSeo title="About" />
    <div className="w-screen">
      <SectionContainer className="bg-slate-50" first>
        <Heading
          title="Developed by experts"
          subtitle="Meet our team"
          text="Behind Empiric is a close-knit team of bright people who move fast to build a more transparent and decentralized future."
        />
        {/* <TeamSection /> */}
      </SectionContainer>
      <SectionContainer>
        <Heading title="Backed by" subtitle="Meet our investors" />
        <InvestorsSection />
        {/* <AngelsSection /> */}
      </SectionContainer>
      <SectionContainer>
        <CTASection
          title="Looking for a way to get involved?"
          description="If you’re looking for somewhere you can learn quickly and make a meaningful impact in a fast-paced company, you’re in the right place."
          mainAction={{
            href: "mailto:hello@42labs.xyz?body=Hi%20Empiric-Team,",
            actionText: "Reach out to us",
            icon: ChatIcon,
          }}
          secondaryAction={{
            href: "https://docs.empiric.network/",
            actionText: "Read the docs",
            icon: CodeIcon,
          }}
        />
      </SectionContainer>
    </div>
  </>
);

export default AboutPage;
