import React from "react";
import classNames from "classnames";
import styles from "./styles.module.scss";
import PriceComponentComp from "./PriceComponentComp";

const PairReported = ({ components }) => {
  return (
    <div
      className={classNames(
        "z-1 w-full flex-col justify-between gap-0",
        styles.greenBoxPrice
      )}
    >
      <h4 className="text-lightGreen">Price Components</h4>
      <div className="w-full overflow-x-scroll">
        <div className={styles.priceComp}>
          <div className="flex flex-row gap-2	 font-mono text-xs text-LightGreenFooter md:tracking-wider">
            Publisher
          </div>
          <div className="flex flex-row gap-2 font-mono text-xs text-LightGreenFooter md:tracking-wider">
            Source
          </div>

          <div className="flex flex-row gap-2 font-mono text-xs text-LightGreenFooter md:tracking-wider">
            Price
          </div>
          <div className="flex flex-row gap-2 font-mono text-xs text-LightGreenFooter md:tracking-wider">
            Hash
          </div>
          <div className="flex flex-row gap-2 font-mono text-xs text-LightGreenFooter md:tracking-wider"></div>
          <div className="flex flex-row gap-2 font-mono text-xs text-LightGreenFooter md:tracking-wider"></div>

          <div className="flex flex-row gap-2 font-mono text-xs text-LightGreenFooter md:tracking-wider">
            Last Updated
          </div>
        </div>
        {components.map((component, index) => (
          <PriceComponentComp key={index} component={component} />
        ))}
      </div>
    </div>
  );
};

export default PairReported;
