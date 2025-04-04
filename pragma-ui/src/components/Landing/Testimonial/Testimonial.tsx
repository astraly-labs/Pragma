import Image from "next/image";
import classNames from "classnames";
import styles from "@/pages/styles.module.scss";
import GreenText from "@/components/common/GreenText";
import GreenUpperText from "@/components/common/GreenUpperText";
import TestimonialCarousel from "./TestimonialCarousel";

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
      <TestimonialCarousel />
    </div>
  </div>
);

export default Testimonial;
