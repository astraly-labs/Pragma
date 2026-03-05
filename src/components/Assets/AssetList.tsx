"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import styles from "./styles.module.scss";
import clsx from "clsx";
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
}: any) => {
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
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

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

  const handleInputChange = (value: any) => {
    setFilteredValue(value);
  };

  const filteredAssets = assets.filter((asset: any) => {
    if (isAsset) {
      return asset?.ticker?.toLowerCase().includes(filteredValue.toLowerCase());
    } else {
      return asset?.name?.toLowerCase().includes(filteredValue.toLowerCase());
    }
  });

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
    <div className={clsx("w-full text-lightGreen", styles.darkGreenBox)}>
      <h3 className="pb-3 text-lightGreen">
        {isAsset ? "Price Feeds" : "Data Providers"}
      </h3>
      <div className="flex w-full flex-col-reverse gap-3 py-3 sm:flex-row">
        <div className="flex flex-col gap-3 smolScreen:flex-row">
          <div ref={dropdownRef} className="relative w-full md:w-auto">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative flex w-full cursor-pointer flex-row justify-center rounded-full border border-lightBlur px-6 py-3 text-center text-sm text-lightGreen focus:outline-none"
            >
              <span className="block truncate">{selectedSource}</span>
              <Image
                className="my-auto pl-2"
                height={16}
                width={16}
                alt="arrowDown"
                src="/assets/vectors/arrowDown.svg"
              />
            </button>
            {isOpen && (
              <div className="absolute mt-1 max-h-60 w-full min-w-[120px] overflow-auto rounded-md bg-green py-1 text-sm text-lightGreen ring-1 backdrop-blur focus:outline-none">
                {options.map((option: any, optionIdx: number) => (
                  <button
                    key={optionIdx}
                    className={`relative w-full cursor-pointer select-none py-2 pl-10 pr-4 text-left text-lightGreen hover:opacity-50`}
                    onClick={() => {
                      onSourceChange(option);
                      setIsOpen(false);
                    }}
                  >
                    <span
                      className={`block truncate text-lightGreen ${
                        option === selectedSource
                          ? "font-medium"
                          : "font-normal"
                      }`}
                    >
                      {option}
                    </span>
                    {option === selectedSource ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3"></span>
                    ) : null}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="my-auto flex w-full flex-row justify-center rounded-full border border-lightBlur px-6 py-3 text-center text-sm text-lightGreen md:w-auto">
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
            <div
              onClick={() => requestSort("ticker")}
              className="flex cursor-pointer flex-row gap-2	 font-mono text-sm text-LightGreenFooter md:tracking-wider"
            >
              Pair
              <Image
                height={16}
                width={16}
                alt="ArrowDownSmall"
                src="/assets/vectors/arrowDownSmall.svg"
              />
            </div>
            <div
              onClick={() => requestSort("lastUpdated")}
              className="flex cursor-pointer flex-row gap-1 font-mono text-sm text-LightGreenFooter md:tracking-wider"
            >
              Last updated
              <Image
                height={16}
                width={16}
                alt="ArrowDownSmall"
                src="/assets/vectors/arrowDownSmall.svg"
              />
            </div>
            <div
              onClick={() => requestSort("sources")}
              className="flex cursor-pointer flex-row gap-2 font-mono text-sm text-LightGreenFooter md:tracking-wider"
            >
              Nb sources
              <Image
                height={16}
                width={16}
                alt="ArrowDownSmall"
                src="/assets/vectors/arrowDownSmall.svg"
              />
            </div>
            <div
              onClick={() => requestSort("price")}
              className="flex cursor-pointer flex-row gap-2 font-mono text-sm text-LightGreenFooter md:tracking-wider"
            >
              Price
              <Image
                height={16}
                width={16}
                alt="ArrowDownSmall"
                src="/assets/vectors/arrowDownSmall.svg"
              />
            </div>
            {selectedSource !== "api" && selectedSource !== "api-prod" && (
              <>
                <div
                  onClick={() => requestSort("variations.past1h")}
                  className="flex cursor-pointer flex-row gap-2 font-mono text-sm text-LightGreenFooter md:tracking-wider"
                >
                  1H
                  <Image
                    height={16}
                    width={16}
                    alt="ArrowDownSmall"
                    src="/assets/vectors/arrowDownSmall.svg"
                  />
                </div>
                <div
                  onClick={() => requestSort("variations.past24h")}
                  className="flex cursor-pointer  flex-row gap-2 font-mono text-sm text-LightGreenFooter md:tracking-wider"
                >
                  24H
                  <Image
                    height={16}
                    width={16}
                    alt="ArrowDownSmall"
                    src="/assets/vectors/arrowDownSmall.svg"
                  />
                </div>
                <div
                  onClick={() => requestSort("variations.past7d")}
                  className="flex cursor-pointer  flex-row gap-2 font-mono text-sm text-LightGreenFooter md:tracking-wider"
                >
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
              </>
            )}
          </div>
        ) : (
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
        )}
        {loading &&
          elements.map((element, index) => (
            <AssetPerf
              isAsset={true}
              asset={element}
              key={index}
              loading={true}
              currentSource={selectedSource}
            />
          ))}
        {!loading &&
          sortedAssets.map((asset, assetIdx) => (
            <AssetPerf
              isAsset={isAsset}
              asset={asset}
              key={assetIdx}
              loading={false}
              currentSource={selectedSource}
            />
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

export default AssetList;
