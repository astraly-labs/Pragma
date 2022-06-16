import React from "react";

const providers = [
  "bitstamp",
  "cex",
  "coinapi",
  "coinbase",
  "coingecko",
  "coinmarketcap",
  "ftx",
  "gemini",
];

const ProvidersSection = () => {
  return (
    <section className="w-screen bg-slate-50 py-40 px-6 sm:px-24 md:px-32">
      <div className="mx-auto flex w-full max-w-7xl  flex-row flex-wrap items-center">
        <div className="mb-4 max-w-7xl basis-full text-xl uppercase tracking-wide text-slate-600 sm:mb-8 sm:text-2xl ">
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
    </section>
  );
};

export default ProvidersSection;
