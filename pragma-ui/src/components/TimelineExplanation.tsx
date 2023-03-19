import React from "react";
import classNames from "classnames";
import {
  CloudUploadIcon,
  DatabaseIcon,
  LockClosedIcon,
  ShieldCheckIcon,
} from "@heroicons/react/outline";
import Dots from "./common/Dots";

interface Step {
  title: string;
  description: string;
  icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
}

const steps: Step[] = [
  {
    title: "Timestamp & Sign",
    description: "Data sources timestamp and sign their proprietary data.",
    icon: LockClosedIcon,
  },
  {
    title: "Publish",
    description:
      "The data sources themselves publish their signed data on-chain, directly sending it to the Pragma oracle contract via their account contract.",
    icon: CloudUploadIcon,
  },
  {
    title: "Verify",
    description:
      "The Pragma oracle contract verifies that the data is valid, including checks on its signature, timestamp and value.",
    icon: ShieldCheckIcon,
  },
  {
    title: "Persist",
    description:
      "Finally, once the data has been verified on-chain, it is stored transparently for future retrieval by smart contracts that need to interact with the real world — whether that is via price feeds, computational feeds or other data.",
    icon: DatabaseIcon,
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
            className="absolute top-6 left-6 -ml-1 h-full w-2 bg-secondary sm:top-8 sm:left-8"
            aria-hidden="true"
          />
        )}
        <div className="relative flex items-start">
          <span className="relative flex items-center justify-center rounded-lg bg-secondary p-3 ring-8 ring-dark sm:p-4">
            <step.icon
              className="h-6 w-6 text-white sm:h-8 sm:w-8"
              aria-hidden="true"
            />
          </span>
          <span className="relative ml-8 flex w-full flex-col rounded-lg bg-dark p-4 shadow-xl shadow-slate-900/10 sm:p-6">
            <div
              className="absolute top-1 right-2 font-sans text-8xl text-black sm:top-3 sm:right-6"
              aria-hidden="true"
            >
              {stepIdx + 1}
            </div>
            <h3 className="relative mb-3 text-xl font-semibold text-white sm:text-2xl">
              {step.title}
            </h3>
            <p className="prose prose-slate relative text-grey lg:prose-xl">
              {step.description}
            </p>
          </span>
        </div>
      </li>
    ))}
  </ol>
);

export default TimelineExplanation;
