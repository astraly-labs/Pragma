import React, { useState } from "react";
import { AssetKeyT } from "../../hooks/oracle";
import { getLogoPath } from "../../../utils/mappings";
import Image from "next/image";

interface AssetLogoProps {
  assetKey: AssetKeyT;
  className: string;
}

const AssetLogo: React.FC<AssetLogoProps> = ({ assetKey, className }) => {
  // The error state here is needed to prevent an infinite loop if 'fallback.svg' doesn't exist.
  // This stops the browser from sending GET requests.
  const [isError, setIsError] = useState(false);
  return (
    <Image
      src={isError ? "/assets/currencies/fallback.svg" : getLogoPath(assetKey)}
      alt={`${assetKey} logo`}
      className={className}
      onError={() => setIsError(true)}
    />
  );
};

export default AssetLogo;
