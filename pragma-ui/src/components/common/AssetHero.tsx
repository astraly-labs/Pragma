import React from "react";
import GreenText from "../common/GreenText";
import { ButtonLink } from "../common/Button";
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
        className="absolute right-0 bottom-0 ml-auto mr-auto hidden w-full translate-y-48 opacity-60 md:block lg:hidden"
      />
      <Image
        src={illustrationSmallLink}
        height={400}
        width={900}
        alt="Illustration Hero"
        className="absolute right-0 left-0 bottom-0 ml-auto mr-auto  block w-full translate-y-10 opacity-60 md:hidden"
      />
      <div className="flex w-full">
        <header className="z-1 relative mx-5 flex w-full flex-col justify-center space-y-10 pb-32 text-center md:mx-0 md:w-8/12 md:justify-start md:py-8 md:pl-20 md:text-left lg:my-32 lg:w-5/12 xl:mx-5">
          <h1 className="pt-32 text-lightGreen md:whitespace-nowrap">
            {title}
            <br />
            <span className="text-mint">{greenTitle}</span>
          </h1>
          <GreenText className="text-center md:text-left">
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
