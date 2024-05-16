import React from "react";
import classNames from "classnames";
import styles from "./styles.module.scss";
import Image from "next/image";
import DoubleText from "./DoubleText";

interface BlurBoxProps {
  ticker: string;
  fullName: string;
  title: string;
  generalText: string;
  textButton: string;
  linkButton: string;
  textButton2: string;
  linkButton2: string;
  className?: string;
  props?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >;
}

const AssetHeader = ({ isAsset, assets }) => {
  return (
    <div
      className={classNames(
        "w-full flex-col justify-between gap-8 md:flex-row md:gap-5",
        styles.greenBox
      )}
    >
      <h2 className="my-auto flex flex-row items-center gap-4 text-lightGreen">
        <Image height={60} width={60} alt="arrowDown" src={assets.image} />
        {assets.ticker}
      </h2>
      <div className="flex flex-row gap-10 lg:gap-20">
        <div className="flex flex-col gap-4">
          <DoubleText bigText={`$${assets.price}`} smolText={"Price"} />
          <DoubleText bigText={assets.type} smolText={"Asset Type"} />
        </div>
        <div className="flex flex-col gap-4">
          <DoubleText bigText={assets.sources} smolText={"Nb Sources"} />
          <DoubleText bigText={"soon"} smolText={"1h EMA"} />
        </div>
        <div className="flex flex-col gap-4">
          <DoubleText bigText={assets.lastUpdated} smolText={"Last Updated"} />
          <DoubleText bigText={"soon"} smolText={"1h MACD"} />
        </div>
      </div>
    </div>
  );
};

export default AssetHeader;
