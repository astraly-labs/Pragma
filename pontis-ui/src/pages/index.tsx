import React, { useState } from "react";
import AssetKeyPicker from "../components/AssetKeyPicker";
import { AssetsSection } from "../components/AssetsSection";
import CurrentPrice from "../components/CurrentPrice";
import { Hero } from "../components/Hero";
import { AssetKeyT } from "../hooks/oracle";

const IndexPage = () => {
  const [currentKey, setCurrentKey] = useState<AssetKeyT>("eth/usd");

  const handleKeyChange = (newKey: AssetKeyT) => {
    setCurrentKey(newKey);
  };

  return (
    <div className="mx-auto">
      <section className="w-screen">
        <Hero />
        <AssetsSection />
      </section>
      {/* <AssetKeyPicker
        selectedAssetKey={currentKey}
        onKeyChange={handleKeyChange}
      />
      <CurrentPrice key={currentKey} assetKey={currentKey} /> */}
    </div>
  );
};

export default IndexPage;
