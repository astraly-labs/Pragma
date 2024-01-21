import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import classNames from "classnames";
import GreenText from "../common/GreenText";
import { ButtonLink } from "../common/Button";
import GreenUpperText from "../common/GreenUpperText";

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

  // Define different image sources based on screen size
  const getImageSource1 = () => {
    if (windowWidth < 640) {
      return "/assets/vectors/vector3bis.svg";
    } else {
      return "/assets/vectors/vector3.svg";
    }
  };

  const getImageSource2 = () => {
    if (windowWidth < 640) {
      return "/assets/vectors/vector5bis.svg";
    } else {
      return "/assets/vectors/vector5.svg";
    }
  };

  return (
    <div
      className={classNames(
        version ? styles.darkGreenBox : styles.darkGreenBoxBis
      )}
    >
      <GreenUpperText className="pb-3">Get in touch</GreenUpperText>
      <h2
        className={classNames(
          "pb-6 leading-loose text-lightGreen",
          version ? "" : "w-full md:w-5/12"
        )}
      >
        Ready to get the data you need?
      </h2>
      <GreenText
        isAligned={false}
        className={classNames(
          "max-w-3xl pb-10",
          version ? "" : "w-full md:w-5/12"
        )}
      >
        Leverage recent breakthroughs in zero-knowledge computation by using
        verifiable and composable data in your decentralized application.
      </GreenText>
      <ButtonLink
        center={false}
        variant="solid"
        color="mint"
        href="/"
        className={classNames(version ? "mb-20" : "mb-40 md:mb-0")}
      >
        Start building
      </ButtonLink>

      <img
        className={classNames(
          "bottom-0 right-0 -z-10 mx-auto lg:w-10/12 2xl:w-auto",
          version ? "absolute h-full" : "absolute w-full"
        )}
        src={version ? getImageSource1() : getImageSource2()}
      />
    </div>
  );
};
export default ReadyBox;
