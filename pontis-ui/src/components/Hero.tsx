import React from "react";

export const Hero = () => {
  return (
    <section className="py-40 px-6 sm:px-24 md:px-32 bg-slate-50 w-screen">
      <div className="mx-auto w-full sm:max-w-md md:max-w-3xl">
        <p className="uppercase text-large sm:text-2xl text-slate-600 tracking-wide mb-2 md:mb-4">
          Pontis
        </p>
        <h1 className="text-5xl font-medium tracking-tight text-slate-900 sm:text-6xl md:text-7xl sm:leading-tight mb-4 md:mb-6">
          The zk-Oracle
        </h1>
        <p className="mx-auto text-base text-slate-600 sm:text-xl">
          Pontis is the leading oracle on Starknet, built to empower native
          protocols to realize their ambitious potential.
        </p>
      </div>
    </section>
  );
};
