import React from "react";

interface Logo {
  name: string;
  src: string;
}

interface LogoCloudProps {
  title: string;
  logos: Logo[];
}

const LogoCloud: React.FC<LogoCloudProps> = ({ title, logos }) => (
  <figure className="mt-10 flex w-full max-w-7xl flex-row flex-wrap items-center sm:mt-20">
    <figcaption className="mb-4 basis-full text-xl uppercase tracking-wide text-slate-600 sm:mb-8 sm:text-2xl ">
      {title}
    </figcaption>
    <ul className="grid grid-cols-8 gap-8">
      {logos.map((logo, i) => (
        <li key={i} className="col-span-1 py-8">
          <img
            src={logo.src}
            alt={logo.name}
            className="m-auto h-auto w-full"
          />
        </li>
      ))}
    </ul>
  </figure>
);

export default LogoCloud;
