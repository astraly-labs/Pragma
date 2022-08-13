import React from "react";
import { Logo } from "./LogoClouds/LogoCloud";

const investors: Logo[] = [
  {
    name: "Variant Fund",
    src: "/assets/investors/variant.webp",
    href: "https://variant.fund/",
  },
  {
    name: "Dao5",
    src: "/assets/investors/dao5.webp",
    href: "https://dao5.com/",
  },
  {
    name: "Robot Ventures",
    src: "/assets/investors/robot-ventures.webp",
    href: "https://robvc.com/",
  },
  {
    name: "Alameda Research",
    src: "/assets/publishers/alameda.webp",
    href: "https://www.alameda-research.com/",
  },
  {
    name: "Jane Street",
    src: "/assets/publishers/jane-street.webp",
    href: "https://www.janestreet.com/",
  },
  {
    name: "FTX",
    src: "/assets/publishers/ftx.svg",
    href: "https://ftx.us/",
  },
  {
    name: "StarkWare",
    src: "/assets/starkware.svg",
    href: "https://starkware.co/",
  },
  {
    name: "Gemini",
    src: "/assets/publishers/gemini.svg",
    href: "https://www.gemini.com/",
  },
];

const InvestorsSection = () => (
  <div className="w-full max-w-7xl">
    <div className="grid grid-cols-2 gap-1 md:grid-cols-3 lg:grid-cols-4">
      {investors.map(({ name, src, href }) => (
        <div
          key={name}
          className="group col-span-1 flex justify-center bg-gray-100 px-4 py-8 sm:p-4"
        >
          <a href={href}>
            <img
              className="h-auto max-h-12 w-auto max-w-full grayscale group-hover:grayscale-0"
              src={src}
              alt={name}
            />
          </a>
        </div>
      ))}
    </div>
  </div>
);

export default InvestorsSection;
