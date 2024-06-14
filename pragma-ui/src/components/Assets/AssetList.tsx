import React, { Fragment, useState } from "react";
import styles from "./styles.module.scss";
import classNames from "classnames";
import { Listbox, Transition } from "@headlessui/react";
import SearchBar from "../Navigation/SearchBar";
import AssetPerf from "./AssetPerf";
import Image from "next/image";

const AssetList = ({
  options,
  isAsset,
  assets,
  onSourceChange,
  selectedSource,
  loading,
}) => {
  const elements = Array(5).fill({
    image: `/assets/currencies/skynet_trading.svg`,
    type: "Crypto",
    ticker: "BTCUSD",
    lastUpdated: "2sAGO",
    price: "1000",
    sources: "10",
    variations: {
      past1h: "10",
      past24h: "-3",
      past7d: "8",
    },
    chart: `https://www.coingecko.com/coins/SOL/sparkline.svg`,
    ema: "soon",
    macd: "soon",
  });

  const [filteredValue, setFilteredValue] = useState("");

  const handleInputChange = (value: string) => {
    setFilteredValue(value);
  };

  const filteredAssets = assets.filter((asset) => {
    if (isAsset) {
      return asset?.ticker?.toLowerCase().includes(filteredValue.toLowerCase());
    } else {
      return asset?.name?.toLowerCase().includes(filteredValue.toLowerCase());
    }
  });

  return (
    <div className={classNames("w-full text-lightGreen", styles.darkGreenBox)}>
      <h3 className="pb-3 text-lightGreen">
        {isAsset ? "Price Feeds" : "Data Providers"}
      </h3>
      <div className="flex w-full flex-col-reverse gap-3 py-3 sm:flex-row">
        <div className="flex flex-col gap-3 smolScreen:flex-row">
          <Listbox value={selectedSource} onChange={onSourceChange}>
            <div className="relative w-full md:w-auto">
              <Listbox.Button className="relative flex w-full cursor-pointer flex-row justify-center rounded-full border border-lightBlur py-3 px-6 text-center text-sm text-lightGreen focus:outline-none">
                <span className="block truncate">{selectedSource}</span>
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
                <Listbox.Options className="ring-1backdrop-blur absolute mt-1 max-h-60	w-full overflow-auto rounded-md	bg-green py-1 text-sm text-lightGreen focus:outline-none">
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
          <div className="my-auto flex w-full flex-row justify-center rounded-full border border-lightBlur py-3 px-6 text-center text-sm text-lightGreen md:w-auto">
            {isAsset ? "Price Feeds" : "Data Providers"}: {assets.length}
          </div>
        </div>
        <div className="sm:ml-auto">
          <SearchBar onInputChange={handleInputChange} />
          <div className="hidden"> {filteredValue}</div>
        </div>
      </div>
      <div className="w-full overflow-auto">
        {isAsset ? (
          <div className={styles.assetBox}>
            <div className="flex flex-row gap-2	 font-mono text-sm text-LightGreenFooter md:tracking-wider">
              Pair
              <Image
                height={16}
                width={16}
                alt="ArrowDownSmall"
                src="/assets/vectors/arrowDownSmall.svg"
              />
            </div>
            <div className="flex translate-x-2 flex-row gap-1 font-mono text-sm text-LightGreenFooter md:tracking-wider">
              Last updated
              <Image
                height={16}
                width={16}
                alt="ArrowDownSmall"
                src="/assets/vectors/arrowDownSmall.svg"
              />
            </div>

            <div className="flex flex-row gap-2 font-mono text-sm text-LightGreenFooter md:tracking-wider">
              Nb sources
              <Image
                height={16}
                width={16}
                alt="ArrowDownSmall"
                src="/assets/vectors/arrowDownSmall.svg"
              />
            </div>
            <div className="flex flex-row gap-2 font-mono text-sm text-LightGreenFooter md:tracking-wider">
              Price
            </div>
            <div className="flex flex-row gap-2 font-mono text-sm text-LightGreenFooter md:tracking-wider">
              1H
              <Image
                height={16}
                width={16}
                alt="ArrowDownSmall"
                src="/assets/vectors/arrowDownSmall.svg"
              />
            </div>
            <div className="flex  flex-row gap-2 font-mono text-sm text-LightGreenFooter md:tracking-wider">
              24H
              <Image
                height={16}
                width={16}
                alt="ArrowDownSmall"
                src="/assets/vectors/arrowDownSmall.svg"
              />
            </div>
            <div className="flex  flex-row gap-2 font-mono text-sm text-LightGreenFooter md:tracking-wider">
              7D
              <Image
                height={16}
                width={16}
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
              <Image
                height={16}
                width={16}
                alt="ArrowDownSmall"
                src="/assets/vectors/arrowDownSmall.svg"
              />
            </div>
            <div className="flex translate-x-2 flex-row gap-1 font-mono text-sm text-LightGreenFooter md:tracking-wider">
              Last update
              <Image
                height={16}
                width={16}
                alt="ArrowDownSmall"
                src="/assets/vectors/arrowDownSmall.svg"
              />
            </div>
            <div className="flex flex-row gap-2 font-mono text-sm text-LightGreenFooter md:tracking-wider">
              Type
            </div>
            <div className="flex flex-row gap-2 font-mono text-sm text-LightGreenFooter">
              Reputation
              <Image
                height={16}
                width={16}
                alt="ArrowDownSmall"
                src="/assets/vectors/arrowDownSmall.svg"
              />
            </div>
            <div className="flex flex-row gap-2 font-mono text-sm text-LightGreenFooter md:tracking-wider">
              Nb feeds
              <Image
                height={16}
                width={16}
                alt="ArrowDownSmall"
                src="/assets/vectors/arrowDownSmall.svg"
              />
            </div>
            <div className="flex flex-row gap-2 font-mono text-sm text-LightGreenFooter md:tracking-wider">
              Updates/day
              <Image
                height={16}
                width={16}
                alt="ArrowDownSmall"
                src="/assets/vectors/arrowDownSmall.svg"
              />
            </div>
            <div className="flex flex-row gap-2 font-mono text-sm text-LightGreenFooter md:tracking-wider">
              Total updates
            </div>
          </div>
        )}
        {loading &&
          elements.map((element, index) => (
            <AssetPerf
              isAsset={true}
              asset={element}
              key={index}
              loading={true}
            />
          ))}
        {!loading &&
          isAsset &&
          filteredAssets
            ?.sort((a, b) => a.ticker.localeCompare(b.ticker))
            .map((asset, assetIdx) => (
              <AssetPerf
                isAsset={isAsset}
                asset={asset}
                key={assetIdx}
                loading={false}
              />
            ))}
        {!loading &&
          !isAsset &&
          filteredAssets
            ?.sort((a, b) => a.name.localeCompare(b.ticker))
            .map((asset, assetIdx) => (
              <AssetPerf
                isAsset={isAsset}
                asset={asset}
                key={assetIdx}
                loading={false}
              />
            ))}
      </div>
    </div>
  );
};

export default AssetList;
