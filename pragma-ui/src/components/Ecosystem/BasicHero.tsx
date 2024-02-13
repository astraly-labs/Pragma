import React from "react";
import styles from "./styles.module.scss";
import classNames from "classnames";
import GreenText from "../common/GreenText";
import { ButtonLink } from "../common/Button";

const BasicHero = ({
  title,
  greenTitle,
  description,
  solidButton,
  solidButtonLink,
  outlineButton,
  outlineButtonLink,
  illustrationLink,
  illustrationSmallLink,
}) => {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <img
        src={illustrationLink}
        alt="Illustration Hero"
        className="absolute bottom-0 right-0 hidden md:block"
      />
      <img
        src={illustrationSmallLink}
        alt="Illustration Hero"
        className="absolute right-0 left-0 bottom-0 ml-auto mr-auto block w-full md:hidden"
      />
      <div className={classNames("flex w-full")}>
        <header className="z-1 relative mx-5 flex flex-col justify-center space-y-10 pb-32 text-center md:mx-0 md:w-8/12 md:justify-start md:py-8 md:pl-20 md:text-left lg:my-32 lg:w-5/12">
          <h1 className=" pt-32">
            <span className="relative text-lightGreen md:whitespace-nowrap">
              <span className={styles.heading}>{title}</span>
            </span>
            <br />
            <span className={styles.verifiable}>{greenTitle}</span>
          </h1>
          <GreenText isAligned={false} className="hidden md:block">
            {description}
          </GreenText>
          <GreenText isAligned={true} className="block md:hidden">
            {description}
          </GreenText>
          <div className=" m-auto flex flex-col gap-6 md:m-0 md:flex-row">
            <ButtonLink
              center={false}
              color="mint"
              variant="solid"
              href={solidButtonLink}
              className="w-fit"
            >
              {solidButton}
            </ButtonLink>
            <ButtonLink
              center={false}
              color="mint"
              variant="outline"
              href={outlineButtonLink}
              className="w-full"
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
