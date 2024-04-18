import React from "react";
import classNames from "classnames";
import styles from "./styles.module.scss";
import GreenUpperText from "./GreenUpperText";
import GreenText from "./GreenText";
import { ButtonLink } from "./Button";
import Image from "next/image";

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
    <h2 className="pb-5 text-lightGreen">{title}</h2>
    <GreenText isAligned={false} className="mb-auto">
      {generalText}
    </GreenText>
    <Image
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
