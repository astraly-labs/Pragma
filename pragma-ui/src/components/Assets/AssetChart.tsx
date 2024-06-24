import React, { Fragment, useState, useEffect, useRef } from "react";
import classNames from "classnames";
import Image from "next/image";
import { Listbox, Tab, Transition } from "@headlessui/react";
import { options } from "../../pages/assets";
import { ChartBox } from "../common/ChartBox";
import { AssetPair } from "../common/AssetBox";
import { UTCTimestamp } from "lightweight-charts";
import { useData } from "../../providers/data";
import { Asset } from "../../pages/asset/[ticker]";
import moment from "moment";
import { removeDuplicateTimestamps, timezone } from "../../pages";

interface Frames {
  frame: string;
}

const AssetChart = ({ asset }: { asset: Asset }) => {
  const { currentSource, switchSource } = useData();
  const [frames] = useState<Frames[]>([
    { frame: "1min" },
    { frame: "15min" },
    { frame: "1h" },
    { frame: "2h" },
  ]);
  const [selectedFrame, setSelectedFrame] = useState("1min");

  const [assetPair, setAssetPair] = useState<AssetPair | undefined>(undefined);
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (asset === undefined) return;
    // Establish WebSocket connection
    ws.current = new WebSocket(
      "wss://ws.dev.pragma.build/node/v1/onchain/ohlc/subscribe"
    );

    ws.current.onopen = () => {
      console.log(selectedFrame, asset.ticker);
      // Subscribe to data
      ws.current?.send(
        JSON.stringify({
          msg_type: "subscribe",
          pair: asset.ticker,
          network: "testnet",
          interval: selectedFrame,
        })
      );
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      // On acknoledgement, do nothing
      if (data.msg_type === "subscribe") return;

      // TODO: remove hotfix
      const unduplicatedData = removeDuplicateTimestamps(
        data.sort(
          (a, b) =>
            moment.tz(b.time, timezone).valueOf() -
            moment.tz(a.time, timezone).valueOf()
        )
      );

      const priceData = unduplicatedData.reverse().map((d: any) => ({
        time: (moment.tz(d.time, timezone).valueOf() / 1000) as UTCTimestamp,
        value: parseInt(d.open) / 10 ** 8,
      }));
      setAssetPair({
        ticker: asset.ticker,
        lastPrice: parseFloat(data[data.length - 1].close),
        variation24h: 0,
        relativeVariation24h: 0,
        priceData,
      });
    };

    return () => {
      ws.current?.close();
    };
  }, [asset, selectedFrame]);

  return (
    <div className="w-full flex-col justify-between gap-8 md:flex-row md:gap-5">
      <div className="flex flex-col gap-3 pb-4 sm:flex-row sm:gap-10">
        <Listbox value={currentSource} onChange={switchSource}>
          <div className="relative md:w-auto">
            <Listbox.Button className="relative flex w-full cursor-pointer flex-row justify-center rounded-full border border-lightBlur py-3 px-6 text-center text-sm text-lightGreen focus:outline-none sm:w-fit">
              <span className="block truncate">{currentSource}</span>
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
              <Listbox.Options className="ring-backdrop-blur absolute z-10 mt-1 max-h-60 overflow-auto rounded-md bg-green py-1 text-sm text-lightGreen focus:outline-none">
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
                          {options}
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
        <Tab.Group
          onChange={(index) => {
            setSelectedFrame(frames[index].frame);
          }}
        >
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
        colors={{ backgroundColor: "#00000000" }}
        assetPair={assetPair}
        box={false}
      />
    </div>
  );
};

export default AssetChart;
