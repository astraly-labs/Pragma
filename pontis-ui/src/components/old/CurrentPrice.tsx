import React from "react";
import { AssetKeyT, useOracleGetValue } from "../../hooks/oracle";
import TimeSinceUpdate from "./TimeSinceUpdate";
import ReactLoading from "react-loading";

const DECIMALS_TO_SHOW = 10;

const CurrentPrice = ({ assetKey }: { assetKey: AssetKeyT }) => {
  const { oracleResponse, error } = useOracleGetValue(assetKey);

  return (
    <div className="my-4">
      {oracleResponse?.value !== undefined || false ? (
        oracleResponse.lastUpdatedTimestamp === 0 ? (
          <div>
            <div className="my-16">
              No results found for {assetKey.toLocaleUpperCase()}
            </div>
          </div>
        ) : (
          <div>
            <div className="inline font-mono">
              <div className="inline text-6xl sm:text-8xl">
                {Math.floor(oracleResponse.value)}
              </div>
              <div className="text-xl sm:inline sm:text-2xl">
                {(oracleResponse.value - Math.floor(oracleResponse.value))
                  .toFixed(DECIMALS_TO_SHOW)
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
        <div className="my-14">
          <div>Error fetching price for {assetKey.toLocaleUpperCase()}.</div>
          <div>Please check the console for details and try again later.</div>
        </div>
      ) : (
        <div>
          <ReactLoading
            className="mx-auto my-11 sm:my-9"
            height="100px"
            width="100px"
            type="bubbles"
            color="#fff"
          />
        </div>
      )}
    </div>
  );
};

export default CurrentPrice;
