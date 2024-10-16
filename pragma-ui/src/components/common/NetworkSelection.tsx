import React, { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import Image from "next/image";

const NetworkSelection = ({ setNetwork }) => {
  const NETWORKS = ["sepolia", "mainnet","pragmaDevnet"];
  const [definedNetwork, setDefinedNetwork] = useState<string>("sepolia");

  const setConfigurationNetwork = (network) => {
    setDefinedNetwork(network);
    setNetwork(network);
  };
  return (
    <Listbox value={definedNetwork} onChange={setConfigurationNetwork}>
      <div className="relative">
        <Listbox.Button className="relative flex cursor-pointer flex-row justify-center rounded-full border border-lightBlur py-3 px-6 text-center text-sm text-lightGreen focus:outline-none">
          <span className="block truncate">{definedNetwork}</span>
          <Image
            className="my-auto pl-2"
            height={16}
            width={16}
            alt="arrowDown"
            src="/assets/vectors/arrowDown.svg"
          />
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto	rounded-md bg-green py-1	text-sm text-lightGreen ring-1 backdrop-blur focus:outline-none">
            {NETWORKS.map((currentNetwork, networkIdx) => (
              <Listbox.Option
                key={networkIdx}
                className={({ active }) =>
                  `relative cursor-pointer select-none py-2 pl-4 pr-4 text-lightGreen ${
                    active ? "opacity-50 " : ""
                  }`
                }
                value={currentNetwork}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate text-lightGreen ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {currentNetwork}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3"></span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};

export default NetworkSelection;
