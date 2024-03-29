import React from "react";

import { AssetKeyT } from "../../hooks/oracle";
import { assetKeyDisplayString } from "./AssetCard";
import AssetLogo from "./AssetLogo";

interface AssetNameProps {
  assetKey: AssetKeyT;
}

const AssetCardName: React.FC<AssetNameProps> = ({ assetKey }) => (
  <div className="flex flex-row items-center">
    <AssetLogo assetKey={assetKey} className="mr-2 h-5 md:mr-3" />
    <span className="font-sans text-lg uppercase sm:text-xl md:text-2xl">
      {assetKeyDisplayString(assetKey)}
    </span>
  </div>
);

export default AssetCardName;
