import React from "react";
import cx from "classnames";
import { Input } from "reactstrap";
import styles from "./Form.module.scss";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/outline";

const SecondStep = ({ validationError, formData, handleFieldChange }) => {
  const getOracleContent = (type) => {
    switch (type) {
      case "api":
        return (
          <div className="flex w-full flex-col gap-4">
            <label className="text-lightGreen">
              Asset address
              <input
                type="text"
                value={formData.assetAddress}
                onChange={(e) =>
                  handleFieldChange("assetAddress", e.target.value)
                }
                placeholder="Enter asset address"
                className="mt-2 w-full rounded-full bg-lightBlur px-4 py-2 text-lightGreen placeholder-lightGreen focus:outline-none"
              />
            </label>
            <label className="text-lightGreen">
              Base currency
              <input
                type="text"
                value={formData.baseCurrency}
                onChange={(e) =>
                  handleFieldChange("baseCurrency", e.target.value)
                }
                placeholder="Enter asset address"
                className="mt-2 w-full rounded-full bg-lightBlur px-4 py-2 text-lightGreen placeholder-lightGreen focus:outline-none"
              />
            </label>
            <label className="text-lightGreen">
              Quote currency
              <Listbox
                value={formData.quoteCurrency}
                onChange={(value) => handleFieldChange("quoteCurrency", value)}
              >
                <div className="relative mt-2">
                  <Listbox.Button className="relative flex w-full cursor-pointer flex-row rounded-full bg-lightBlur py-3 px-6 text-center text-sm text-lightGreen focus:outline-none">
                    <span className="block truncate">
                      {formData.quoteCurrency || "Select a currency"}
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <ChevronDownIcon
                        className="h-5 w-5 text-lightGreen"
                        aria-hidden="true"
                      />
                    </span>
                  </Listbox.Button>
                  <Transition
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute mt-1 max-h-60 w-full cursor-pointer overflow-auto rounded-md bg-greenFooter py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 backdrop-blur-sm focus:outline-none sm:text-sm">
                      {["USDC", "USDT", "USD"].map((currency) => (
                        <Listbox.Option
                          key={currency}
                          className={({ active }) =>
                            `relative cursor-pointer select-none py-2 pl-6 pr-4 ${
                              active ? "text-mint" : "text-lightGreen"
                            }`
                          }
                          value={currency}
                        >
                          {({ selected }) => (
                            <span
                              className={`block truncate ${
                                selected ? "font-medium" : "font-normal"
                              }`}
                            >
                              {currency}
                            </span>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            </label>
            <label className="text-lightGreen">
              Network
              <Listbox
                value={formData.network}
                onChange={(value) => handleFieldChange("network", value)}
              >
                <div className="relative mt-2">
                  <Listbox.Button className="relative flex w-full cursor-pointer flex-row rounded-full bg-lightBlur py-3 px-6 text-center text-sm text-lightGreen focus:outline-none">
                    <span className="block truncate">
                      {formData.network || "Select a network"}
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <ChevronDownIcon
                        className="h-5 w-5 text-lightGreen"
                        aria-hidden="true"
                      />
                    </span>
                  </Listbox.Button>
                  <Transition
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute mt-1 max-h-60 w-full cursor-pointer overflow-auto rounded-md bg-greenFooter py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 backdrop-blur-sm focus:outline-none sm:text-sm">
                      {["Solana", "Base", "Bnb", "Starknet"].map((network) => (
                        <Listbox.Option
                          key={network}
                          className={({ active }) =>
                            `relative cursor-pointer select-none py-2 pl-6 pr-4 ${
                              active ? "text-mint" : "text-lightGreen"
                            }`
                          }
                          value={network}
                        >
                          {({ selected }) => (
                            <span
                              className={`block truncate ${
                                selected ? "font-medium" : "font-normal"
                              }`}
                            >
                              {network}
                            </span>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            </label>
          </div>
        );
      case "centralized":
        return (
          <div className={styles.centralizedContent}>
            <h3>Centralized Selected</h3>
            <p>Details about the Centralized oracle...</p>
          </div>
        );
      case "decentralized":
        return (
          <div className={styles.decentralizedContent}>
            <h3>Decentralized Selected</h3>
            <p>Details about the Decentralized oracle...</p>
          </div>
        );
      case "zk-proven":
        return (
          <div className={styles.zkProvenContent}>
            <h3>zk-proven Selected</h3>
            <p>Details about the zk-proven oracle...</p>
          </div>
        );
      default:
        return (
          <div className={styles.noSelection}>
            <h3>No Oracle Selected</h3>
            <p>Please select an oracle type to see more details.</p>
          </div>
        );
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Create a data feed</h2>
      {getOracleContent(formData.type)}
    </div>
  );
};

export default SecondStep;
