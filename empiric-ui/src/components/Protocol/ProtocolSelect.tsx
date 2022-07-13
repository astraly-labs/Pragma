import React, { useState, Fragment } from "react";
import classNames from "classnames";
import { Listbox } from "@headlessui/react";
import { SelectorIcon, CheckIcon } from "@heroicons/react/outline";
import { Protocol, protocolCategories } from "./ProtocolSection";
import ProtocolCard from "./ProtocolCard";
import StyledTransition from "../common/StyledTransition";

interface ProtocolSelectProps {
  protocols: Protocol[];
}

const ProtocolSelect: React.FC<ProtocolSelectProps> = ({ protocols }) => {
  const [selectedCategory, setSelectedCategory] = useState(
    protocolCategories[0]
  );
  return (
    <>
      <Listbox value={selectedCategory} onChange={setSelectedCategory}>
        <div className="sticky top-0">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white/95 py-3 px-4 text-left shadow-lg [@supports(backdrop-filter:blur(0))]:bg-white/80 [@supports(backdrop-filter:blur(0))]:backdrop-blur">
            <span className="block truncate text-lg text-slate-900">
              {selectedCategory}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
              <SelectorIcon
                className="h-5 w-5 text-slate-600"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <StyledTransition
            enterFrom="-translate-y-1"
            enterTo="translate-0"
            leaveFrom="translate-0"
            leaveTo="-translate-y-1"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white/95 py-1 text-base shadow-lg ring-1 ring-slate-900/5 focus:outline-none [@supports(backdrop-filter:blur(0))]:bg-white/80 [@supports(backdrop-filter:blur(0))]:backdrop-blur">
              {protocolCategories.map((category) => (
                <Listbox.Option
                  key={category}
                  className={({ active }) =>
                    classNames(
                      "relative cursor-default select-none py-2 pl-10 pr-4",
                      active ? "bg-slate-100 text-indigo-600" : "text-slate-900"
                    )
                  }
                  value={category}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={classNames(
                          "block truncate",
                          selected ? "font-medium" : "font-normal"
                        )}
                      >
                        {category}
                      </span>
                      {selected && (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      )}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </StyledTransition>
        </div>
      </Listbox>
      <ul className="mx-auto mt-8 grid max-w-2xl grid-cols-2 gap-6 sm:grid-cols-3 lg:max-w-none lg:grid-cols-4 lg:gap-8">
        {protocols
          // Uncomment to enable category filtering
          // .filter(
          //   (protocol) =>
          //     protocol.category === selectedCategory ||
          //     selectedCategory === "All"
          // )
          .map(({ name, category, src, description }) => (
            <li key={name}>
              <ProtocolCard
                name={name}
                description={description}
                src={src}
                category={category}
              />
            </li>
          ))}
      </ul>
    </>
  );
};

export default ProtocolSelect;
