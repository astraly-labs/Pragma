import React from "react";
import classNames from "classnames";
import Dots from "../common/Dots";
import Feature, { BulletPoint } from "./Feature";

export interface FeatureGridProps {
  title: string;
  bulletPoints: BulletPoint[];
  imgSrc: string;
  imgLeft: boolean;
}

const FeatureGrid: React.FC<FeatureGridProps> = ({
  title,
  bulletPoints,
  imgSrc,
  imgLeft,
}) => (
  <div className="relative grid-flow-row-dense overflow-hidden lg:grid lg:grid-cols-2 lg:items-center lg:gap-8 ">
    <Dots
      width={404}
      height={784}
      className={classNames(
        "absolute hidden lg:block",
        imgLeft ? "right-full translate-x-1/2" : "left-full -translate-x-1/2"
      )}
    />
    <div className={classNames("relative", { "lg:col-start-2": imgLeft })}>
      <Feature title={title} bulletPoints={bulletPoints} />
    </div>

    <div
      className={classNames("relative mt-10 lg:mt-0", {
        "lg:col-start-1": imgLeft,
      })}
      aria-hidden="true"
    >
      <Dots
        width={784}
        height={404}
        className="absolute left-1/2 -translate-x-1/2 translate-y-16 lg:hidden"
      />
      <img
        className={classNames(
          "relative mx-auto w-[245px] sm:w-[490px]",
          imgLeft ? "sm:mr-auto sm:ml-0" : "sm:ml-auto sm:mr-0"
        )}
        src={imgSrc}
        alt=""
        aria-hidden="true"
      />
    </div>
  </div>
);

export default FeatureGrid;
