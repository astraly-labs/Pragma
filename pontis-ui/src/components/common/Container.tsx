import React, { ReactNode } from "react";
import classNames from "classnames";

interface ContainerProps {
  small?: boolean;
  className?: string;
  children: ReactNode;
  props?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >;
}

const Container: React.FC<ContainerProps> = ({
  small,
  className,
  children,
  ...props
}) => (
  <div
    className={classNames(
      "mx-auto px-4 py-12 sm:px-6 lg:py-24 lg:px-8",
      small ? "max-w-3xl" : "max-w-7xl",
      className
    )}
    {...props}
  >
    {children}
  </div>
);

export default Container;
