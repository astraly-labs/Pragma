import React from "react";
import Hero from "../components/Hero";
import AssetsSection from "../components/AssetsSection";
import ProvidersSection from "../components/ProvidersSection";
import ActionsSection from "../components/ActionsSection";
import AboutSection from "../components/AboutSection";

const IndexPage = () => {
  return (
    <div className="w-screen">
      <Hero />
      <AssetsSection />
      <ProvidersSection />
      <AboutSection />
      <ActionsSection />
    </div>
  );
};

export default IndexPage;
