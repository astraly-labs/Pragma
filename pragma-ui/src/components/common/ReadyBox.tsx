import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import GreenText from "../common/GreenText";
import { ButtonLink } from "../common/Button";
import GreenUpperText from "../common/GreenUpperText";
import Image from "next/image";

const ReadyBox = ({ version }) => {
  const [windowWidth, setWindowWidth] = useState(null);

  useEffect(() => {
    // Check if the window object is available
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);

      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };

      window.addEventListener("resize", handleResize);

      // Clean-up function to remove event listener
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const getImageSource = () => {
    if (windowWidth < 640) {
      return "/assets/vectors/vector5bis.svg";
    } else {
      return "/assets/vectors/vector5.svg";
    }
  };

  return (
    <div className={styles.darkGreenBoxBis}>
      <GreenUpperText className="pb-3">Get in touch</GreenUpperText>
      {version ? (
        <h2 className={"w-full pb-6 leading-loose text-lightGreen md:w-5/12"}>
          Ready to get the data you need?
        </h2>
      ) : (
        <h2 className={"w-full pb-6 leading-loose text-lightGreen md:w-5/12"}>
          Need help on ideas or integration?
        </h2>
      )}
      {version ? (
        <GreenText
          isAligned={false}
          className={"w-full max-w-3xl pb-10 md:w-5/12"}
        >
          Leverage recent breakthroughs in zero-knowledge computation by using
          verifiable and composable data in your decentralized application.
        </GreenText>
      ) : (
        <GreenText
          isAligned={false}
          className={"w-full max-w-3xl pb-10 md:w-5/12"}
        >
          We&apos;d love to hear from you, about your ideas and how we can help.
          Reach out!
        </GreenText>
      )}
      {version ? (
        <ButtonLink
          center={false}
          variant="solid"
          color="mint"
          href="https://docs.pragma.build/Resources/Consuming%20Data%20Feed"
          className={"mb-40 md:mb-0"}
        >
          Start building
        </ButtonLink>
      ) : (
        <ButtonLink
          center={false}
          variant="outline"
          color="mint"
          href="https://cal.com/0xmatteo/15min"
          className={"mb-40 md:mb-0"}
        >
          Book a call
        </ButtonLink>
      )}

      <Image
        className={
          "absolute bottom-0 right-0 -z-10 mx-auto w-full lg:w-10/12 2xl:w-auto"
        }
        width={900}
        height={400}
        src={getImageSource()}
        alt="vectorImage"
      />
    </div>
  );
};
export default ReadyBox;
