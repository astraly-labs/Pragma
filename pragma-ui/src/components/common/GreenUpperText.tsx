import React, { ReactNode } from "react";
import classNames from "classnames";

interface GreenUpperProps {
  children: ReactNode;
  className?: string;
}

const GreenUpperText: React.FC<GreenUpperProps> = ({
  children,
  className,
  ...props
}) => (
  <div
    className={classNames("text-sm uppercase leading-4 text-mint", className)}
    {...props}
  >
    {children}
  </div>
);

export default GreenUpperText;
