import React from "react";
import { SimpleLogo } from "./LogoClouds/LogoCloud";

const angels: SimpleLogo[] = [
  {
    name: "Sandeep Nailwal",
    src: "/assets/angels/polygon.webp",
  },
  { name: "Marc Bhargava", src: "/assets/angels/coinbase.svg" },
  {
    name: "Luke Pearson",
    src: "/assets/angels/polychain-capital.svg",
  },
  {
    name: "Will Haering",
    src: "/assets/angels/ponto.webp",
  },
  {
    name: "Brendan Farmer",
    src: "/assets/angels/polygon.webp",
  },
  {
    name: "Hossein Kakavand",
    src: "/assets/angels/luther-systems.webp",
  },
  {
    name: "Max Kleiman-Weiner",
    src: "/assets/angels/sequoia.svg",
  },
  {
    name: "Maik Wehmeyer",
    src: "/assets/angels/taktile.webp",
  },
  {
    name: "Maximilian Eber",
    src: "/assets/angels/taktile.webp",
  },
  {
    name: "Thomas Bailey",
    src: "/assets/angels/road-capital.webp",
  },
  {
    name: "Sina Habibian",
    src: "/assets/angels/ethereum-foundation.webp",
  },
  {
    name: "Alan Curtis",
    src: "/assets/angels/radar.webp",
  },
  {
    name: "Tim Beiko",
    src: "/assets/angels/ethereum-foundation.webp",
  },
  {
    name: "Anthony Sassano",
    src: "/assets/angels/ethereum-foundation.webp",
  },
  {
    name: "Julien Niset",
    src: "/assets/angels/argent.webp",
  },
  {
    name: "Itamar Lesuisse",
    src: "/assets/angels/argent.webp",
  },
  {
    name: "Eric Wall",
    src: "/assets/angels/starknet.webp",
  },
  {
    name: "Teemu Paivinen",
    src: "/assets/angels/equilibrium.webp",
  },
];

const AngelsSection = () => (
  <div className="w-full max-w-7xl">
    <div className="grid grid-cols-2 gap-1 md:grid-cols-3 lg:grid-cols-6">
      {angels.map(({ name, src }) => (
        <figure
          key={name}
          className="group col-span-1 flex flex-col items-center bg-gray-100 p-8 px-3 sm:py-8"
        >
          <div>
            <img
              className="h-5 grayscale group-hover:grayscale-0 sm:h-6"
              src={src}
              alt={name}
            />
          </div>
          <figcaption className="mt-4 text-center text-lg text-slate-900">
            {name}
          </figcaption>
        </figure>
      ))}
    </div>
  </div>
);

export default AngelsSection;
