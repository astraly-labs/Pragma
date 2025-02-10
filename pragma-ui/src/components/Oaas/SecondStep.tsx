import React, { useState, useEffect } from "react";
import styles from "./Form.module.scss";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/outline";

const SecondStep = ({ formData, handleFieldChange }) => {
  const [error, setError] = useState("");

  // Add validation function
  const validateFields = () => {
    if (formData.type === "api") {
      if (!formData.network) {
        setError("Please select a network");
        return false;
      }
      if (!formData.assetAddress) {
        setError("Please enter an asset address");
        return false;
      }
      if (!formData.tokenName) {
        setError("Please enter a token name");
        return false;
      }
      if (!formData.ticker) {
        setError("Please enter a ticker");
        return false;
      }
    }
    setError("");
    return true;
  };

  // Add useEffect to expose validation method
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.validateStep2 = validateFields;
    }
    return () => {
      if (typeof window !== "undefined") {
        delete window.validateStep2;
      }
    };
  }, [formData]);

  const getOracleContent = (type) => {
    switch (type) {
      case "api":
        return (
          <div className="flex w-full flex-col gap-6">
            <div className="flex flex-col">
              <div className="mb-2 flex max-w-xl flex-col gap-2">
                <label className="font-semibold text-lightGreen">Network</label>
                <p className="mb-2 text-justify text-sm text-gray-500">
                  Select the primary network for the asset (the one with the
                  most liquidity). We support multi-networks, but not from the
                  frontend yet, so please{" "}
                  <a
                    href="https://t.me/BGLabs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-mint"
                  >
                    reach out to us
                  </a>{" "}
                  if you need to add networks or if you need support for another
                  network.
                </p>
                <Listbox
                  value={formData.network}
                  onChange={(value) => handleFieldChange("network", value)}
                >
                  <div className="relative">
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
                      <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full cursor-pointer overflow-auto rounded-md bg-greenFooter py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 backdrop-blur-sm focus:outline-none sm:text-sm">
                        {["Solana", "Base", "Bnb", "Starknet"].map(
                          (network) => (
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
                          )
                        )}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </Listbox>
              </div>
              <label className="pb-2 pt-4 font-semibold text-lightGreen">
                Asset Address
              </label>
              <p className="mb-4 max-w-xl text-sm text-gray-500">
                Enter the address of the asset you want to track.
              </p>
              <div className="relative max-w-xl">
                <input
                  type="text"
                  value={formData.assetAddress}
                  onChange={(e) =>
                    handleFieldChange("assetAddress", e.target.value)
                  }
                  placeholder="0x..."
                  className="w-full rounded-full bg-lightBlur px-6 py-2 text-lightGreen placeholder-lightGreen placeholder-opacity-50 focus:outline-none"
                />
                {formData.assetAddress && (
                  <button
                    onClick={() => handleFieldChange("assetAddress", "")}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-5 w-5 text-lightGreen hover:text-mint"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            <div className="flex max-w-xl flex-col">
              <label className="font-semibold text-lightGreen">
                Token Name
              </label>
              <p className="mb-4 mt-2 text-sm text-gray-500">
                Provide the official name of the token. This will be used to
                help us scrape the sources available for the token.
              </p>
              <div className="relative">
                <input
                  type="text"
                  value={formData.tokenName}
                  onChange={(e) =>
                    handleFieldChange("tokenName", e.target.value)
                  }
                  placeholder="bitcoin, ethereum, etc."
                  className="w-full rounded-full bg-lightBlur px-6 py-2 text-lightGreen placeholder-lightGreen placeholder-opacity-50 focus:outline-none"
                />
                {formData.tokenName && (
                  <button
                    onClick={() => handleFieldChange("tokenName", "")}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-5 w-5 text-lightGreen hover:text-mint"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            <div className="flex max-w-xl flex-col">
              <label className="font-semibold text-lightGreen">Ticker</label>
              <p className="mb-2 text-sm text-gray-500">
                Enter the ticker symbol, e.g., BTC, ETH.
              </p>
              <div className="relative">
                <input
                  type="text"
                  value={formData.ticker}
                  onChange={(e) => handleFieldChange("ticker", e.target.value)}
                  placeholder="BTC, ETH, etc."
                  className="w-full rounded-full bg-lightBlur px-6 py-2 text-lightGreen placeholder-lightGreen placeholder-opacity-50 focus:outline-none"
                />
                {formData.ticker && (
                  <button
                    onClick={() => handleFieldChange("ticker", "")}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-5 w-5 text-lightGreen hover:text-mint"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </div>
            {error && <div className="text-sm text-red-500">{error}</div>}
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
