import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import classNames from "classnames";
import Marquee from "react-fast-marquee";

interface Ecosystem {
  name: string;
  src: string;
  link: string;
}

const ecosystem: Ecosystem[] = [
  {
    name: "canvas",
    src: "/assets/ecosystem/canvas.png",
    link: "https://canvas.co/",
  },
  {
    name: "starknet",
    src: "/assets/ecosystem/starknet.png",
    link: "https://canvas.co/",
  },
  {
    name: "era",
    src: "/assets/ecosystem/era.png",
    link: "https://canvas.co/",
  },
  {
    name: "hashstack",
    src: "/assets/ecosystem/hashstack.png",
    link: "https://canvas.co/",
  },
  {
    name: "nostra",
    src: "/assets/ecosystem/nostra.png",
    link: "https://canvas.co/",
  },
  {
    name: "canvas",
    src: "/assets/ecosystem/canvas.png",
    link: "https://canvas.co/",
  },
  {
    name: "starknet",
    src: "/assets/ecosystem/starknet.png",
    link: "https://canvas.co/",
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
        {ecosystem.map(({ name, src, link }, index) => (
          <a target="_blank" className="relative z-10" href={link}>
            <img key={index} className="h-8 px-8" src={src} alt={name} />
          </a>
        ))}
      </Marquee>
    </div>
  );
};

export default MarqueeLogo;
