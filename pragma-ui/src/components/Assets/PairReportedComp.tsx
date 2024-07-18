import React from "react";
import styles from "./styles.module.scss";
import Image from "next/image";
import Link from "next/link";

const PairReportedComp = ({ component }) => {
  return (
    <div className={styles.pairComp}>
      <Link
        href={`/asset/${component.ticker}`}
        className="my-auto flex flex-row gap-4 text-LightGreenFooter md:tracking-wider"
      >
        <Image height={30} width={30} alt="AssetImage" src={component.image} />
        <div className="flex flex-col text-lg text-lightGreen">
          {component.ticker}
          <div className="font-mono text-xs uppercase text-LightGreenFooter md:tracking-wider">
            {component.type}
          </div>
        </div>
      </Link>
      <div className="my-auto flex flex-row gap-2 font-mono text-sm text-lightGreen md:tracking-wider">
        {component.lastUpdated}
      </div>

      <div className="my-auto flex flex-row gap-2 font-mono text-sm text-lightGreen md:tracking-wider">
        {component.price}
      </div>
      <div className=" my-auto flex cursor-pointer flex-row gap-2 font-mono text-sm text-lightGreen md:tracking-wider">
        {component.dailyUpdates}
      </div>
    </div>
  );
};

export default PairReportedComp;
