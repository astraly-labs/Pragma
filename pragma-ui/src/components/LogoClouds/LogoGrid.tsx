import React from "react";
import classNames from "classnames";
import { Logo } from "./LogoCloud";

interface LogoCloudProps {
  title: string;
  logos: Logo[];
}

const LogoGrid: React.FC<LogoCloudProps> = ({ title, logos }) => (
  <figure className="w-full max-w-7xl">
    <figcaption className="mb-2 text-sm uppercase tracking-wide text-white sm:text-base md:mb-5 md:text-lg ">
      {title}
    </figcaption>
    <ul className="grid grid-cols-2 place-items-center md:grid-cols-4">
      {logos.map(({ name, src, href }, i) => (
        <li key={i} className="col-span-1 py-4 px-4 lg:py-8">
          <a href={href}>
            <img
              src={src}
              alt={name}
              className={classNames("h-6 w-auto flex-shrink-0 md:h-10 lg:h-10")}
            />
          </a>
        </li>
      ))}
    </ul>
  </figure>
);

export default LogoGrid;
