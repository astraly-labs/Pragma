import React from "react";
import classNames from "classnames";
import { Tab } from "@headlessui/react";
import { Protocol, protocolCategories } from "./ProtocolSection";
import ProtocolCard from "./ProtocolCard";

interface ProtocolTabsProps {
  protocols: Protocol[];
}

const ProtocolTabs: React.FC<ProtocolTabsProps> = ({ protocols }) => (
  <Tab.Group>
    <div className="sticky top-0 z-20 flex h-28 justify-center border-b border-slate-200 bg-white/95 [@supports(backdrop-filter:blur(0))]:bg-white/80 [@supports(backdrop-filter:blur(0))]:backdrop-blur">
      <Tab.List className="-mb-[2px] grid auto-cols-[minmax(0,15rem)] grid-flow-col text-base font-medium text-slate-900 lg:text-lg">
        {protocolCategories.map((category) => (
          <Tab
            key={category}
            className={({ selected }) =>
              classNames(
                selected
                  ? "border-indigo-600 bg-slate-50 text-indigo-600"
                  : "border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700",
                "flex w-full flex-col items-center justify-center border-b-2 focus:outline-0"
              )
            }
          >
            {category}
          </Tab>
        ))}
      </Tab.List>
    </div>
    <Tab.Panels>
      {protocolCategories.map((category) => (
        <Tab.Panel key={category}>
          <ul className="mx-auto mt-16 grid max-w-2xl grid-cols-2 gap-6 sm:grid-cols-3 lg:max-w-none lg:grid-cols-4 lg:gap-8">
            {protocols
              .filter(
                (protocol) =>
                  protocol.category === category || category === "All"
              )
              .map(({ name, category, src, description, href }) => (
                <li key={name}>
                  <ProtocolCard
                    name={name}
                    category={category}
                    description={description}
                    src={src}
                    href={href}
                  />
                </li>
              ))}
          </ul>
        </Tab.Panel>
      ))}
    </Tab.Panels>
  </Tab.Group>
);

export default ProtocolTabs;
