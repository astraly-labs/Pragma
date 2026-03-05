"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { staggerContainer, staggerItem, fadeInUp } from "@/lib/animations";
import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { publisherColumns } from "@/app/(dashboard)/assets/_components/publishers-table/columns";
import { DataProviderInfo } from "@/app/(dashboard)/assets/_types";
import type { DataType } from "@/app/(dashboard)/assets/_helpers/getPublishers";
import styles from "@/components/Assets/styles.module.scss";
import { SearchBar } from "./searchbar";
import { DataTable } from "./data-table";

const getDisplayLabel = (option: string): string => {
  switch (option) {
    case "api":
      return "API";
    default:
      return option;
  }
};

type PublisherListProps = {
  options: string[];
  publishers: DataProviderInfo[];
  selectedSource?: string;
  loading: boolean;
  dataType: DataType;
  onDataTypeChange: (dt: DataType) => void;
};

export const PublisherList = ({
  options,
  publishers,
  selectedSource,
  loading,
  dataType,
  onDataTypeChange,
}: PublisherListProps) => {
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

  const filteredPublishers = publishers.filter((publisher) =>
    publisher.name.toLowerCase().includes(filteredValue.toLowerCase())
  );

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className={clsx("w-full text-lightGreen", styles.darkGreenBox)}
    >
      <motion.div variants={staggerItem}>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-lightGreen">Data Providers</h3>

          {/* Spot / Perp toggle */}
          <div className="flex items-center rounded-full border border-lightBlur p-0.5">
            {(["Spot", "Perp"] as DataType[]).map((dt) => (
              <button
                key={dt}
                onClick={() => onDataTypeChange(dt)}
                className={clsx(
                  "relative rounded-full px-5 py-1.5 text-sm font-medium transition-all duration-200",
                  dataType === dt
                    ? "bg-mint text-darkGreen shadow-[0_0_12px_rgba(21,255,129,0.25)]"
                    : "text-lightGreen hover:text-white"
                )}
              >
                {dt}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 flex w-full flex-col-reverse gap-3 sm:flex-row">
          <div className="flex flex-col gap-3 smolScreen:flex-row">
            <div ref={dropdownRef} className="relative w-full md:w-auto">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative flex w-full cursor-pointer flex-row justify-center rounded-full border border-lightBlur px-6 py-2.5 text-center text-sm text-lightGreen transition-colors hover:border-lightGreen/40 focus:outline-none"
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
              <span className="font-mono text-mint">{publishers.length}</span>
              <span className="opacity-60">providers</span>
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
              Loading {dataType.toLowerCase()} providers...
            </span>
          </motion.div>
        ) : filteredPublishers.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center gap-2 py-16"
          >
            <span className="text-2xl">&#8709;</span>
            <span className="font-mono text-sm text-lightGreen/60">
              No {dataType.toLowerCase()} providers found
            </span>
          </motion.div>
        ) : (
          <motion.div
            key={`table-${dataType}`}
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="mt-2 overflow-x-auto"
          >
            <DataTable columns={publisherColumns} data={filteredPublishers} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
