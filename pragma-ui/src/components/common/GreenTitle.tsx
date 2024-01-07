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
      "leading-14 text-5xl font-light text-lightGreen	",
      className
    )}
    {...props}
  >
    {children}
  </div>
);

export default GreenTitle;
