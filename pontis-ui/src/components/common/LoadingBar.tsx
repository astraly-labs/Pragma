import React from "react";
import classNames from "classnames";

interface LoadingBarProps {
  className?: string;
}

const LoadingBar: React.FC<LoadingBarProps> = ({ className }) => (
  <div
    className={classNames(
      "h-4 w-24 animate-pulse rounded-2xl bg-slate-200",
      className
    )}
  />
);

export default LoadingBar;
