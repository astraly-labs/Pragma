import React from "react";
import classNames from "classnames";
import styles from "./styles.module.scss";
import CheckpointComp from "./CheckpointComp";

const Checkpoints = ({ components }) => {
  return (
    <div
      className={classNames(
        "z-1 w-full flex-col justify-between gap-0",
        styles.greenBoxPrice
      )}
    >
      <h4 className="text-lightGreen">Checkpoints</h4>
      <div className="w-full overflow-x-scroll">
        <div className={styles.priceComp}>
          <div className="flex flex-row gap-2	 font-mono text-xs text-LightGreenFooter md:tracking-wider">
            Hash
          </div>
          <div className="flex flex-row gap-2 font-mono text-xs text-LightGreenFooter md:tracking-wider"></div>
          <div className="flex flex-row gap-2 font-mono text-xs text-LightGreenFooter md:tracking-wider"></div>

          <div className="flex flex-row gap-2 font-mono text-xs text-LightGreenFooter md:tracking-wider">
            Price
          </div>

          <div className="flex flex-row gap-2 font-mono text-xs text-LightGreenFooter md:tracking-wider">
            Date
          </div>
          <div className="flex flex-row gap-2 font-mono text-xs text-LightGreenFooter md:tracking-wider">
            Hour
          </div>
          <div className="flex flex-row gap-2 font-mono text-xs text-LightGreenFooter md:tracking-wider">
            Signer
          </div>
        </div>
        {components.length > 0 ? (
          components.map((component, index) => (
            <CheckpointComp key={index} component={component} />
          ))
        ) : (
          <div className="pt-4 font-mono tracking-wider text-lightGreen">
            No checkpoints on this pair
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkpoints;
