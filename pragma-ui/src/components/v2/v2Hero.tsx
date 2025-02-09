import React from "react";
import classNames from "classnames";
import GreenText from "../common/GreenText";
import { ButtonLink } from "../common/Button";
import Image from "next/image";
import styles from "./styles.module.scss";

const V2Hero = ({
  title,
  purpleTitle,
  description,
  solidButton,
  solidButtonLink,
  illustrationLink,
  customButton,
}) => {
  return (
    <div className="relative h-[70vh] w-full overflow-hidden lg:h-screen">
      <Image
        src={illustrationLink}
        alt="Illustration Hero"
        layout="fill"
        objectFit="cover"
        className="absolute top-0 left-1/2 block w-full -translate-x-1/2 md:w-10/12 lg:w-10/12 xl:w-9/12"
      />
      <div className={classNames("flex h-full w-full")}>
        <div className={styles.gradV2}></div>
        <header className="relative mx-auto flex w-full max-w-4xl flex-col items-center justify-center space-y-8 px-4 text-center">
          <div className="text-sm uppercase text-lightGreen">Introducing</div>
          <h1 className="text-4xl font-semibold text-lightGreen md:whitespace-nowrap md:text-6xl">
            {title}{" "}
            <span
              className="font-semibold text-purple"
              style={{
                textShadow:
                  "0px 0px 67px rgba(137, 44, 255, 1), 0px 0px 14px rgba(255, 255, 255, 0.25)",
              }}
            >
              {purpleTitle}
            </span>
          </h1>
          <GreenText isAligned={true} className="text-lg md:text-xl">
            {description}
          </GreenText>
          <div className="flex flex-col items-center gap-6 md:flex-row">
            {customButton ? (
              customButton
            ) : (
              <ButtonLink
                center={true}
                color="mint"
                variant="solid"
                href={solidButtonLink}
                className="w-fit"
              >
                {solidButton}
              </ButtonLink>
            )}
          </div>
        </header>
      </div>
    </div>
  );
};

export default V2Hero;
