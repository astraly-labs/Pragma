import React from "react";
import GreenText from "./GreenText";
import { ButtonLink } from "./Button";
import Image from "next/image";

const AssetHero = ({
  title,
  greenTitle,
  description,
  solidButton,
  solidButtonLink,
  illustrationLink,
  illustrationSmallLink,
}) => {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <Image
        src={illustrationLink}
        height={400}
        width={900}
        alt="Illustration Hero"
        className="absolute bottom-0 right-0 hidden lg:block"
      />
      <Image
        src={illustrationSmallLink}
        height={400}
        width={800}
        alt="Illustration Hero"
        className="absolute right-0 bottom-0 hidden w-full translate-y-48 opacity-40 md:block lg:hidden"
      />
      <div className="flex w-full">
        <header className="z-1 relative flex w-full flex-col justify-center space-y-4 px-2 py-6 text-center sm:space-y-8 sm:px-5 sm:pb-24 md:w-8/12 md:justify-start md:py-8 md:pl-20 md:text-left lg:my-24 lg:w-5/12 xl:mx-5">
          <h1 className="text-2xl text-lightGreen sm:text-4xl md:whitespace-nowrap lg:text-6xl">
            {title}
            <br />
            <span className="text-mint">{greenTitle}</span>
          </h1>
          <GreenText className="text-center text-sm sm:text-base md:text-left">
            {description}
          </GreenText>
          <ButtonLink
            center={false}
            color="mint"
            variant="solid"
            href={solidButtonLink}
            className="m-auto w-fit md:m-0"
          >
            {solidButton}
          </ButtonLink>
        </header>
      </div>
    </div>
  );
};

export default AssetHero;
