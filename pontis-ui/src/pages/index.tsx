import React, { useState } from "react";
import AssetKeyPicker from "../components/AssetKeyPicker";
import CurrentPrice from "../components/CurrentPrice";
import { AssetKeyT } from "../hooks/oracle";

const IndexPage = () => {
  const [currentKey, setCurrentKey] = useState<AssetKeyT>("eth/usd");

  const handleKeyChange = (newKey: AssetKeyT) => {
    setCurrentKey(newKey);
  };

  return (
    <div className="m-auto text-center text-xl">
      <AssetKeyPicker
        selectedAssetKey={currentKey}
        onKeyChange={handleKeyChange}
      />
      <CurrentPrice key={currentKey} assetKey={currentKey} />
    </div>
  );
};

export default IndexPage;
