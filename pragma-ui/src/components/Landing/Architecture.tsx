import React from "react";
import styles from "./styles.module.scss";
import classNames from "classnames";
import GreenText from "../common/GreenText";
import GreenUpperText from "../common/GreenUpperText";
import GreenTitle from "../common/GreenTitle";

const Architecture = () => (
  <div className={classNames("align-center w-full", styles.darkGreenBox)}>
    <GreenUpperText className="mx-auto pb-3">Our Architecture</GreenUpperText>
    <GreenTitle className="mx-auto pb-6">The first provable oracle</GreenTitle>
    <GreenText isAligned={true} className="mx-auto max-w-3xl pb-10">
      Pragma utilizes STARK proofs to ensure data correctness. Explore how we
      achieve this while maintaining a 200ms latency in running the oracle,
      enabling composability and programmability.
    </GreenText>
    <img className="mx-auto w-10/12" src="/architecture.gif" />
  </div>
);

export default Architecture;
