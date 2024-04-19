import React from "react";
import styles from "./styles.module.scss";
import { ButtonLink } from "../common/Button";
import GreenText from "../common/GreenText";
import Image from "next/image";

const CompFeedBox = () => {
  return (
    <div className={styles.darkGreenBoxBis}>
      <div className="my-auto w-10/12 items-center">
        <h2 className="mb-4 text-lightGreen">Computational Feeds</h2>
        <GreenText isAligned={false} className="mb-10">
          Leverage the highest-quality data available and apply any desired
          logic on top. Everything is STARK-proven, guaranteeing the security of
          the computation. Composability and modularity are now achievable for
          oracles.
        </GreenText>
        <ButtonLink
          variant="outline"
          color="mint"
          href="https://docs.pragma.build/Resources/Cairo%201/computational-feeds/what-are-computational-feeds"
          center={false}
          className="w-fit"
        >
          Integrate CF
        </ButtonLink>
      </div>
      <Image
        className="items-center align-middle"
        src="/assets/vectors/compFeed.svg"
        alt="Computational Feed Illustration"
      />
    </div>
  );
};
export default CompFeedBox;
