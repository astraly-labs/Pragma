import React, { useState } from "react";

import BigButton from "./BigButton";
import { getOracleControllerAddress } from "../services/address.service";
import {
  buildExplorerUrlForAddress,
  networkId,
} from "../services/wallet.service";

const ActionsSection: React.FC = () => {
  const [isFirstActive, setIsFirstActive] = useState(true);

  return (
    <section className="w-screen bg-slate-50 py-40 px-6 sm:px-24 md:px-32">
      <div className="mx-auto flex w-full max-w-7xl flex-row flex-wrap space-y-16 sm:space-y-0">
        <div className="basis-full sm:basis-1/2">
          <BigButton
            name="Learn more"
            isActive={isFirstActive}
            handleMouseEnter={() => setIsFirstActive(true)}
            href="https://42labs-xyz.notion.site/Pontis-a0cc65b11f4442e080f5698e2eefe051"
          />
        </div>
        <div className="basis-full sm:basis-1/2">
          <BigButton
            name="Voyager"
            isActive={!isFirstActive}
            handleMouseEnter={() => setIsFirstActive(false)}
            href={buildExplorerUrlForAddress(
              getOracleControllerAddress(networkId())
            )}
          />
        </div>
      </div>
    </section>
  );
};

export default ActionsSection;
