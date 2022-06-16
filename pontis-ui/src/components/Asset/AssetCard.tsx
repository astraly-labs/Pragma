import React from "react";
import { RightOutlined } from "@ant-design/icons";

import { AssetKeyT, useOracleGetValue } from "../../hooks/oracle";
import AssetName from "./AssetCardName";
import AssetCardPrice from "./AssetCardPrice";
import AssetCardTime from "./AssetCardTime";
import LoadingBar from "./LoadingBar";

interface AssetCardProps {
  assetKey: AssetKeyT;
}

const AssetCard: React.FC<AssetCardProps> = ({ assetKey }) => {
  const { oracleResponse, error } = useOracleGetValue(assetKey);
  return (
    <div className="bg-slate-50 shadow-lg hover:shadow-xl rounded-xl flex flex-row overflow-hidden w-full cursor-pointer">
      <div className="w-full max-w-full grid grid-cols-2 sm:grid-cols-3 grid-rows-2 sm:grid-rows-1 text-slate-900 mx-4 py-4 gap-y-3">
        <div className="place-self-start col-span-1 row-span-1">
          <AssetName assetKey={assetKey} />
        </div>
        {/* {error === undefined ? (
          <React.Fragment>
            <AssetCardPrice response={oracleResponse} />
            <AssetCardTime
              response={oracleResponse}
            />
          </React.Fragment>
        ) : (
          <div>
            <div>Error fetching price for {assetKey.toLocaleUpperCase()}.</div>
            <div>Please try again later.</div>
          </div>
        )} */}

        {oracleResponse?.value !== undefined || false ? (
          oracleResponse.lastUpdatedTimestamp === 0 ? (
            <div>No results found for {assetKey.toLocaleUpperCase()}</div>
          ) : (
            <React.Fragment>
              <div className="col-start-2 col-span-1 row-start-1 row-span-2 flex justify-end items-start sm:row-span-1 sm:place-self-center">
                <AssetCardPrice price={oracleResponse.value} />
              </div>
              <div className="col-start-1 row-start-2 row-span-1 col-span-1 sm:col-start-3 sm:row-start-1 place-self-start sm:place-self-end">
                <AssetCardTime
                  lastUpdatedTimestamp={oracleResponse.lastUpdatedTimestamp}
                />
              </div>
            </React.Fragment>
          )
        ) : error !== undefined ? (
          <div>
            <div>Error fetching price for {assetKey.toLocaleUpperCase()}.</div>
            <div>Please check the console for details and try again later.</div>
          </div>
        ) : (
          <React.Fragment>
            <LoadingBar />
            <LoadingBar />
          </React.Fragment>
        )}
      </div>
      <div className="bg-slate-300 w-12 sm:w-16 md:w-24 flex flex-row items-center justify-center">
        <RightOutlined className="text-slate-900 text-2xl" />
        {/* <img src="/assets/chevron-right.svg" alt="right arrow" /> */}
      </div>
    </div>
  );
};

export default AssetCard;
