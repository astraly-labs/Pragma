import React, { ReactNode } from "react";
import classNames from "classnames";
import styles from "./styles.module.scss";

interface GreenTextProps {
  isAligned?: boolean;
  className?: string;
  children: ReactNode;
}

const GreenText: React.FC<GreenTextProps> = ({
  isAligned,
  className,
  children,
  ...props
}) => (
  <div
    className={classNames(
      styles.greenText,
      isAligned ? "text-center" : "text-left",
      className
    )}
    {...props}
  >
    {children}
  </div>
);

export default GreenText;
