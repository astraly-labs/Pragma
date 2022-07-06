import React from "react";
import SearchCTA from "./SearchCTA";

const providers = [
  "cmtdigital",
  "bitstamp",
  "cex",
  "coinbase",
  "coingecko",
  "ftx",
  "gemini",
];

const ProvidersSection = () => (
  <div className="w-screen bg-slate-50 px-6 pb-40 sm:px-24 md:px-32">
    <div className="-translate-y-1/2">
      <SearchCTA />
    </div>
    <div className="mx-auto mt-10 flex w-full max-w-7xl flex-row flex-wrap items-center sm:mt-20">
<<<<<<< HEAD
      <div className="mb-4 basis-full text-xl uppercase tracking-wide text-slate-600 sm:mb-8 sm:text-2xl ">
=======
      <div className="mb-4 max-w-7xl basis-full text-xl uppercase tracking-wide text-slate-600 sm:mb-8 sm:text-2xl ">
>>>>>>> ui-v1.0
        Data from
      </div>
      {providers.map((provider, i) => (
        <div key={i} className="basis-1/3 py-8 lg:basis-1/4">
          <img
            src={`/assets/providers/${provider}.svg`}
            alt={`${provider} logo`}
            className="m-auto w-24 md:w-32 lg:w-40"
          />
        </div>
      ))}
    </div>
  </div>
);

export default ProvidersSection;
