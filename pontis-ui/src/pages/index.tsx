import React from "react";
import Hero from "../components/Hero";
import AssetsSection from "../components/AssetsSection";
import ProvidersSection from "../components/ProvidersSection";
import AboutSection from "../components/AboutSection";
import Testimonial from "../components/Testimonial";
import CTASection from "../components/CTASection";
import Code from "../components/Code/Code";
import { ChatIcon, CodeIcon } from "@heroicons/react/outline";

const IndexPage = () => {
  return (
    <div className="w-screen">
      <Hero />
      <AssetsSection />
      <ProvidersSection />
      <AboutSection />
      <Testimonial />
      <Code />
      <CTASection
        title="Ready to get the data you need?"
        description="Leverage recent breakthroughs in zero knowledge computation by using verifyable and composable data in your application."
        mainAction={{ href: "/", actionText: "Read the docs", icon: CodeIcon }}
        secondaryAction={{
          href: "mailto:oskar@42labs.xyz?body=Hi%20Oskar,",
          actionText: "Request asset",
          icon: ChatIcon,
        }}
      />
    </div>
  );
};

export default IndexPage;
