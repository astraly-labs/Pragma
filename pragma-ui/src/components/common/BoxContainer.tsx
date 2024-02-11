import React, { ReactNode } from "react";
import classNames from "classnames";

interface ContainerProps {
  modeOne?: boolean;
  className?: string;
  children: ReactNode;
  props?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >;
}

const BoxContainer: React.FC<ContainerProps> = ({
  modeOne,
  className,
  children,
  ...props
}) => (
  <div
    className={classNames(
      "mx-auto flex w-full flex-col items-center gap-8 overflow-hidden p-3 pb-0 sm:p-8 sm:pb-0 md:w-11/12 lg:flex-row",
      modeOne ? "" : "",
      className
    )}
    {...props}
  >
    {children}
  </div>
);

export default BoxContainer;
