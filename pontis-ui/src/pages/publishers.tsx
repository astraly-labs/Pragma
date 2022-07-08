import React from "react";
import { ChatIcon, CodeIcon } from "@heroicons/react/outline";
import SectionContainer from "../components/common/SectionContainer";
import Header from "../components/Header";
import CTASection from "../components/CTASection";
import PublishersSeciton from "../components/Publisher/PublishersSection";

const PublishersPage = () => {
  return (
    <div className="w-screen">
      <SectionContainer className="bg-slate-50">
        <Header
          title="Your favorite giants"
          subtitle="Meet our publishers"
          text="At Pontis, we care about the integrity of our data. We ensure that only high quality data publishers join this list."
          href="#"
          hrefText="Find out how you can become a publisher"
        />
        <PublishersSeciton />
      </SectionContainer>
      <SectionContainer className="sm:!px-0">
        <CTASection
          title="Interested in becoming a publisher?"
          description="We'd love to have you onboard. Shoot us an email and we will help you figure out what is best for you."
          mainAction={{
            href: "mailto:oskar@42labs.xyz?body=Hi%20Oskar,",
            actionText: "Become a publisher",
            icon: ChatIcon,
          }}
          secondaryAction={{
            href: "/",
            actionText: "Read the docs",
            icon: CodeIcon,
          }}
        />
      </SectionContainer>
    </div>
  );
};

export default PublishersPage;
