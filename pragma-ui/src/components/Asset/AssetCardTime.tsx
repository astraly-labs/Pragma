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
      <ClockIcon className="text-grey w-6" />
      <div className="text-grey font-sans text-base">
        <span className="sm:text-xl md:text-2xl">
          {minutesSinceUpdate}:{secondsSinceUpdate < 10 && "0"}
          {secondsSinceUpdate}
        </span>{" "}
        min
      </div>
    </div>
  );
};

export default AssetCardTime;
