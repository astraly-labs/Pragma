import React from "react";
import { Logo } from "./LogoCloud";

const investors: Logo[] = [
  { name: "Variant Fund", src: "/assets/investors/variant.svg" },
  {
    name: "Dao5",
    src: "/assets/investors/dao5.webp",
  },
  {
    name: "Robotventures",
    src: "/assets/investors/robotventures.png",
  },
  {
    name: "Alameda Research",
    src: "/assets/publishers/alameda.png",
  },
  {
    name: "Jane Street",
    src: "/assets/publishers/jane-street.png",
  },
  {
    name: "Portofino",
    src: "/assets/currencies/fallback.svg",
  },
  {
    name: "FTX",
    src: "/assets/publishers/ftx.svg",
  },
  {
    name: "Gemini",
    src: "/assets/publishers/gemini.svg",
  },
];

const InvestorsSection = () => (
  <div className="w-full max-w-7xl">
    <div className="grid grid-cols-2 gap-1 md:grid-cols-3 lg:grid-cols-4">
      {investors.map(({ name, src }) => (
        <div
          key={name}
          className="group col-span-1 flex justify-center bg-gray-100 p-8 sm:p-4"
        >
          <div>
            <img
              className="h-auto max-h-12 w-auto max-w-full grayscale group-hover:grayscale-0"
              src={src}
              alt={name}
            />
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default InvestorsSection;
