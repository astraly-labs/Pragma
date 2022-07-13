import React from "react";
import classNames from "classnames";

interface LoadingBarProps {
  className: string;
}

const LoadingBar: React.FC<LoadingBarProps> = ({ className }) => (
  <div
    className={classNames("animate-pulse rounded-2xl bg-slate-300", className)}
  />
);

export default LoadingBar;
