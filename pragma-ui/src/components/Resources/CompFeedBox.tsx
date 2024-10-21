import React from "react";
import styles from "./styles.module.scss";
import { ButtonLink } from "../common/Button";
import GreenText from "../common/GreenText";
import Image from "next/image";

const CompFeedBox = () => {
  return (
    <div className={styles.darkGreenBoxBis}>
      <div className="my-auto w-full items-center lg:w-10/12">
        <h2 className="mb-4 text-center text-lightGreen lg:text-left">
          Computational Feeds
        </h2>
        <GreenText
          isAligned={false}
          className="mb-10 text-center  lg:text-left"
        >
          Leverage the highest-quality data available and apply any desired
          logic on top. Everything is STARK-proven, guaranteeing the security of
          the computation. Composability and modularity are now achievable for
          oracles.
        </GreenText>
        <ButtonLink
          variant="outline"
          color="mint"
          href="https://docs.pragma.build/Resources/Starknet/computational-feeds/what-are-computational-feeds"
          center={false}
          className="mr-auto ml-auto w-fit lg:ml-0"
        >
          Integrate CF
        </ButtonLink>
      </div>
      <Image
        className="items-center align-middle"
        src="/assets/vectors/compFeed.svg"
        width={900}
        height={400}
        alt="Computational Feed Illustration"
      />
    </div>
  );
};
export default CompFeedBox;
