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
      <div className="text-lg tracking-wider text-lightGreen">{bigText}</div>
      <div className="font-mono text-sm tracking-wider text-LightGreenFooter">
        {smolText}
      </div>
    </div>
  );
};

export default DoubleText;
