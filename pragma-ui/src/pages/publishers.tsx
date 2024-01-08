import React from "react";
import { NextSeo } from "next-seo";
import { ChatIcon, CodeIcon } from "@heroicons/react/outline";
import Heading from "../components/Heading";
import CTASection from "../components/CTASection";
import BoxContainer from "../components/common/BoxContainer";

const PublishersPage = () => (
  <>
    <NextSeo title="Publishers" />
    <div className="w-full">
      <BoxContainer className="bg-dark">
        <Heading
          title="Your favorite giants"
          subtitle="Meet our publishers"
          text="At Pragma, we care about the integrity of our data. We ensure that only high quality data publishers join this list."
          href="mailto:support@pragmaoracle.com?body=Hi%Pragma%20Team,%0AWe%20have%20high-quality%20data%20and%20would%20like%20to%20provide%20it%20to%20your%20network."
          hrefText="Find out how you can become a publisher"
        />
      </BoxContainer>
      <BoxContainer className="bg-black">
        <CTASection
          title="Interested in becoming a publisher?"
          description="We'd love to have you onboard. Shoot us an email and we will help you figure out what is best for you."
          mainAction={{
            href: "mailto:support@pragmaoracle.com?body=Hi%Pragma%20Team,%0AWe%20have%20high-quality%20data%20and%20would%20like%20to%20provide%20it%20to%20your%20network.",
            actionText: "Become a publisher",
            icon: ChatIcon,
          }}
          secondaryAction={{
            href: "https://docs.pragmaoracle.com/docs/introduction",
            actionText: "Read the docs",
            icon: CodeIcon,
          }}
        />
      </BoxContainer>
    </div>
  </>
);

export default PublishersPage;
