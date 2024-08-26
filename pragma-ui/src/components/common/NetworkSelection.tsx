import React, {useState} from "react";
import styles from "./styles.module.scss";
import classNames from "classnames";
import GreenText from "../common/GreenText";
import { ButtonLink } from "../common/Button";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/outline";

const NetworkSelection = ({
    setNetwork, 

}) => {
    const NETWORKS = ["sepolia", "mainnet"];
    const [definedNetwork, setDefinedNetwork] = useState<string>("sepolia");

    const setConfigurationNetwork = (network) => {
        setDefinedNetwork(network);
        setNetwork(network);
    }
  return (
    <div className="flex">
              <Listbox
                value={definedNetwork}
                onChange={setConfigurationNetwork}
              >
                <div className="relative mt-1">
                  <Listbox.Button className="relative flex w-full cursor-pointer  gap-x-2 flex-row rounded-full bg-lightBlur py-3 px-6 text-center text-sm text-lightGreen focus:outline-none">
                    <span className="pr-4 block truncate">
                      {definedNetwork}
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <ChevronDownIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Listbox.Button>
                  <Transition
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="mt-1 max-h-60 w-full overflow-auto rounded-md bg-darkGreen py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {NETWORKS.map((current_network) => (
                        <Listbox.Option
                          key={current_network}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-2 pr-4 ${
                              active
                                ? "bg-lightGreen text-darkGreen"
                                : "text-lightGreen"
                            }`
                          }
                          value={current_network}
                        >
                          {({ selected }) => (
                            <>
                              <span
                                className={`block truncate ${
                                  selected ? "font-medium" : "font-normal"
                                }`}
                              >
                                {current_network}
                              </span>
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            </div>
  );
};

export default NetworkSelection;
