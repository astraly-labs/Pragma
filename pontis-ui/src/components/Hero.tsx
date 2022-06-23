import React from "react";
import Header from "./Header";

const Hero = () => (
  <div className="w-screen bg-slate-50 py-40 px-6 sm:px-24 md:px-32">
    <Header
      title="Introducing Pontis"
      subtitle="The zk-Oracle"
      text="Pontis is the leading oracle on Starknet, built to empower native protocols to realize their ambitious potential."
    />
  </div>
);

export default Hero;
