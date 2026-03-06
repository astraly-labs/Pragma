import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

const NetworkSelection = ({ setNetwork }) => {
  const NETWORKS = ["mainnet"];
  const [definedNetwork, setDefinedNetwork] = useState<string>("mainnet");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const setConfigurationNetwork = (network) => {
    setDefinedNetwork(network);
    setNetwork(network);
  };
  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex cursor-pointer flex-row justify-center rounded-full border border-lightBlur py-3 px-6 text-center text-sm text-lightGreen focus:outline-none"
      >
        <span className="block truncate">{definedNetwork}</span>
        <Image
          className="my-auto pl-2"
          height={16}
          width={16}
          alt="arrowDown"
          src="/assets/vectors/arrowDown.svg"
        />
      </button>
      {isOpen && (
        <div className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-green py-1 text-sm text-lightGreen ring-1 backdrop-blur focus:outline-none">
          {NETWORKS.map((currentNetwork, networkIdx) => (
            <button
              key={networkIdx}
              className={`relative w-full cursor-pointer select-none py-2 pl-4 pr-4 text-left text-lightGreen hover:opacity-50`}
              onClick={() => {
                setConfigurationNetwork(currentNetwork);
                setIsOpen(false);
              }}
            >
              <span
                className={`block truncate text-lightGreen ${
                  currentNetwork === definedNetwork
                    ? "font-medium"
                    : "font-normal"
                }`}
              >
                {currentNetwork}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default NetworkSelection;
