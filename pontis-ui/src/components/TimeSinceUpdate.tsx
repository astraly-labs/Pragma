import React, { useState } from "react";

const TimeSinceUpdate = ({
  lastUpdatedTimestamp,
}: {
  lastUpdatedTimestamp: number;
}) => {
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

  const minuteStr = minutesSinceUpdate == 1 ? "minute" : "minutes";

  return (
    <div className="px-4">
      Last updated:{" "}
      {minutesSinceUpdate !== 0 && `${minutesSinceUpdate} ${minuteStr} and `}
      {secondsSinceUpdate} seconds ago
    </div>
  );
};

export default TimeSinceUpdate;
