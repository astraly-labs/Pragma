import React from "react";
import classNames from "classnames";

export interface Logo {
  name: string;
  src: string;
}

interface LogoCloudProps {
  title: string;
  logos: Logo[];
}

const LogoGrid: React.FC<LogoCloudProps> = ({ title, logos }) => (
  <figure className="w-full max-w-7xl">
    <figcaption className="mb-2 text-xl uppercase tracking-wide text-slate-700 sm:text-2xl md:mb-5 ">
      {title}
    </figcaption>
    <ul className="grid grid-cols-2 place-items-center border-y border-slate-300 md:grid-cols-3">
      {logos.map(({ name, src }, i) => (
        <li key={i} className="col-span-1 py-4 px-4 lg:py-8">
          <img
            src={src}
            alt={name}
            className={classNames("h-6 w-auto flex-shrink-0 md:h-10 lg:h-14")}
          />
        </li>
      ))}
    </ul>
  </figure>
);

export default LogoGrid;
