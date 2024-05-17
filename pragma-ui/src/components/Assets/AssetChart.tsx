import React, { Fragment, useState } from "react";
import classNames from "classnames";
import Image from "next/image";
import { Listbox, Tab, Transition } from "@headlessui/react";
import { options } from "../../pages/assets";
import { ChartBox } from "../common/ChartBox";
import { AssetPair } from "../common/AssetBox";

interface Frames {
  frame: string;
}

const exampleAssetPair: AssetPair = {
  ticker: "BTCUSD",
  lastPrice: 50000,
  variation24h: 1000,
  relativeVariation24h: 2,
  priceData: [
    { time: "2022-04-10", value: 49000 },
    { time: "2022-04-11", value: 51000 },
    { time: "2022-04-12", value: 55000 },
    { time: "2022-04-13", value: 70000 },
  ],
};

const AssetChart = ({ assets }) => {
  const [selected, setSelected] = useState(options[0]);

  const [frames] = useState<Frames[]>([
    {
      frame: "1hour",
    },
    {
      frame: "1day",
    },
    {
      frame: "1week",
    },
    {
      frame: "1month",
    },
  ]);
  return (
    <div className="w-full flex-col justify-between gap-8 md:flex-row md:gap-5">
      <div className="flex flex-col gap-3 pb-4 sm:flex-row sm:gap-10">
        <Listbox value={selected} onChange={setSelected}>
          <div className="relative md:w-auto">
            <Listbox.Button className="relative flex w-full cursor-pointer flex-row justify-center rounded-full border border-lightBlur py-3 px-6 text-center text-sm text-lightGreen focus:outline-none sm:w-fit">
              <span className="block truncate">{selected.name}</span>
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
              <Listbox.Options className="ring-backdrop-blur absolute z-10 mt-1 max-h-60 overflow-auto rounded-md	bg-green py-1 text-sm text-lightGreen focus:outline-none">
                {options.map((options, optionsIdx) => (
                  <Listbox.Option
                    key={optionsIdx}
                    className={({ active }) =>
                      `relative cursor-pointer select-none py-2 pl-10 pr-4 text-lightGreen ${
                        active ? "opacity-50 " : ""
                      }`
                    }
                    value={options}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate text-lightGreen ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {options.name}
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
        <Tab.Group>
          <Tab.List className="flex rounded-full bg-xlightBlur md:space-x-1">
            {frames.map((frame, index) => (
              <Tab
                key={index}
                className={({ selected }) =>
                  classNames(
                    "w-full rounded-full p-2 px-3 py-3 text-sm font-medium leading-5 tracking-wider sm:px-8 sm:py-1",
                    "focus:outline-none ",
                    selected
                      ? "bg-mint text-darkGreen"
                      : "text-lightGreen hover:text-white"
                  )
                }
              >
                {frame.frame}
              </Tab>
            ))}
          </Tab.List>
        </Tab.Group>
      </div>
      <ChartBox
        colors={{
          backgroundColor: "#00000000",
        }}
        assetPair={exampleAssetPair}
        box={false}
      />
    </div>
  );
};

export default AssetChart;
