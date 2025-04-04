"use client";

import React, { Fragment, useMemo, useState } from "react";
import styles from "@/components/Assets/styles.module.scss";
import classNames from "classnames";
import { Listbox, Transition } from "@headlessui/react";
import Image from "next/image";
import { DataProviderInfo } from "@/app/assets/_types";
import { SearchBar } from "./searchbar";
import { useRouter } from "next/navigation";
import { PublisherRow } from "./publisher-row";

type PublisherListProps = {
  options: string[];
  publishers: DataProviderInfo[];
  selectedSource?: string;
  loading: boolean;
};

export const PublisherList = ({
  options,
  publishers,
  selectedSource,
  loading,
}: PublisherListProps) => {
  const router = useRouter();
  const elements = Array(5).fill({
    image: `/assets/currencies/skynet_trading.svg`,
    type: "Crypto",
    ticker: "DAI%2FUSD",
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
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  const handleInputChange = (value: any) => {
    setFilteredValue(value);
  };

  const filteredAssets =
    publishers && publishers.length >= 0
      ? publishers.filter((asset: any) => {
          return asset?.name
            ?.toLowerCase()
            .includes(filteredValue.toLowerCase());
        })
      : [];

  const requestSort = (key: any) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedAssets = useMemo(() => {
    const sortableItems = [...filteredAssets];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        if (sortConfig.key) {
          if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === "ascending" ? -1 : 1;
          }
          if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === "ascending" ? 1 : -1;
          }
        }
        return 0;
      });
    }
    return sortableItems;
  }, [filteredAssets, sortConfig]);

  return (
    <div className={classNames("w-full text-lightGreen", styles.darkGreenBox)}>
      <h3 className="pb-3 text-lightGreen">Data Providers</h3>
      <div className="flex w-full flex-col-reverse gap-3 py-3 sm:flex-row">
        <div className="flex flex-col gap-3 smolScreen:flex-row">
          <Listbox
            value={selectedSource}
            onChange={(value) =>
              router.push(`/assets?source=${value}`, {
                scroll: false,
              })
            }
          >
            <div className="relative w-full md:w-auto">
              <Listbox.Button className="relative flex w-full cursor-pointer flex-row justify-center rounded-full border border-lightBlur px-6 py-3 text-center text-sm text-lightGreen focus:outline-none">
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
                <Listbox.Options className="absolute mt-1 max-h-60 w-full min-w-[120px] overflow-auto rounded-md bg-green py-1 text-sm text-lightGreen ring-1 backdrop-blur focus:outline-none">
                  {options.map((option, optionIdx) => (
                    <Listbox.Option
                      key={optionIdx}
                      className={({ active }) =>
                        `relative cursor-pointer select-none py-2 pl-10 pr-4 text-lightGreen ${
                          active ? "opacity-50 " : ""
                        }`
                      }
                      value={option}
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={classNames(
                              "block truncate font-normal text-lightGreen",
                              {
                                "font-medium": selected,
                              }
                            )}
                          >
                            {option}
                          </span>
                          {selected && (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3" />
                          )}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
          <div className="my-auto flex w-full flex-row justify-center rounded-full border border-lightBlur px-6 py-3 text-center text-sm text-lightGreen md:w-auto">
            Data Providers: {publishers!.length}
          </div>
        </div>
        <div className="sm:ml-auto">
          <SearchBar onInputChange={handleInputChange} />
          <div className="hidden"> {filteredValue}</div>
        </div>
      </div>
      <div className="w-full overflow-auto">
        <div className={styles.dpBox}>
          <div
            onClick={() => requestSort("name")}
            className="flex cursor-pointer flex-row gap-2 font-mono text-sm text-LightGreenFooter md:tracking-wider"
          >
            Identifier
            <Image
              height={16}
              width={16}
              alt="ArrowDownSmall"
              src="/assets/vectors/arrowDownSmall.svg"
            />
          </div>
          <div
            onClick={() => requestSort("lastUpdate")}
            className="flex cursor-pointer flex-row gap-1 font-mono text-sm text-LightGreenFooter md:tracking-wider"
          >
            Last update
            <Image
              height={16}
              width={16}
              alt="ArrowDownSmall"
              src="/assets/vectors/arrowDownSmall.svg"
            />
          </div>
          <div className="flex cursor-pointer flex-row gap-2 font-mono text-sm text-LightGreenFooter md:tracking-wider">
            Type
          </div>
          <div
            onClick={() => requestSort("reputation")}
            className="flex cursor-pointer flex-row gap-2 font-mono text-sm text-LightGreenFooter"
          >
            Reputation
            <Image
              height={16}
              width={16}
              alt="ArrowDownSmall"
              src="/assets/vectors/arrowDownSmall.svg"
            />
          </div>
          <div
            onClick={() => requestSort("nbFeeds")}
            className="flex cursor-pointer flex-row gap-2 font-mono text-sm text-LightGreenFooter md:tracking-wider"
          >
            Nb feeds
            <Image
              height={16}
              width={16}
              alt="ArrowDownSmall"
              src="/assets/vectors/arrowDownSmall.svg"
            />
          </div>
          <div
            onClick={() => requestSort("dailyUpdates")}
            className="flex cursor-pointer flex-row gap-2 font-mono text-sm text-LightGreenFooter md:tracking-wider"
          >
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
        {loading &&
          elements.map((element, index) => (
            <PublisherRow
              publisher={element}
              key={index}
              loading={true}
              currentSource={selectedSource}
            />
          ))}
        {!loading &&
          sortedAssets.map((asset: any, assetIdx) => (
            <Fragment key={`asset-${assetIdx}`}>
              <PublisherRow
                publisher={asset}
                loading={loading}
                currentSource={selectedSource}
              />
            </Fragment>
          ))}
        {!loading && sortedAssets.length === 0 && (
          <div className="py-2 font-mono text-xs text-lightGreen">
            No results for your search
          </div>
        )}
      </div>
    </div>
  );
};
