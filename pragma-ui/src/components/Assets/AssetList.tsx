import React, { Fragment, useState } from "react";
import styles from "./styles.module.scss";
import classNames from "classnames";
import { Listbox, Transition } from "@headlessui/react";
import SearchBar from "../Navigation/SearchBar";
import AssetPerf from "./AssetPerf";

const AssetList = ({ options, isAsset, assets }) => {
  const [selected, setSelected] = useState(options[0]);
  const numberAssets = 1;

  const [filteredValue, setFilteredValue] = useState("");

  const handleInputChange = (value: string) => {
    setFilteredValue(value);
  };

  return (
    <div className={classNames("w-full text-lightGreen", styles.darkGreenBox)}>
      <h3 className="pb-3 text-lightGreen">
        {isAsset ? "Price Feeds" : "Data Providers"}
      </h3>
      <div className="flex w-full flex-col-reverse gap-3 py-3 sm:flex-row">
        <div className="flex flex-col gap-3 smolScreen:flex-row">
          <Listbox value={selected} onChange={setSelected}>
            <div className="relative w-full md:w-auto">
              <Listbox.Button className="relative flex w-full cursor-pointer flex-row justify-center rounded-full border border-lightBlur py-3 px-6 text-center text-sm text-lightGreen focus:outline-none">
                <span className="block truncate">{selected.name}</span>
                <img
                  className="my-auto pl-2"
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
                <Listbox.Options className="ring-1backdrop-blur absolute mt-1 max-h-60	w-full overflow-auto rounded-md	bg-green py-1 text-sm text-lightGreen focus:outline-none">
                  {options.map((person, personIdx) => (
                    <Listbox.Option
                      key={personIdx}
                      className={({ active }) =>
                        `relative cursor-pointer select-none py-2 pl-10 pr-4 text-lightGreen ${
                          active ? "opacity-50 " : ""
                        }`
                      }
                      value={person}
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate text-lightGreen ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {person.name}
                          </span>
                          {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"></span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
          <div className="my-auto flex w-full flex-row justify-center rounded-full border border-lightBlur py-3 px-6 text-center text-sm text-lightGreen md:w-auto">
            {isAsset ? "Price Feeds" : "Data Providers"}: {numberAssets}
          </div>
        </div>
        <div className="sm:ml-auto">
          <SearchBar onInputChange={handleInputChange} />
        </div>
      </div>
      <div className="w-full overflow-auto">
        {isAsset ? (
          <div className={styles.assetBox}>
            <div className="flex flex-row gap-2	 font-mono text-sm text-LightGreenFooter md:tracking-wider">
              Pair
              <img
                alt="ArrowDownSmall"
                src="/assets/vectors/arrowDownSmall.svg"
              />
            </div>
            <div className="flex flex-row gap-2 font-mono text-sm text-LightGreenFooter md:tracking-wider">
              Last updated
              <img
                alt="ArrowDownSmall"
                src="/assets/vectors/arrowDownSmall.svg"
              />
            </div>

            <div className="flex flex-row gap-2 font-mono text-sm text-LightGreenFooter md:tracking-wider">
              Nb sources
              <img
                alt="ArrowDownSmall"
                src="/assets/vectors/arrowDownSmall.svg"
              />
            </div>
            <div className="flex flex-row gap-2 font-mono text-sm text-LightGreenFooter md:tracking-wider">
              Price
            </div>
            <div className="flex flex-row gap-2 font-mono text-sm text-LightGreenFooter md:tracking-wider">
              1H
              <img
                alt="ArrowDownSmall"
                src="/assets/vectors/arrowDownSmall.svg"
              />
            </div>
            <div className="flex  flex-row gap-2 font-mono text-sm text-LightGreenFooter md:tracking-wider">
              24H
              <img
                alt="ArrowDownSmall"
                src="/assets/vectors/arrowDownSmall.svg"
              />
            </div>
            <div className="flex  flex-row gap-2 font-mono text-sm text-LightGreenFooter md:tracking-wider">
              7D
              <img
                alt="ArrowDownSmall"
                src="/assets/vectors/arrowDownSmall.svg"
              />
            </div>
            <div className="flex	 flex-row gap-2 font-mono text-sm text-LightGreenFooter md:tracking-wider">
              7D chart
            </div>
          </div>
        ) : (
          <div className={styles.dpBox}>
            <div className="flex flex-row gap-2 font-mono text-sm text-LightGreenFooter md:tracking-wider">
              Identifier
              <img
                alt="ArrowDownSmall"
                src="/assets/vectors/arrowDownSmall.svg"
              />
            </div>
            <div className="flex flex-row gap-2 font-mono text-sm text-LightGreenFooter md:tracking-wider">
              Last update
              <img
                alt="ArrowDownSmall"
                src="/assets/vectors/arrowDownSmall.svg"
              />
            </div>
            <div className="flex flex-row gap-2 font-mono text-sm text-LightGreenFooter md:tracking-wider">
              Type
            </div>
            <div className="flex flex-row gap-2 font-mono text-sm text-LightGreenFooter">
              Reputation
              <img
                alt="ArrowDownSmall"
                src="/assets/vectors/arrowDownSmall.svg"
              />
            </div>
            <div className="flex flex-row gap-2 font-mono text-sm text-LightGreenFooter md:tracking-wider">
              Nb feeds
              <img
                alt="ArrowDownSmall"
                src="/assets/vectors/arrowDownSmall.svg"
              />
            </div>
            <div className="flex flex-row gap-2 font-mono text-sm text-LightGreenFooter md:tracking-wider">
              Updates/day
              <img
                alt="ArrowDownSmall"
                src="/assets/vectors/arrowDownSmall.svg"
              />
            </div>
            <div className="flex flex-row gap-2 font-mono text-sm text-LightGreenFooter md:tracking-wider">
              Total updates
            </div>
          </div>
        )}
        {assets.map((asset, assetIdx) => (
          <AssetPerf isAsset={isAsset} asset={asset} key={assetIdx} />
        ))}
      </div>
    </div>
  );
};

export default AssetList;
