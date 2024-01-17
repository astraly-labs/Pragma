import React from "react";
import classNames from "classnames";
import styles from "./styles.module.scss";
import GreenUpperText from "./GreenUpperText";
import GreenTitle from "./GreenTitle";
import GreenText from "./GreenText";
import { ButtonLink } from "./Button";

interface BlurBoxProps {
  greenText: string;
  firstText: string;
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

const BlurBoxEcosystem: React.FC<BlurBoxProps> = ({
  greenText,
  firstText,
  title,
  generalText,
  textButton,
  linkButton,
  textButton2,
  linkButton2,
  className,
  ...props
}) => (
  <div className={classNames(className, styles.blurBoxEcosystem)} {...props}>
    <GreenUpperText className="pb-3">{firstText}</GreenUpperText>
    <GreenTitle className="pb-5">
      <span className="text-mint">{greenText}</span> {title}
    </GreenTitle>
    <GreenText isAligned={false} className="mb-auto">
      {generalText}
    </GreenText>
    <div className="mt-auto flex flex-col gap-6 pt-5 md:flex-row md:pt-20">
      <ButtonLink
        variant="outline"
        color="mint"
        center={false}
        href={linkButton}
      >
        {textButton}
      </ButtonLink>
      <ButtonLink
        variant="outline"
        color="mint"
        center={false}
        href={linkButton2}
      >
        {textButton2}
      </ButtonLink>
    </div>
  </div>
);

export default BlurBoxEcosystem;
