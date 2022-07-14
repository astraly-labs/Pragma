import React from "react";
import classNames from "classnames";
import Dots from "../common/Dots";
import FeatureItem, { Feature } from "./FeatureItem";

interface FeatureGridProps {
  title: string;
  description: string | React.ReactElement;
  features: Feature[];
  imgSrc: string;
  imageLeft: boolean;
}

const FeatureGrid: React.FC<FeatureGridProps> = ({
  title,
  description,
  features,
  imgSrc,
  imageLeft,
}) => (
  <div className="relative grid-flow-row-dense overflow-hidden lg:grid lg:grid-cols-2 lg:items-center lg:gap-8 ">
    <Dots
      width={404}
      height={784}
      className={classNames(
        "absolute hidden lg:block",
        imageLeft ? "right-full translate-x-1/2" : "left-full -translate-x-1/2"
      )}
    />
    <div className={classNames("relative", { "lg:col-start-2": imageLeft })}>
      <h3 className="text-2xl font-medium tracking-tight text-slate-900 sm:text-3xl">
        {title}
      </h3>
      <p className="mt-4 text-lg text-slate-600">{description}</p>

      <dl className="mt-10 space-y-10">
        {features.map((feature) => (
          <FeatureItem key={feature.name} {...feature} />
        ))}
      </dl>
    </div>

    <div
      className={classNames("relative mt-10 lg:mt-0", {
        "lg:col-start-1": imageLeft,
      })}
      aria-hidden="true"
    >
      <Dots
        width={784}
        height={404}
        className="absolute left-1/2 -translate-x-1/2 translate-y-16 lg:hidden"
      />
      <img className="relative mx-auto" width={490} src={imgSrc} alt="" />
    </div>
  </div>
);

export default FeatureGrid;
