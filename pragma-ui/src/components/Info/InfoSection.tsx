import React from "react";
import classNames from "classnames";
import {
  BeakerIcon,
  ChipIcon,
  ShieldCheckIcon,
} from "@heroicons/react/outline";
import InfoCard, { InfoProps } from "./InfoCard";

const infoCards: InfoProps[] = [
  {
    title: "Robust feeds with verifiable data",
    icon: ShieldCheckIcon,
  },
  {
    title: "Cheap on-chain computation",
    icon: ChipIcon,
  },
  {
    title: "Freely composable data",
    icon: BeakerIcon,
  },
];

const blobBaseStyles =
  "absolute h-48 w-48 rounded-full opacity-70 mix-blend-multiply blur-lg filter md:h-64 md:w-64 animate-blob";

const blobSpecificStyles = [
  "top-0 -left-4 bg-blue-300",
  "top-0 -right-4 bg-purple-300 [animation-delay:2s]",
  "-bottom-8 left-20 bg-indigo-300 [animation-delay:4s]",
];

const InfoSection = () => (
  // Need an extra wrapper in order to properly display on Safari
  <div>
    <div className="grid w-full max-w-7xl grid-cols-2 place-items-center md:grid-cols-8">
      {<InfoCard title={infoCards[0].title} icon={infoCards[0].icon} />}
      <div className="col-span-2 md:col-span-1">
        <p className="font-mono text-7xl text-slate-400">+</p>
      </div>
      {<InfoCard title={infoCards[1].title} icon={infoCards[1].icon} />}
      <div className="col-span-2 md:col-span-1">
        <p className="font-mono text-7xl text-slate-400">=</p>
      </div>
      <div className="relative col-span-2 h-full w-full">
        {blobSpecificStyles.map((blob, i) => (
          <div
            className={classNames(blobBaseStyles, blob)}
            aria-hidden="true"
            key={i}
          />
        ))}
        {<InfoCard title={infoCards[2].title} icon={infoCards[2].icon} />}
      </div>
    </div>
  </div>
);

export default InfoSection;
