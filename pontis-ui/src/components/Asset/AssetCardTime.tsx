import React, { useState } from "react";
import { ClockIcon } from "@heroicons/react/outline";

interface AssetNameProps {
  lastUpdatedTimestamp: number;
}

const AssetCardTime: React.FC<AssetNameProps> = ({ lastUpdatedTimestamp }) => {
  const getCurrentTimestampSeconds = () =>
    Math.round(new Date().getTime() / 1000);

  const [currentTimestampSeconds, setCurrentTimestampSeconds] =
    useState<number>(getCurrentTimestampSeconds());

  const updateCurrentTimestampSeconds = () => {
    setCurrentTimestampSeconds(getCurrentTimestampSeconds());
  };
  const minutesSinceUpdate = Math.floor(
    (currentTimestampSeconds - lastUpdatedTimestamp) / 60
  );
  const secondsSinceUpdate = Math.round(
    currentTimestampSeconds - lastUpdatedTimestamp - minutesSinceUpdate * 60
  );

  setInterval(updateCurrentTimestampSeconds, 1000);
  return (
    <div className="flex flex-row items-center space-x-2 md:space-x-3">
      <ClockIcon className="w-6 text-slate-900" />
      {/* {loading ? ( */}
      {/* <div className="w-12 h-2 bg-slate-200 animate-pulse" />
      ) : ( */}
      <div className="font-mono text-base text-slate-900">
        {minutesSinceUpdate !== 0 && (
          <span className="sm:text-xl md:text-2xl">{minutesSinceUpdate}</span>
        )}
        {minutesSinceUpdate !== 0 && "min "}
        <span className="sm:text-xl md:text-2xl">{secondsSinceUpdate}</span>sec
      </div>
      {/* )} */}
    </div>
  );
};

export default AssetCardTime;
