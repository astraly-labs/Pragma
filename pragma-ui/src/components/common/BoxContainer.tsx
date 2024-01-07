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
      "flex w-full flex-row items-center gap-8 p-8 pb-0",
      modeOne ? "" : "",
      className
    )}
    {...props}
  >
    {children}
  </div>
);

export default BoxContainer;
