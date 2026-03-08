"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { staggerContainer, staggerItem, fadeInUp } from "@/lib/animations";
import styles from "@/components/Assets/styles.module.scss";
import clsx from "clsx";
import Image from "next/image";
import { AssetInfo } from "@/app/(dashboard)/assets/_types";
import { SearchBar } from "./searchbar";
import { useRouter } from "next/navigation";
import { columns } from "./assets-table/columns";
import { DataTable } from "./data-table";

const getDisplayLabel = (option: string): string => {
  switch (option) {
    case "api":
      return "API";
    default:
      return option;
  }
};

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

  const filteredAssets = useMemo(() => {
    return assets.filter((asset) =>
      asset?.ticker?.toLowerCase().includes(filteredValue.toLowerCase())
    );
  }, [assets, filteredValue]);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className={clsx("w-full text-lightGreen", styles.darkGreenBox)}
    >
      <motion.div variants={staggerItem}>
        <h3 className="pb-3 text-lg text-lightGreen sm:text-3xl">
          Price Feeds
        </h3>
        <div className="flex w-full flex-col gap-3 sm:flex-row-reverse">
          <div className="flex flex-col gap-3 smolScreen:flex-row">
            <div ref={dropdownRef} className="relative w-full md:w-auto">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative flex w-full cursor-pointer flex-row justify-center rounded-full border border-lightBlur px-6 py-2.5 text-center text-sm text-lightGreen transition-colors hover:border-lightGreen/40 focus:outline-hidden"
              >
                <span className="block truncate">
                  {getDisplayLabel(selectedSource || "")}
                </span>
                <Image
                  className="my-auto pl-2"
                  height={16}
                  width={16}
                  alt="arrowDown"
                  src="/assets/vectors/arrowDown.svg"
                />
              </button>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 4, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.97 }}
                    transition={{ duration: 0.12 }}
                    className="absolute z-10 mt-1 max-h-60 w-full min-w-[120px] overflow-auto rounded-lg border border-lightBlur bg-darkGreen/95 py-1 text-sm text-lightGreen backdrop-blur-xl"
                  >
                    {options.map((option) => (
                      <button
                        key={option}
                        className="relative w-full cursor-pointer select-none px-4 py-2.5 text-left text-lightGreen transition-colors hover:bg-lightBlur hover:text-white"
                        onClick={() => {
                          router.push(`/assets?source=${option}`, {
                            scroll: false,
                          });
                          setIsOpen(false);
                        }}
                      >
                        <span
                          className={clsx(
                            "block truncate",
                            option === selectedSource
                              ? "font-medium text-mint"
                              : "font-normal"
                          )}
                        >
                          {getDisplayLabel(option)}
                        </span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="my-auto flex w-full flex-row items-center justify-center gap-2 rounded-full border border-lightBlur px-5 py-2.5 text-center text-sm text-lightGreen md:w-auto">
              <span className="font-mono text-mint">{assets.length}</span>
              <span className="opacity-60">feeds</span>
            </div>
          </div>
          <div className="sm:ml-auto">
            <SearchBar onInputChange={setFilteredValue} />
          </div>
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center gap-3 py-16"
          >
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-lightGreen/20 border-t-mint" />
            <span className="font-mono text-sm text-lightGreen/60">
              {selectedSource === "api"
                ? "Connecting to API stream..."
                : "Loading price feeds..."}
            </span>
          </motion.div>
        ) : filteredAssets.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center gap-2 py-16"
          >
            <span className="text-2xl">&#8709;</span>
            <span className="font-mono text-sm text-lightGreen/60">
              No price feeds found
            </span>
          </motion.div>
        ) : (
          <motion.div
            key="table"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="mt-2 w-full"
          >
            <DataTable
              columns={columns(selectedSource)}
              data={filteredAssets}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AssetList;
