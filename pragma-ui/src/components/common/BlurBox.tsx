import React from "react";
import classNames from "classnames";
import styles from "./styles.module.scss";
import GreenUpperText from "./GreenUpperText";
import GreenTitle from "./GreenTitle";
import GreenText from "./GreenText";
import { ButtonLink } from "./Button";

interface BlurBoxProps {
  firstText: string;
  title: string;
  generalText: string;
  urlSvg: string;
  textButton: string;
  linkButton: string;
  className?: string;
  props?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >;
}

const BlurBox: React.FC<BlurBoxProps> = ({
  firstText,
  title,
  generalText,
  urlSvg,
  textButton,
  linkButton,
  className,
  ...props
}) => (
  <div className={classNames(className, styles.blurBox)} {...props}>
    <GreenUpperText className="pb-3">{firstText}</GreenUpperText>
    <GreenTitle className="pb-5">{title}</GreenTitle>
    <GreenText isAligned={false} className="mb-auto">
      {generalText}
    </GreenText>
    <img
      className={styles.svgIllustration}
      src={urlSvg}
      alt="Illustration SVG"
    />
    <div className="z-10">
      <ButtonLink
        variant="outline"
        color="mint"
        center={false}
        href={linkButton}
      >
        {textButton}
      </ButtonLink>
    </div>
  </div>
);

export default BlurBox;
