import React, { Fragment, useState } from "react";
import styles from "./styles.module.scss";
import classNames from "classnames";
import { Listbox, Transition } from "@headlessui/react";
import BoxContainer from "../common/BoxContainer";
import SearchBar from "../Navigation/SearchBar";

const AssetList = ({ options, isAsset }) => {
  const [selected, setSelected] = useState(options[0]);
  const numberAssets = 1;

  const [filteredValue, setFilteredValue] = useState("");

  const handleInputChange = (value: string) => {
    setFilteredValue(value);
  };

  return (
    <div className={classNames("w-full text-lightGreen", styles.darkGreenBox)}>
      <h3 className="text-lightGreen">
        {isAsset ? "Price Feeds" : "Data Providers"}
      </h3>
      <div className="flex w-full flex-row gap-3 pt-3">
        <Listbox value={selected} onChange={setSelected}>
          <div className="relative">
            <Listbox.Button className="relative flex w-auto	 cursor-default flex-row rounded-full border border-lightBlur py-3 px-6 text-center text-sm text-lightGreen focus:outline-none">
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
              <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto	rounded-md bg-white py-1 text-sm shadow-lg ring-1 ring-black/5 focus:outline-none">
                {options.map((person, personIdx) => (
                  <Listbox.Option
                    key={personIdx}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                      }`
                    }
                    value={person}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
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
        <div className="my-auto	 flex w-auto flex-row rounded-full border border-lightBlur py-3 px-6 text-center text-sm text-lightGreen">
          {isAsset ? "Price Feeds" : "Data Providers"}: {numberAssets}
        </div>
        <div className="ml-auto">
          <SearchBar onInputChange={handleInputChange} />
        </div>
      </div>
    </div>
  );
};

export default AssetList;
