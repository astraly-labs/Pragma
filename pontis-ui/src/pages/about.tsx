import React from "react";
import { CodeIcon, ChatIcon } from "@heroicons/react/outline";
import CTASection from "../components/CTASection";
import TeamSection from "../components/Team/TeamSection";

const AboutPage = () => {
  return (
    <div className="w-screen">
      <TeamSection />
      <CTASection
        title="Looking for a way to get involved?"
        description="If you’re looking for somewhere you can learn quickly and make a meaningful impact in a fast-paced company, you’re in the right place."
        mainAction={{
          href: "mailto:oskar@42labs.xyz?body=Hi%20Oskar,",
          actionText: "Reach out to us",
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

export default AboutPage;
