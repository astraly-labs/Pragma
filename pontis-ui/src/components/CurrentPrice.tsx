import React from "react";
import { AssetKeyT, useOracleGetValue } from "../hooks/oracle";
import TimeSinceUpdate from "./TimeSinceUpdate";

const CurrentPrice = ({ assetKey }: { assetKey: AssetKeyT }) => {
  const { oracleResponse, error } = useOracleGetValue(assetKey);

  return (
    <div>
      {oracleResponse?.value !== undefined ? (
        oracleResponse.lastUpdatedTimestamp === 0 ? (
          <div>
            <div className="text-8xl text-transparent mt-4">Hidden</div>
            <div>No results found for {assetKey.toLocaleUpperCase()}</div>
          </div>
        ) : (
          <div>
            <div className="inline text-8xl">
              <div className="inline">{Math.floor(oracleResponse.value)}</div>
              <div className="sm:inline text-2xl">
                {(oracleResponse.value - Math.floor(oracleResponse.value))
                  .toFixed(6)
                  .toString()
                  .slice(1)}
              </div>
            </div>
            <div className="my-4">
              <TimeSinceUpdate
                lastUpdatedTimestamp={oracleResponse.lastUpdatedTimestamp}
              />
            </div>
          </div>
        )
      ) : error !== undefined ? (
        <div>
          <div className="text-8xl text-transparent">Hidden</div>
          <div>Error fetching price for {assetKey.toLocaleUpperCase()}.</div>
          <div>Please check the console for details and try again later.</div>
        </div>
      ) : (
        <div>
          <div className="text-8xl text-transparent mt-4">Hidden</div>Loading...
        </div>
      )}
    </div>
  );
};

export default CurrentPrice;
