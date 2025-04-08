"use client";

import React, { Fragment, useMemo, useState } from "react";
import styles from "@/components/Assets/styles.module.scss";
import classNames from "classnames";
import { Listbox, Transition } from "@headlessui/react";
import Image from "next/image";
import { AssetInfo } from "@/app/(dashboard)/assets/_types";
import { SearchBar } from "./searchbar";
import { useRouter } from "next/navigation";
import { columns } from "./assets-table/columns";
import { DataTable } from "./assets-table/data-table";

type AssetListProps = {
  options: string[];
  assets: AssetInfo[];
  selectedSource?: string;
  loading: boolean;
};

const AssetList = ({
  options,
  assets,
  selectedSource,
  loading,
}: AssetListProps) => {
  const router = useRouter();

  const [filteredValue, setFilteredValue] = useState("");

  const handleInputChange = (value: string) => {
    setFilteredValue(value);
  };

  const filteredAssets = useMemo(() => {
    return assets.filter((asset) =>
      asset?.ticker?.toLowerCase().includes(filteredValue.toLowerCase())
    );
  }, [assets, filteredValue]);

  return (
    <div className={classNames("w-full text-lightGreen", styles.darkGreenBox)}>
      <h3 className="pb-3 text-lightGreen">Price Feeds</h3>
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
                <Listbox.Options className="absolute mt-1 max-h-60 w-full min-w-[120px] overflow-auto rounded-md bg-green py-1 text-sm text-lightGreen ring-1 backdrop-blur focus:outline-none z-10">
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
            Price Feeds: {assets.length}
          </div>
        </div>
        <div className="sm:ml-auto">
          <SearchBar onInputChange={handleInputChange} />
        </div>
      </div>

      {loading ? (
        <div className="py-10 text-center font-mono text-sm text-lightGreen">
          Loading price feeds...
        </div>
      ) : (
        <div className="overflow-x-auto w-full">
          <DataTable columns={columns(selectedSource)} data={filteredAssets} />
        </div>
      )}

      {!loading && filteredAssets.length === 0 && (
        <div className="py-2 font-mono text-xs text-lightGreen">
          No results for your search
        </div>
      )}
    </div>
  );
};

export default AssetList;
