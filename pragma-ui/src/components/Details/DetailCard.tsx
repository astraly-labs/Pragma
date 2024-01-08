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
      className="hover:bg-secondary group flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-lg bg-black px-4 py-6 shadow-lg duration-300 hover:shadow-xl sm:px-6 sm:py-10"
      onClick={() => setShowDescription(!showDescription)}
    >
      {showDescription ? (
        <p className="prose prose-slate flex-grow group-hover:text-slate-50">
          {description}
        </p>
      ) : (
        <div className="flex flex-grow flex-row-reverse items-end justify-between sm:flex-col sm:items-start">
          <div className="rounded-lg bg-black bg-opacity-30 p-3 ring-2 ring-white ring-opacity-5 group-hover:bg-black">
            {img}
          </div>
          <div className="text-secondary font-mono text-3xl font-bold group-hover:text-slate-50 sm:mt-10 sm:text-4xl md:mt-12 xl:text-5xl">
            {toDisplay}
          </div>
        </div>
      )}
      <figcaption className="text-secondary mt-4 flex flex-row justify-between group-hover:text-slate-50 sm:mt-2">
        <p>{label}</p>
        <span>
          {showDescription ? (
            <InformationCircleIcon className="stroke-secondary h-5 w-5 group-hover:stroke-slate-50" />
          ) : (
            <QuestionMarkCircleIcon className="stroke-secondary h-5 w-5 group-hover:stroke-slate-50" />
          )}
        </span>
      </figcaption>
    </figure>
  );
};

export default DetailCard;
