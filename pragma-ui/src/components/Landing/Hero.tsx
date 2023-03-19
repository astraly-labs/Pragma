import React from "react";
import Underline from "../common/Underline";

const Hero = () => (
  <header className="text-center md:py-8 lg:py-10">
    <h1 className="max-w-7xl text-3xl font-medium !leading-[1.2] tracking-tight text-slate-900 md:text-5xl lg:text-7xl">
      <span className="relative text-indigo-600 md:whitespace-nowrap">
        <Underline className="absolute top-2/3 left-0 hidden h-[0.45em] w-full fill-indigo-300/70 md:block" />
        <span className="relative">Decentralized &amp; Composable</span>
      </span>
      <br />
      Data Infrastructure
    </h1>
    <p className="mt-10 max-w-7xl text-xl text-slate-700 sm:mt-12 sm:text-2xl">
      In strategic partnership with
      <img
        className="mt-3 inline w-36 sm:ml-3 sm:mt-0 sm:w-44"
        src="/assets/starkware.svg"
        alt="Starkware"
      />
    </p>
  </header>
);

export default Hero;
