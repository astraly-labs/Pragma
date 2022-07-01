import React from "react";
import Hero from "../components/Hero";
import AssetsSection from "../components/AssetsSection";
import ProvidersSection from "../components/ProvidersSection";
import AboutSection from "../components/AboutSection";
import Testimonial from "../components/Testimonial";
import CTASection from "../components/CTASection";

const IndexPage = () => {
  return (
    <div className="w-screen">
      <Hero />
      <AssetsSection />
      <ProvidersSection />
      <AboutSection />
      <Testimonial />
      <CTASection />
    </div>
  );
};

export default IndexPage;
