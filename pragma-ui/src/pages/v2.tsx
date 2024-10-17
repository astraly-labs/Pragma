import React from "react";
import styles from "./styles.module.scss";
import classNames from "classnames";
import V2Hero from "../components/v2/v2Hero";
import BoxContainer from "../components/common/BoxContainer";
import Features from "../components/v2/features";
import Join from "../components/v2/join";

const v2 = () => (
  <div
    className={classNames(
      "relative w-full overflow-x-hidden",
      styles.bigScreen
    )}
  >
    <V2Hero
      title={"Pragma"}
      purpleTitle={"v2"}
      description={
        "Permissionless, programable, and scalable. Unlock a whole new world of possibilities. Available now on testnet."
      }
      solidButton={"Read docs"}
      solidButtonLink={"https://docs.pragma.build/"}
      illustrationLink={"/assets/vectors/Nodes.svg"}
    ></V2Hero>
    <BoxContainer>
      <video
        className=" w-full rounded-3xl border border-lightGreen" // Adjust styles as needed
        controls
        autoPlay
        muted // Added muted to allow autoplay in most browsers
        loop // Added loop for continuous playback
      >
        <source src="/assets/lottie/videov2.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </BoxContainer>
    <BoxContainer>
      <Features />
    </BoxContainer>
    <BoxContainer>
      <Join />
    </BoxContainer>
  </div>
);

export default v2;
