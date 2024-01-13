import React from "react";
import styles from "./styles.module.scss";
import classNames from "classnames";
import GreenText from "../common/GreenText";
import { ButtonLink } from "../common/Button";

const Hero = () => (
  <div
    className={classNames(
      "flex w-full justify-center align-middle",
      styles.videoBg
    )}
  >
    <header className="mx-5 my-32 flex flex-col justify-center space-y-10 text-center md:mx-0 md:w-8/12 md:py-8 lg:w-6/12 lg:py-10">
      <h1 className="mt-32">
        <span className="relative text-lightGreen md:whitespace-nowrap">
          <span className={styles.heading}>The Internet is now</span>
        </span>
        <br />
        <span className={styles.verifiable}>verifiable</span>
      </h1>
      <GreenText isAligned={true}>
        Pragma is the first zk-oracle, providing access to internet data from
        blockchains in a verifiable way. Star(k)t building more efficient and
        safer applications now.
      </GreenText>
      <ButtonLink center={true} color="mint" variant="solid" href="/">
        Start Building
      </ButtonLink>
    </header>
  </div>
);

export default Hero;
