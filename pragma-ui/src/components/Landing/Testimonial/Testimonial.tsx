import React from "react";
import styles from "../styles.module.scss";
import classNames from "classnames";
import GreenText from "../../common/GreenText";
import GreenUpperText from "../../common/GreenUpperText";
import TestimonialCarousel from "./TestimonialCarousel";
import Image from "next/image";

const Testimonial = () => (
  <div
    className={classNames(
      "flex w-full flex-col gap-14 overflow-hidden py-14 lg:flex-row lg:py-28 lg:px-10 xl:gap-28"
    )}
  >
    <div className="flex w-full flex-col justify-center lg:w-6/12">
      <GreenUpperText className="pb-3">Meet our users</GreenUpperText>
      <h2 className="pb-6 text-lightGreen">Trusted by innovators</h2>
      <GreenText>
        World class builders already leverage Pragma. Here is what they think
        about it.
      </GreenText>
    </div>
    <div className="relative w-full lg:w-6/12">
      <img
        alt="greenDot"
        src="/assets/vectors/lightDot.svg"
        className={styles.lightDot1}
      />
      <img
        alt="greenDot"
        src="/assets/vectors/lightDot.svg"
        className={styles.lightDot2}
      />
      <TestimonialCarousel />
    </div>
  </div>
);

export default Testimonial;
