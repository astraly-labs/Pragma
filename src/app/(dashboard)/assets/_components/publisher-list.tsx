"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/animations";
import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { publisherColumns } from "@/app/(dashboard)/assets/_components/publishers-table/columns";
import { DataProviderInfo } from "@/app/(dashboard)/assets/_types";
import styles from "@/components/Assets/styles.module.scss";
import { SearchBar } from "./searchbar";
import { DataTable } from "./data-table";

const getDisplayLabel = (option: string): string => {
  switch (option) {
    case "api":
      return "API (dev)";
    case "api-prod":
      return "API (prod)";
    default:
      return option;
  }
};

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
  const [filteredValue, setFilteredValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
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
        <h3 className="pb-3 text-lightGreen">Data Providers</h3>
      <div className="flex w-full flex-col-reverse gap-3 py-3 sm:flex-row">
        <div className="flex flex-col gap-3 smolScreen:flex-row">
          <div ref={dropdownRef} className="relative w-full md:w-auto">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative flex w-full cursor-pointer flex-row justify-center rounded-full border border-lightBlur px-6 py-3 text-center text-sm text-lightGreen focus:outline-none"
            >
              <span className="block truncate">{getDisplayLabel(selectedSource || "")}</span>
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
                {options.map((option, optionIdx) => (
                  <button
                    key={optionIdx}
                    className={`relative w-full cursor-pointer select-none py-2 pl-10 pr-4 text-left text-lightGreen hover:opacity-50`}
                    onClick={() => {
                      router.push(`/assets?source=${option}`, { scroll: false });
                      setIsOpen(false);
                    }}
                  >
                    <span
                      className={clsx(
                        "block truncate font-normal text-lightGreen",
                        {
                          "font-medium": option === selectedSource,
                        }
                      )}
                    >
                      {getDisplayLabel(option)}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="my-auto flex w-full flex-row justify-center rounded-full border border-lightBlur px-6 py-3 text-center text-sm text-lightGreen md:w-auto">
            Data Providers: {publishers.length}
          </div>
        </div>
        <div className="sm:ml-auto">
          <SearchBar onInputChange={setFilteredValue} />
        </div>
      </div>
      </motion.div>

      {loading ? (
        <div className="py-10 text-center font-mono text-sm text-lightGreen">
          Loading data providers...
        </div>
      ) : (
        <motion.div variants={staggerItem} className="overflow-x-auto">
          <DataTable columns={publisherColumns} data={filteredPublishers} />
        </motion.div>
      )}

      {!loading && filteredPublishers.length === 0 && (
        <motion.div variants={staggerItem} className="py-2 font-mono text-xs text-lightGreen">
          No results for your search
        </motion.div>
      )}
    </motion.div>
  );
};
