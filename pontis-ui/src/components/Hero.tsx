import React from "react";
import Header from "./Header";

const Hero = () => {
  return (
    <section className="w-screen bg-slate-50 py-40 px-6 sm:px-24 md:px-32">
      <Header
        title="The zk-Oracle"
        subtitle="Pontis"
        text="Pontis is the leading oracle on Starknet, built to empower native protocols to realize their ambitious potential."
      />
      {/* <div className="mx-auto w-full md:max-w-3xl">
        <p className="text-large mb-2 uppercase tracking-wide text-slate-600 sm:text-2xl md:mb-4">
          Pontis
        </p>
        <h1 className="mb-4 text-5xl font-medium tracking-tight text-slate-900 sm:text-6xl sm:leading-tight md:mb-6 md:text-7xl">
          The zk-Orcacle
        </h1>
        <p className="prose prose-slate lg:prose-xl">
          Pontis is the leading oracle on Starknet, built to empower native
          protocols to realize their ambitious potential.
        </p>
      </div> */}
    </section>
  );
};

export default Hero;
