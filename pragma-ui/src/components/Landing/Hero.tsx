import React from "react";
import styles from "./styles.module.scss";
import classNames from "classnames";
import GreenText from "../common/GreenText";
import { ButtonLink } from "../common/Button";

const Hero = () => (
  <div
    className={classNames(
      "flex w-screen justify-center align-middle",
      styles.videoBg
    )}
  >
    <header className="mt-32 flex flex-col justify-center space-y-10 text-center md:w-6/12 md:py-8 lg:py-10">
      <h1>
        <span className="text-primary relative md:whitespace-nowrap ">
          <span className={styles.heading}>The internet is now</span>
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
