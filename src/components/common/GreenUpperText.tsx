import React, { ReactNode } from "react";
import clsx from "clsx";

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
    className={clsx(
      "text-sm uppercase leading-4 tracking-widest text-mint",
      className
    )}
    {...props}
  >
    {children}
  </div>
);

export default GreenUpperText;
