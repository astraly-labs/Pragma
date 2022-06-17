import React from "react";
import classNames from "classnames";
import { ChevronRightIcon } from "@heroicons/react/outline";

interface BigButtonProps {
  name: string;
  isActive: boolean;
  handleMouseEnter: () => void;
}

const BigButton: React.FC<BigButtonProps> = ({
  name,
  isActive,
  handleMouseEnter,
}) => {
  return (
    <div className="h-48 w-full sm:h-[300px] lg:h-[500px]">
      <a
        className={classNames(
          "sm:text-4-xl flex h-full cursor-pointer flex-col justify-end border-[10px] border-slate-900 p-8 text-3xl font-bold text-slate-900 transition-all duration-300 ease-in motion-reduce:transition-none sm:border-0 sm:p-[84px] lg:text-5xl",
          { "sm:border-[20px] sm:p-16": isActive }
        )}
        onMouseEnter={handleMouseEnter}
      >
        <div className="mb-2 capitalize sm:mb-4 lg:mb-6">{name}</div>
        <div className="text-right">
          <ChevronRightIcon className="ml-auto w-12 lg:w-16" />
        </div>
      </a>
    </div>
  );
};

export default BigButton;
