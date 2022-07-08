import React, { ReactNode } from "react";
import classNames from "classnames";

interface ContainerProps {
  className?: string;
  children: ReactNode;
  props?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >;
}

const SectionContainer: React.FC<ContainerProps> = ({
  className,
  children,
  ...props
}) => (
  <div
    className={classNames(
      "flex w-full flex-col items-center space-y-12 px-4 py-32 sm:px-6 lg:space-y-20 lg:py-40 lg:px-8",
      className
    )}
    {...props}
  >
    {children}
  </div>
);

export default SectionContainer;
