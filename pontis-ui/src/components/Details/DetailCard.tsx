import React, { useState, ReactNode } from "react";
import {
  InformationCircleIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/outline";

interface DetailCardProps {
  label: string;
  toDisplay: ReactNode;
  img: ReactNode;
  description: string;
}

const DetailCard: React.FC<DetailCardProps> = ({
  label,
  toDisplay,
  img,
  description,
}) => {
  const [showDescription, setShowDescription] = useState(false);

  return (
    <figure
      className="group flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-lg bg-white px-4 py-6 shadow-lg duration-300 hover:bg-slate-500 hover:shadow-xl sm:px-6 sm:py-10"
      onClick={() => setShowDescription(!showDescription)}
    >
      {showDescription ? (
        <p className="prose prose-slate flex-grow group-hover:text-slate-50">
          {description}
        </p>
      ) : (
        <div className="flex flex-grow flex-row-reverse items-end justify-between sm:flex-col sm:items-start">
          {/* <div className="flex flex-row items-center justify-between"> */}
          <div className="rounded-lg bg-slate-300 bg-opacity-30 p-3 group-hover:bg-slate-50">
            {img}
          </div>
          {/* This is an indicator for changing prices */}
          {/* <div className="inline-flex text-sm text-gray-600 group-hover:text-gray-200 sm:text-base">
              <MinusCircleIcon className="mr-2 h-6 w-6 stroke-green-500 group-hover:stroke-slate-200" />
              12%
            </div> */}
          {/* </div> */}
          <div className="font-mono text-3xl font-bold text-slate-700 group-hover:text-slate-50 sm:mt-10 sm:text-4xl md:mt-12 xl:text-5xl">
            {toDisplay}
          </div>
        </div>
      )}
      <figcaption className="mt-4 flex flex-row justify-between group-hover:text-slate-50 sm:mt-2">
        <p>{label}</p>
        <span>
          {showDescription ? (
            <InformationCircleIcon className="h-5 w-5 stroke-indigo-500 group-hover:stroke-slate-50" />
          ) : (
            <QuestionMarkCircleIcon className="h-5 w-5 stroke-indigo-600 group-hover:stroke-slate-50" />
          )}
        </span>
      </figcaption>
    </figure>
  );
};

export default DetailCard;
