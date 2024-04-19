import React from "react";
import classNames from "classnames";
import GreenUpperText from "../common/GreenUpperText";
import GreenText from "../common/GreenText";
import { ButtonLink } from "../common/Button";
import Image from "next/image";

const DataProviders = () => (
  <div
    className={classNames(
      "flex w-full flex-col gap-14 overflow-hidden py-14 lg:flex-row lg:py-28 lg:px-10 xl:gap-28"
    )}
  >
    <div className="flex w-full flex-col items-center justify-center md:items-start lg:w-6/12">
      <GreenUpperText className="pb-3">Data Providers</GreenUpperText>
      <h2 className="pb-6 text-lightGreen">Data you can trust</h2>
      <GreenText className="pb-10 text-center md:text-left">
        20+ data providers alreday provide data for Pragma. You have first-class
        data and want to monetize it in order to help DeFi being safer?
      </GreenText>
      <ButtonLink
        variant="solid"
        color="mint"
        center={false}
        href="/"
        className="w-fit"
      >
        Discover now
      </ButtonLink>
    </div>
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden lg:w-6/12">
      <Image
        src="/assets/vectors/vector4.svg"
        alt="divider"
        className="absolute z-0 w-full"
      />
      <div className="flex flex-col gap-4 p-6">
        <h2 className="text-center text-lightGreen">10,000,000</h2>
        <GreenUpperText className="text-center">Data points</GreenUpperText>
      </div>
      <div className="mt-4 flex translate-y-6 flex-col gap-4 p-6">
        <h2 className="text-center text-lightGreen">50,000</h2>
        <GreenUpperText className="text-center">Updates 24h</GreenUpperText>
      </div>
    </div>
  </div>
);

export default DataProviders;
