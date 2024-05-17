import React from "react";
import classNames from "classnames";
import styles from "./styles.module.scss";

interface BlurBoxProps {
  ticker: string;
  fullName: string;
  title: string;
  generalText: string;
  textButton: string;
  linkButton: string;
  textButton2: string;
  linkButton2: string;
  className?: string;
  props?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >;
}

const DoubleText = ({ bigText, smolText }) => {
  return (
    <div className={"flex flex-col"}>
      <div className="text-xs tracking-wider text-lightGreen sm:text-lg">
        {bigText}
      </div>
      <div className="font-mono text-xs tracking-wider text-LightGreenFooter sm:text-sm">
        {smolText}
      </div>
    </div>
  );
};

export default DoubleText;
