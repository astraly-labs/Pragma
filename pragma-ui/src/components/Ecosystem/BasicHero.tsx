import React from "react";
import styles from "./styles.module.scss";
import classNames from "classnames";
import GreenText from "../common/GreenText";
import { ButtonLink } from "../common/Button";
import Lottie from "react-lottie-player";
import animationHero from "../../../public/pragma_hero.json";

const BasicHero = ({
  title,
  greenTitle,
  description,
  solidButton,
  solidButtonLink,
  outlineButton,
  outlineButtonLink,
  illustrationLink,
}) => {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <img
        src={illustrationLink}
        alt="Illustration Hero"
        className="absolute -bottom-80 md:bottom-0 md:right-0"
      />
      <div className={classNames("flex w-full")}>
        <header className="z-1 relative mx-5 flex flex-col justify-center space-y-10 py-24 text-center md:mx-0 md:w-8/12 md:justify-start md:py-8 md:pl-20 md:text-left lg:my-32 lg:w-5/12">
          <h1 className=" pt-32">
            <span className="relative text-lightGreen md:whitespace-nowrap">
              <span className={styles.heading}>{title}</span>
            </span>
            <br />
            <span className={styles.verifiable}>{greenTitle}</span>
          </h1>
          <GreenText isAligned={false}>{description}</GreenText>
          <div className=" flex flex-col gap-6 md:flex-row">
            <ButtonLink
              center={false}
              color="mint"
              variant="solid"
              href={solidButtonLink}
            >
              {solidButton}
            </ButtonLink>
            <ButtonLink
              center={false}
              color="mint"
              variant="outline"
              href={outlineButtonLink}
            >
              {outlineButton}
            </ButtonLink>
          </div>
        </header>
      </div>
    </div>
  );
};

export default BasicHero;
