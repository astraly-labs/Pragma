import React from "react";
import styles from "./styles.module.scss";
import classNames from "classnames";
import GreenText from "../common/GreenText";
import { ButtonLink } from "../common/Button";
import GreenUpperText from "../common/GreenUpperText";
import GreenTitle from "../common/GreenTitle";

const ReadyBox = () => (
  <div className={classNames(styles.darkGreenBox)}>
    <GreenUpperText className="pb-3">Get in touch</GreenUpperText>
    <GreenTitle className="pb-6">Ready to get the data you need?</GreenTitle>
    <GreenText isAligned={false} className="max-w-3xl pb-10">
      Leverage recent breakthroughs in zero-knowledge computation by using
      verifiable and composable data in your decentralized application.
    </GreenText>
    <ButtonLink variant="solid" color="mint" href="/" className="mb-20">
      Start building
    </ButtonLink>

    <img
      className="absolute bottom-0 right-0 mx-auto h-full w-10/12"
      src="/assets/vectors/vector3.svg"
    />
  </div>
);

export default ReadyBox;
