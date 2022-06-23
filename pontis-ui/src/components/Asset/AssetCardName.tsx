import React, { useState } from "react";

import { AssetKeyT } from "../../hooks/oracle";

/**
 *
 * @param {AssetKeyT} assetKey string containing the coin abbreviation delimited by a '/'
 * @return {string} returns string that matches corresponding file name in /assets/logos
 */
function getLogo(assetKey: AssetKeyT): string {
  const indexOfSlash = assetKey.indexOf("/");
  return indexOfSlash > 0
    ? assetKey.slice(0, indexOfSlash).toLowerCase()
    : "fallback";
}

interface AssetNameProps {
  assetKey: AssetKeyT;
}

const AssetCardName: React.FC<AssetNameProps> = ({ assetKey }) => {
  // The error state here is needed to prevent an infinite loop if 'fallback.svg' doesn't exist.
  // This stops the browser from sending GET requests.
  const [isError, setIsError] = useState(false);
  const logoString = getLogo(assetKey);

  return (
    <div className="flex flex-row items-center">
      <img
        src={
          isError
            ? "/assets/currencies/fallback.svg"
            : `/assets/currencies/${logoString}.svg`
        }
        alt={`${logoString} logo`}
        className="mr-2 h-5 md:mr-3"
        onError={() => setIsError(true)}
      />
      <span className="font-mono text-lg uppercase sm:text-xl md:text-2xl">
        {assetKey.toLocaleUpperCase()}
      </span>
    </div>
  );
};

export default AssetCardName;
