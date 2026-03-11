import React, { ReactNode } from "react";
import clsx from "clsx";

interface GreenUpperProps {
  children: ReactNode;
  className?: string;
}

const LightGreenUpper: React.FC<GreenUpperProps> = ({
  children,
  className,
  ...props
}) => (
  <div
    className={clsx("text-xs uppercase text-lightGreen opacity-50", className)}
    {...props}
  >
    {children}
  </div>
);

export default LightGreenUpper;
