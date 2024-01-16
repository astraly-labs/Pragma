import React from "react";
import styles from "./styles.module.scss";
import classNames from "classnames";
import GreenText from "../common/GreenText";
import GreenUpperText from "../common/GreenUpperText";
import GreenTitle from "../common/GreenTitle";
import Lottie from "react-lottie-player";
import animationHero from "../../../public/pragma_scheme.json";

const Architecture = () => (
  <div className={classNames("align-center w-full", styles.darkGreenBox)}>
    <GreenUpperText className="mx-auto pb-3">Our Architecture</GreenUpperText>
    <GreenTitle className="mx-auto pb-6">The first provable oracle</GreenTitle>
    <GreenText isAligned={true} className="mx-auto max-w-3xl pb-10">
      Pragma utilizes STARK proofs to ensure data correctness. Explore how we
      achieve this while maintaining a 200ms latency in running the oracle,
      enabling composability and programmability.
    </GreenText>
    <div className="m-auto w-full md:w-10/12">
      <Lottie
        loop
        animationData={animationHero}
        play
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  </div>
);

export default Architecture;
