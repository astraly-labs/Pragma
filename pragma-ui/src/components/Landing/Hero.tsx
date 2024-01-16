import React from "react";
import styles from "./styles.module.scss";
import classNames from "classnames";
import GreenText from "../common/GreenText";
import { ButtonLink } from "../common/Button";
import Lottie from "react-lottie-player";
import animationHero from "../../../public/pragma_hero.json";

const Hero = () => {
  return (
    <div className="relative h-full w-full">
      <div className="hidden h-full md:block">
        <Lottie
          loop
          animationData={animationHero}
          play
          style={{
            width: "100%",
            position: "absolute",
            left: 0,
          }}
        />
      </div>
      <div className="block md:hidden">
        <Lottie
          loop
          animationData={animationHero}
          play
          style={{
            position: "absolute",
            width: "100%",
            height: "100vw",
            transform: "rotate(90deg)",
          }}
        />
      </div>
      {/* <div className={classNames("hidden md:block", styles.heroFilter)}></div> */}
      <div
        className={classNames(
          "flex w-full justify-center align-middle",
          styles.videoBg
        )}
      >
        <header className="z-1 relative mx-5 flex flex-col justify-center space-y-10 py-24 text-center md:mx-0 md:w-8/12 md:py-8 lg:my-24 lg:w-6/12">
          <h1 className=" pt-32">
            <span className="relative text-lightGreen md:whitespace-nowrap">
              <span className={styles.heading}>The Internet is now</span>
            </span>
            <br />
            <span className={styles.verifiable}>verifiable</span>
          </h1>
          <GreenText isAligned={true}>
            Pragma is the first zk-oracle, providing access to internet data
            from blockchains in a verifiable way. Star(k)t building more
            efficient and safer applications now.
          </GreenText>
          <ButtonLink center={true} color="mint" variant="solid" href="/">
            Start Building
          </ButtonLink>
        </header>
      </div>
    </div>
  );
};

export default Hero;
