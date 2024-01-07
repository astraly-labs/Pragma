import React, { ReactNode } from "react";
import classNames from "classnames";
import styles from "./styles.module.scss";

interface ContainerProps {
  modeOne?: boolean;
  className?: string;
  children: ReactNode;
  props?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >;
}

const GreenBox: React.FC<ContainerProps> = ({
  modeOne,
  className,
  children,
  ...props
}) => (
  <div
    className={classNames(styles.greenBox, modeOne ? "" : "", className)}
    {...props}
  >
    {children}
  </div>
);

export default GreenBox;
