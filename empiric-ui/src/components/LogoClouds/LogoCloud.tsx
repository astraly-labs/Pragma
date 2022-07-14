import React from "react";
import classNames from "classnames";

export interface Logo {
  name: string;
  src: string;
  href: string;
}

interface LogoCloudProps {
  title: string;
  logos: Logo[];
}

const LogoCloud: React.FC<LogoCloudProps> = ({ title, logos }) => (
  <figure className="w-full max-w-7xl">
    <figcaption className="mb-2 text-sm uppercase tracking-wide text-slate-700 sm:text-2xl md:mb-5 md:text-base lg:text-lg ">
      {title}
    </figcaption>
    <ul className="flex w-full flex-wrap items-center justify-between">
      {logos.map(({ name, src, href }, i) => (
        <li key={i} className="py-4 px-4 lg:py-8">
          <a href={href}>
            <img
              src={src}
              alt={name}
              className={classNames("h-6 w-auto flex-shrink-0 md:h-10 lg:h-14")}
            />
          </a>
        </li>
      ))}
    </ul>
  </figure>
);

export default LogoCloud;
