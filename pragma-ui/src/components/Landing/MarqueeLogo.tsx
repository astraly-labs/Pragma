import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import classNames from "classnames";
import Marquee from "react-fast-marquee";

interface Ecosystem {
  name: string;
  src: string;
}

const ecosystem: Ecosystem[] = [
  {
    name: "canvas",
    src: "/assets/ecosystem/canvas.png",
  },
  {
    name: "starknet",
    src: "/assets/ecosystem/starknet.png",
  },
  {
    name: "era",
    src: "/assets/ecosystem/era.png",
  },
  {
    name: "hashstack",
    src: "/assets/ecosystem/hashstack.png",
  },
  {
    name: "nostra",
    src: "/assets/ecosystem/nostra.png",
  },
  {
    name: "canvas",
    src: "/assets/ecosystem/canvas.png",
  },
  {
    name: "starknet",
    src: "/assets/ecosystem/starknet.png",
  },
];

const MarqueeLogo = () => {
  const [gradientW, setgradientW] = useState(300);

  useEffect(() => {
    const handleResize = () => {
      // Update the number of visible slides based on screen width
      if (window.innerWidth < 400) {
        setgradientW(50); // For smaller screens, show fewer slides
      } else if (window.innerWidth < 640) {
        setgradientW(100); // For medium screens, show a moderate number
      } else {
        setgradientW(300); // For larger screens, show more slides
      }
    };

    // Listen for window resize events
    window.addEventListener("resize", handleResize);

    // Call handleResize on initial load
    handleResize();

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={classNames(styles.boxMarquee)}>
      <Marquee
        gradient={true}
        gradientColor="#082F28"
        gradientWidth={gradientW}
      >
        {ecosystem.map(({ name, src }, index) => (
          <img key={index} className="h-8 px-8" src={src} alt={name} />
        ))}
      </Marquee>
    </div>
  );
};

export default MarqueeLogo;
