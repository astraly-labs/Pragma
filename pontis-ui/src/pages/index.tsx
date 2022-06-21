import React from "react";
import Hero from "../components/Hero";
import AssetsSection from "../components/AssetsSection";
import ProvidersSection from "../components/ProvidersSection";
import ActionsSection from "../components/ActionsSection";
import AboutSection from "../components/AboutSection";
import CommandPallate from "../components/CommandPallate";

const IndexPage = () => {
  return (
    <div className="w-screen">
      <CommandPallate />
      <Hero />
      <AssetsSection />
      <ProvidersSection />
      <AboutSection />
      <ActionsSection />
    </div>
  );
};

export default IndexPage;
