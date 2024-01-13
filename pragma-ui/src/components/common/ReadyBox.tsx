import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import classNames from "classnames";
import GreenText from "../common/GreenText";
import { ButtonLink } from "../common/Button";
import GreenUpperText from "../common/GreenUpperText";
import GreenTitle from "../common/GreenTitle";

const ReadyBox = () => {
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

  // Define different image sources based on screen size
  const getImageSource1 = () => {
    if (windowWidth < 640) {
      return "/assets/vectors/vector3bis.svg";
    } else {
      return "/assets/vectors/vector3.svg";
    }
  };

  return (
    <div className={classNames(styles.darkGreenBox)}>
      <GreenUpperText className="pb-3">Get in touch</GreenUpperText>
      <GreenTitle className="pb-6">Ready to get the data you need?</GreenTitle>
      <GreenText isAligned={false} className="max-w-3xl pb-10">
        Leverage recent breakthroughs in zero-knowledge computation by using
        verifiable and composable data in your decentralized application.
      </GreenText>
      <ButtonLink
        center={false}
        variant="solid"
        color="mint"
        href="/"
        className="mb-20"
      >
        Start building
      </ButtonLink>

      <img
        className="-z-1 absolute bottom-0 right-0 mx-auto h-full lg:w-10/12 2xl:w-auto"
        src={getImageSource1()}
      />
    </div>
  );
};

export default ReadyBox;
