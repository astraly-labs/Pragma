import React from "react";
import { Logo } from "./LogoCloud";

interface LogoProps {
  title: string;
  logos: Logo[];
}

const Marquee: React.FC<LogoProps> = ({ title, logos }) => (
  <figure className="w-full max-w-7xl overflow-x-hidden">
    <figcaption className="mb-2 text-xl uppercase tracking-wide text-slate-700 sm:text-2xl md:mb-5">
      {title}
    </figcaption>
    <div className="relative flex w-max overflow-x-hidden">
      <ul className="flex animate-marquee flex-nowrap space-x-6 py-4 md:space-x-8 lg:space-x-10">
        {logos.map((logo, i) => (
          <li key={i}>
            <img
              src={logo.src}
              alt={logo.name}
              className="h-6 w-auto flex-shrink-0 md:h-8 lg:h-10"
            />
          </li>
        ))}
      </ul>
      <ul
        className="absolute top-0 flex animate-marquee2 flex-nowrap items-center space-x-6 whitespace-nowrap py-4 pl-6 md:space-x-8 md:pl-8 lg:space-x-10 lg:pl-10"
        aria-hidden="true"
      >
        {logos.map((logo, i) => (
          <li key={i}>
            <img
              src={logo.src}
              alt={logo.name}
              className="h-6 w-auto flex-shrink-0 md:h-8 lg:h-10"
            />
          </li>
        ))}
      </ul>
    </div>
  </figure>
);

export default Marquee;
