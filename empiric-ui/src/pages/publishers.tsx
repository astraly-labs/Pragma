import React from "react";
import { ChatIcon, CodeIcon } from "@heroicons/react/outline";
import SectionContainer from "../components/common/SectionContainer";
import Heading from "../components/Heading";
import CTASection from "../components/CTASection";
import PublishersSeciton from "../components/Publisher/PublishersSection";

const PublishersPage = () => {
  return (
    <div className="w-screen">
      <SectionContainer className="bg-slate-50" first>
        <Heading
          title="Your favorite giants"
          subtitle="Meet our publishers"
          text="At Empiric, we care about the integrity of our data. We ensure that only high quality data publishers join this list."
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
            href: "mailto:hello@42labs.xyz?body=Hi%20Empiric%20Team,%0AWe%20have%20high-quality%20data%20and%20would%20like%20to%20provide%20it%20to%20your%20network%20of%20cutting-edge%20zk%20protocols.",
            actionText: "Become a publisher",
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

export default PublishersPage;
