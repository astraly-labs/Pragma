import Image from "next/image";
import React from "react";

export interface SimpleLogo {
  name: string;
  src: string;
}

export interface Logo extends SimpleLogo {
  href: string;
}

interface LogoCloudProps {
  title: string;
  logos: Logo[];
}

const LogoCloud: React.FC<LogoCloudProps> = ({ title, logos }) => (
  <figure className="w-full max-w-7xl">
    <figcaption className="mb-2 text-sm uppercase tracking-wide text-white sm:text-2xl md:mb-5 md:text-base lg:text-lg ">
      {title}
    </figcaption>
    <ul className="flex w-full flex-wrap items-center justify-between">
      {logos.map(({ name, src, href }, i) => (
        <li key={i} className="basis-1/2 py-4 px-3 md:basis-1/4 lg:py-8">
          <a href={href}>
            <Image
              src={src}
              alt={name}
              className="mx-auto h-6 w-auto flex-shrink-0 md:h-10 lg:h-14"
            />
          </a>
        </li>
      ))}
    </ul>
  </figure>
);

export default LogoCloud;
