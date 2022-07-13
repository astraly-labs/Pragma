import React from "react";
import { Logo } from "./LogoCloud";

const angels: Logo[] = [
  { name: "Marc Bhargava", src: "/assets/angels/coinbase.svg" },
  {
    name: "Luke Pearson",
    src: "/assets/angels/polychain-capital.svg",
  },
  {
    name: "Will Haering",
    src: "/assets/angels/ponto.png",
  },
  {
    name: "Max Kleiman-Weiner",
    src: "/assets/angels/sequoia.svg",
  },
  {
    name: "Hossein Kakavand",
    src: "/assets/angels/luther-systems.png",
  },
  {
    name: "Maik Wehmeyer",
    src: "/assets/angels/taktile.png",
  },
  {
    name: "Maximilian Eber",
    src: "/assets/angels/taktile.png",
  },
  {
    name: "Thomas Bailey",
    src: "/assets/angels/road-capital.png",
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
              className="h-5 grayscale group-hover:grayscale-0"
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
