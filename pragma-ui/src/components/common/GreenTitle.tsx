import React, { ReactNode } from "react";
import classNames from "classnames";

interface GreenTitleProps {
  children: ReactNode;
  className?: string;
}

const GreenTitle: React.FC<GreenTitleProps> = ({
  children,
  className,
  ...props
}) => (
  <div
    className={classNames(
      "text-3xl font-light  text-lightGreen md:text-5xl",
      className
    )}
    {...props}
  >
    {children}
  </div>
);

export default GreenTitle;
