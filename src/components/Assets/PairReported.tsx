"use client";

import React, { useState, useMemo } from "react";
import styles from "./styles.module.scss";
import PairReportedComp from "./PairReportedComp";
import { SearchBar } from "@/app/(dashboard)/assets/_components/searchbar";

const PairReported = ({ components }) => {
  const [filteredValue, setFilteredValue] = useState("");

  const handleInputChange = (value) => {
    setFilteredValue(value);
  };

  const filteredComponents = useMemo(() => {
    if (!filteredValue) return components;

    return components.filter((component) =>
      Object.values(component).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(filteredValue.toLowerCase())
      )
    );
  }, [components, filteredValue]);

  return (
    <div className="explorer-panel">
      <div className="flex w-full flex-col gap-3 py-3 sm:flex-row">
        <h2 className="explorer-detail-heading">Published observations</h2>
        <div className="text-lightGreen sm:ml-auto">
          <SearchBar
            label="Search observations"
            onInputChange={handleInputChange}
          />
        </div>
      </div>
      <div className="w-full overflow-x-scroll">
        <div className={styles.pairComp}>
          <div className="flex flex-row gap-2	 font-mono text-xs text-LightGreenFooter md:tracking-wider">
            Price Feed
          </div>
          <div className="flex flex-row gap-2 font-mono text-xs text-LightGreenFooter md:tracking-wider">
            Source
          </div>
          <div className="flex flex-row gap-2 font-mono text-xs text-LightGreenFooter md:tracking-wider">
            Last Updated
          </div>
          <div className="flex flex-row gap-2 font-mono text-xs text-LightGreenFooter md:tracking-wider">
            Price Reported
          </div>
          <div className="flex flex-row gap-2 font-mono text-xs text-LightGreenFooter md:tracking-wider">
            24h Updates
          </div>
        </div>
        {filteredComponents.map((component, index) => (
          <PairReportedComp key={index} component={component} />
        ))}
        {filteredComponents.length === 0 ? (
          <div className="py-2 font-mono text-xs text-lightGreen">
            No results for your search
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default PairReported;
