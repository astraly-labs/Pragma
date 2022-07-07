import React from "react";
import SearchCTA from "./SearchCTA";

const providerLogos = [
  "cmtdigital.svg",
  "bitstamp.svg",
  "cex.svg",
  "coinbase.svg",
  "coingecko.svg",
  "ftx.svg",
  "gemini.svg",
];

const ProvidersSection = () => (
  <>
    <div className="-translate-y-1/2">
      <SearchCTA />
    </div>
    <div className="mx-auto mt-10 flex w-full max-w-7xl flex-row flex-wrap items-center sm:mt-20">
      <div className="mb-4 basis-full text-xl uppercase tracking-wide text-slate-600 sm:mb-8 sm:text-2xl ">
        Data from
      </div>
      {providerLogos.map((provider, i) => (
        <div key={i} className="basis-1/3 py-8 lg:basis-1/4">
          <img
            src={`/assets/providers/${provider}`}
            alt={`${provider}`}
            className="m-auto w-24 md:w-32 lg:w-40"
          />
        </div>
      ))}
    </div>
  </>
);

export default ProvidersSection;
