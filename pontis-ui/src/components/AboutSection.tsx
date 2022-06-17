import React, { ReactElement } from "react";
import Header from "./Header";

import { LockOutlined, ApiOutlined, CheckOutlined } from "@ant-design/icons";

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
    icon: <CheckOutlined />,
  },
  {
    name: "Compose",
    description:
      "Pontis allows anyone to flexibly compose that verified data, without sacrificing security or transparency. For instance, protocols are using Pontis to create a verifiable, dynamic yield curve and options pricing.",
    icon: <ApiOutlined />,
  },
  {
    name: "Robustness",
    description:
      "Pontis has no off-chain infrastructure, eliminating an entire class of attack vectors. All sources sign and timestamp their data and post directly to Starknet.",
    icon: <LockOutlined />,
  },
];

const AboutSection: React.FC = () => {
  return (
    <section className="w-screen bg-white py-40 px-6 sm:px-24 md:px-32">
      <Header
        title="Reimagining Oracles"
        subtitle="Why Pontis?"
        text="Pontis is the first oracle live on Starknet. Built zk-first from the ground up, we are enabling anything from exchanges, stable coins to prediction markets."
      />
      <div className="mt-28 grid grid-cols-1 gap-16 sm:grid-cols-2 lg:grid-cols-3">
        {content.map((feature, i) => (
          <div
            key={i}
            className="col-span-1 flex flex-col items-center space-y-6 rounded-xl bg-slate-50 px-8 pb-12"
          >
            <div className="-mt-8 rounded-xl bg-slate-300 p-3 text-slate-700 shadow-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 "
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
                <path d="M5 8v-3a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2h-5"></path>
                <circle cx="6" cy="14" r="3"></circle>
                <path d="M4.5 17l-1.5 5l3 -1.5l3 1.5l-1.5 -5"></path>
              </svg>
            </div>
            <h4 className="text-lg font-medium text-slate-700 sm:text-2xl">
              {feature.name}
            </h4>
            <p className="prose prose-slate lg:prose-xl">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutSection;
