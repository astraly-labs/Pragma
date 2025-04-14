import Image from "next/image";
import classNames from "classnames";
import styles from "./styles.module.scss";
import GreenUpperText from "./GreenUpperText";
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

const BlurBox = ({
  firstText,
  title,
  generalText,
  urlSvg,
  textButton,
  linkButton,
  className,
  ...props
}: BlurBoxProps) => (
  <div className={classNames(className, styles.blurBox)} {...props}>
    <GreenUpperText className="pb-3">{firstText}</GreenUpperText>
    <h2 className="pb-5 text-lightGreen">{title}</h2>
    <GreenText isAligned={false} className="mb-auto">
      {generalText}
    </GreenText>
    <Image
      className={styles.svgIllustration}
      height={400}
      width={900}
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
