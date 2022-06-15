import React from "react";
import AssetsSection from "../components/AssetsSection";
import { Hero } from "../components/Hero";

const IndexPage = () => {
  return (
    <div className="w-screen">
      <Hero />
      <AssetsSection />
    </div>
  );
};

export default IndexPage;
