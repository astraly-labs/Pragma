import React from "react";
import Header from "./Header";

const Hero = () => (
  <div className="w-screen bg-slate-50 px-6 pb-40 pt-12 sm:px-24 sm:pt-24 md:px-32 md:pt-32">
    <Header
      title="Introducing Pontis"
      subtitle="The zk-Oracle"
      text="Pontis is the leading oracle on Starknet, built to empower native protocols to realize their ambitious potential."
      href="#"
      hrefText="Get verifyable data for your project"
    />
  </div>
);

export default Hero;
