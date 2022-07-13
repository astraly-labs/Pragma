import React from "react";
import Underline from "../common/Underline";

const FancyText = ({ text }: { text: string }) => (
  <span className="relative whitespace-nowrap text-indigo-600">
    <Underline className="absolute top-2/3 left-0 h-[0.45em] w-full fill-indigo-300/70" />
    <span className="relative">{text}</span>
  </span>
);

const Hero = () => (
  <header className="text-center">
    <h1 className="max-w-3xl text-5xl font-medium !leading-[1.1] tracking-tight text-slate-900 sm:text-7xl">
      <FancyText text="Decentralized" />
      {", "}
      <FancyText text="Transparent" />
      {" &"}
      <FancyText text="Composable" /> Data Infrastructure
    </h1>
    <p className="mt-10 max-w-3xl text-xl text-slate-700 sm:mt-12 sm:text-2xl">
      Live on StarkNet, in strategic partnership with
      <img
        className="mt-3 inline w-36 sm:ml-3 sm:mt-0 sm:w-44"
        src="/assets/starkware.svg"
        alt="Starkware"
      />
    </p>
  </header>
);

export default Hero;
