import React from "react";

import CurrentPrice from "./CurrentPrice";
import { AssetKeyT } from "../../hooks/oracle";

interface AssetCardProps {
  assetKey: AssetKeyT;
}

export const AssetCard: React.FC<AssetCardProps> = ({ assetKey }) => {
  return (
    <div className="bg-white shadow-xl rounded-xl max-w-3xl h-48 flex flex-col overflow-hidden">
      <div className="w-full max-w-full flex flex-row justify-between items-center text-slate-900 mx-4">
        <div className="text-3xl uppercase">{assetKey}</div>
        <CurrentPrice assetKey={assetKey} />
      </div>
      <div className="bg-slate-100 w-full flex flex-row items-center justify-end">
        <a className="bg-slate-600 text-slate-200 hover:bg-slate-500 px-4 py-2 rounded-sm mr-8">
          More info
        </a>
      </div>
    </div>
  );
};
