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
    <div className="flex w-full cursor-pointer flex-row overflow-hidden rounded-xl bg-slate-50 shadow-lg hover:shadow-xl">
      <div className="mx-4 grid w-full max-w-full grid-cols-2 grid-rows-2 gap-y-3 py-4 text-slate-900 sm:grid-cols-3 sm:grid-rows-1">
        <div className="col-span-1 row-span-1 place-self-start">
          <AssetName assetKey={assetKey} />
        </div>
        {oracleResponse?.value !== undefined || false ? (
          oracleResponse.lastUpdatedTimestamp === 0 ? (
            <div>No results found for {assetKey.toLocaleUpperCase()}</div>
          ) : (
            <React.Fragment>
              <div className="col-span-1 col-start-2 row-span-2 row-start-1 flex items-start justify-end sm:row-span-1 sm:place-self-center">
                <AssetCardPrice
                  price={oracleResponse.value}
                  assetKey={assetKey}
                />
              </div>
              <div className="col-span-1 col-start-1 row-span-1 row-start-2 sm:col-start-3 sm:row-start-1 sm:flex sm:items-center sm:justify-end">
                <AssetCardTime
                  lastUpdatedTimestamp={oracleResponse.lastUpdatedTimestamp}
                />
              </div>
            </React.Fragment>
          )
        ) : error !== undefined ? (
          <div className="col-span-2 col-start-2 row-span-2 sm:row-span-1">
            <div>Error fetching price for {assetKey.toLocaleUpperCase()}.</div>
            <div>Please try again later.</div>
          </div>
        ) : (
          <React.Fragment>
            <div className="place-self-center">
              <LoadingBar />
            </div>
            <div className="place-self-center">
              <LoadingBar />
            </div>
          </React.Fragment>
        )}
      </div>
      <div className="flex w-12 flex-row items-center justify-center bg-slate-300 sm:w-16 md:w-24">
        <RightOutlined className="text-2xl text-slate-900" />
      </div>
    </div>
  );
};

export default AssetCard;
