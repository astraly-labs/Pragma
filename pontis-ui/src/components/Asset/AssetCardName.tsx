import React from "react";

import { AssetKeyT } from "../../hooks/oracle";
<<<<<<< HEAD
=======
import { assetKeyDisplayString } from "./AssetCard";
>>>>>>> ui-v1.0
import AssetLogo from "./AssetLogo";

interface AssetNameProps {
  assetKey: AssetKeyT;
}

const AssetCardName: React.FC<AssetNameProps> = ({ assetKey }) => (
  <div className="flex flex-row items-center">
    <AssetLogo assetKey={assetKey} className="mr-2 h-5 md:mr-3" />
    <span className="font-mono text-lg uppercase sm:text-xl md:text-2xl">
<<<<<<< HEAD
      {assetKey.toLocaleUpperCase()}
=======
      {assetKeyDisplayString(assetKey)}
>>>>>>> ui-v1.0
    </span>
  </div>
);

export default AssetCardName;
