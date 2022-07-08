import React, { ReactElement } from "react";

import {
  CheckIcon,
  BeakerIcon,
  LockClosedIcon,
} from "@heroicons/react/outline";

interface feature {
  name: string;
  description: string;
  icon: ReactElement;
}

const content: feature[] = [
  {
    name: "Verify Data",
    description:
      "Our data sources directly sign their data and bring it on-chain. From there, Pontis leverages zk compute to aggregate that data with total transparency and robustness.",
    icon: <CheckIcon />,
  },
  {
    name: "Compose",
    description:
      "Pontis allows anyone to flexibly compose that verified data, without sacrificing security or transparency. For instance, protocols are using Pontis to create the first entirely on-chain, verifiable and dynamic yield curve.",
    icon: <BeakerIcon />,
  },
  {
    name: "Robustness",
    description:
      "Pontis has no off-chain infrastructure, eliminating an entire class of attack vectors. All sources sign and timestamp their data and post directly to Starknet.",
    icon: <LockClosedIcon />,
  },
];

const FeatureSection: React.FC = () => (
  <div className="grid w-full max-w-7xl grid-cols-1 gap-16 pt-8 sm:grid-cols-2 lg:grid-cols-3">
    {content.map((feature, i) => (
      <div
        key={i}
        className="col-span-1 flex flex-col items-center space-y-6 rounded-lg bg-slate-50 px-8 pb-12"
      >
        <div className="-mt-8 rounded-lg bg-indigo-500 p-3 text-slate-100 shadow-md">
          {React.cloneElement(feature.icon, { className: "w-8 h-8" })}
        </div>
        <h4 className="text-xl font-medium text-slate-700 sm:text-2xl">
          {feature.name}
        </h4>
        <p className="prose prose-slate lg:prose-xl">{feature.description}</p>
      </div>
    ))}
  </div>
);

export default FeatureSection;
