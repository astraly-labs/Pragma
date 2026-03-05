import Image from "next/image";
import clsx from "clsx";
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
  <div className={clsx(className, styles.blurBox)} {...props}>
    <div
      className="pointer-events-none absolute inset-0 rounded-[20px] opacity-[0.03]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
      }}
    />
    <GreenUpperText className="pb-3">{firstText}</GreenUpperText>
    <h2 className="pb-5 text-lightGreen">{title}</h2>
    <GreenText isAligned={false} className="mb-auto">
      {generalText}
    </GreenText>
    <Image
      className={`${styles.svgIllustration} animate-float`}
      height={400}
      width={900}
      src={urlSvg}
      alt="Illustration SVG"
    />
    <div className="z-10 [&_div]:transition-shadow [&_div]:hover:shadow-[0_0_30px_rgba(21,255,129,0.3)]">
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
