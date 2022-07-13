import React from "react";
import classNames from "classnames";

export interface Logo {
  name: string;
  src: string;
}

interface LogoCloudProps {
  title: string;
  logos: Logo[];
  square?: boolean;
}

const LogoCloud: React.FC<LogoCloudProps> = ({ title, logos, square }) => (
  <figure className="w-full max-w-7xl">
    <figcaption className="mb-2 text-xl uppercase tracking-wide text-slate-700 sm:text-2xl md:mb-5 ">
      {title}
    </figcaption>
    <ul className="flex w-full flex-wrap items-center justify-between">
      {logos.map((logo, i) => (
        <li key={i} className="px-4 py-4 lg:px-0">
          <img
            src={logo.src}
            alt={logo.name}
            className={classNames(
              "w-auto flex-shrink-0",
              square ? "h-16 md:h-20 lg:h-24" : "h-6 md:h-8 lg:h-10"
            )}
          />
        </li>
      ))}
    </ul>
  </figure>
);

export default LogoCloud;
