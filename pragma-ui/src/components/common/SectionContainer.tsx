import React, { ReactNode } from "react";
import classNames from "classnames";

interface ContainerProps {
  first?: boolean;
  className?: string;
  children: ReactNode;
  props?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >;
}

const SectionContainer: React.FC<ContainerProps> = ({
  first,
  className,
  children,
  ...props
}) => (
  <div
    className={classNames(
      "flex w-full flex-col items-center space-y-12 px-4 sm:px-6 lg:space-y-20 lg:px-8",
      first ? "pt-12 pb-24 lg:pt-24 lg:pb-32" : "py-24 lg:py-32",
      className
    )}
    {...props}
  >
    {children}
  </div>
);

export default SectionContainer;
