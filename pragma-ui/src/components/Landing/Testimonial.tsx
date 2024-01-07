import React from "react";
import styles from "./styles.module.scss";
import classNames from "classnames";
import GreenText from "../common/GreenText";
import { ButtonLink } from "../common/Button";
import GreenUpperText from "../common/GreenUpperText";
import GreenTitle from "../common/GreenTitle";
import GreenBox from "../common/GreenBox";
import { TestimonialCarousel } from "./TestimonialCarousel";

const Testimonial = () => (
  <div
    className={classNames(
      "align-row max-w-screen flex gap-28 overflow-hidden py-28"
    )}
  >
    <div className="flex w-5/12 flex-col justify-center">
      <GreenUpperText className="pb-3">Meet our users</GreenUpperText>
      <GreenTitle className="pb-6">Trusted by innovators</GreenTitle>
      <GreenText>
        Pragma Network has a uniquely robust and transparent architecture made
        possible by leveraging new zk-technology.
      </GreenText>
    </div>
    <div className=" relative w-6/12">
      <img src="/assets/vectors/lightDot.svg" className={styles.lightDot1} />
      <img src="/assets/vectors/lightDot.svg" className={styles.lightDot2} />
      <TestimonialCarousel />
    </div>
  </div>
);

export default Testimonial;
