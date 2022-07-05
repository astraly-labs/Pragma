import React from "react";
import { ChatIcon, CodeIcon } from "@heroicons/react/outline";
import CTASection from "../components/CTASection";
import PublisherSeciton from "../components/Publisher/PublisherSection";

const PublishersPage = () => {
  return (
    <div className="w-screen">
      <PublisherSeciton />
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
    </div>
  );
};

export default PublishersPage;
