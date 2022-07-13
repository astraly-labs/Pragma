import React from "react";
import classNames from "classnames";
import {
  BadgeCheckIcon,
  BookOpenIcon,
  ChipIcon,
  SpeakerphoneIcon,
} from "@heroicons/react/outline";
import Dots from "./common/Dots";

interface Step {
  title: string;
  description: string;
  icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
}

const steps: Step[] = [
  {
    title: "Sign and publish",
    description:
      "Data publishers sign their data and publish it on-chain to the Oracle Controller via their account contract.",
    icon: SpeakerphoneIcon,
  },
  {
    title: "Quality control",
    description: "The data integrity committee checks the provided data.",
    icon: BadgeCheckIcon,
  },
  {
    title: "Aggregate data on chain",
    description: "The Oracle Implementation aggregates the data feeds.",
    icon: ChipIcon,
  },
  {
    title: "Read data from compute engine",
    description:
      "Our compute engines combine the verified data building blocks to create new data primitives, which can be read by your contracts.",
    icon: BookOpenIcon,
  },
];

const TimelineExplanation = () => (
  <ol role="list" className="relative w-full max-w-3xl">
    <Dots
      width={300}
      height={940}
      className="absolute inset-y-0 top-0 -translate-x-1/3 sm:-translate-y-10"
    />
    {steps.map((step, stepIdx) => (
      <li
        key={step.title}
        className={classNames("relative", {
          "pb-12 sm:pb-20": stepIdx !== steps.length - 1,
        })}
      >
        {stepIdx !== steps.length - 1 && (
          <div
            className="absolute top-6 left-6 -ml-1 h-full w-2 bg-indigo-500 sm:top-8 sm:left-8"
            aria-hidden="true"
          />
        )}
        <div className="relative flex items-start">
          <span className="relative flex items-center justify-center rounded-lg bg-indigo-500 p-3 ring-8 ring-white sm:p-4">
            <step.icon
              className="h-6 w-6 text-white sm:h-8 sm:w-8"
              aria-hidden="true"
            />
          </span>
          <span className="relative ml-8 flex w-full flex-col rounded-lg bg-white p-4 shadow-xl shadow-slate-900/10 sm:p-6">
            <div
              className="absolute top-1 right-2 font-mono text-8xl text-slate-200 sm:top-3 sm:right-6"
              aria-hidden="true"
            >
              {stepIdx + 1}
            </div>
            <h3 className="relative mb-3 text-xl font-semibold text-slate-900 sm:text-2xl">
              {step.title}
            </h3>
            <p className="prose prose-slate relative lg:prose-xl">
              {step.description}
            </p>
          </span>
        </div>
      </li>
    ))}
  </ol>
);

export default TimelineExplanation;
