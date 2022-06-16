import React from "react";
import Hero from "../components/Hero";
import AssetsSection from "../components/AssetsSection";
import ProvidersSection from "../components/ProvidersSection";

const IndexPage = () => {
  return (
    <div className="w-screen">
      <Hero />
      <AssetsSection />
      <ProvidersSection />
    </div>
  );
};

export default IndexPage;
