import React from "react";
import classNames from "classnames";
import styles from "./styles.module.scss";
import PairReportedComp from "./PairReportedComp";

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
        <div className={styles.pairComp}>
          <div className="flex flex-row gap-2	 font-mono text-xs text-LightGreenFooter md:tracking-wider">
            Price Feed
          </div>
          <div className="flex flex-row gap-2 font-mono text-xs text-LightGreenFooter md:tracking-wider">
            Last Updated
          </div>

          <div className="flex flex-row gap-2 font-mono text-xs text-LightGreenFooter md:tracking-wider">
            Price Reported
          </div>
          <div className="flex flex-row gap-2 font-mono text-xs text-LightGreenFooter md:tracking-wider">
            24h Updates
          </div>
        </div>
        {components.map((component, index) => (
          <PairReportedComp key={index} component={component} />
        ))}
      </div>
    </div>
  );
};

export default PairReported;
