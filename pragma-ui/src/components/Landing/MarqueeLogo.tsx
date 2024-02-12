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
    name: "carmine",
    src: "/assets/ecosystem/carmine.svg",
    link: "https://carmine.finance/",
  },
  {
    name: "haiko",
    src: "/assets/ecosystem/haiko.svg",
    link: "https://haiko.xyz/",
  },
  {
    name: "zklend",
    src: "/assets/ecosystem/zklendfull.svg",
    link: "https://canvas.co/",
  },
  {
    name: "starknet",
    src: "/assets/ecosystem/starknet.png",
    link: "https://zklend.com/",
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
    name: "avnu",
    src: "/assets/ecosystem/avnu.svg",
    link: "https://avnu.fi/",
  },
  {
    name: "nimbora",
    src: "/assets/ecosystem/nimbora.svg",
    link: "https://nimbora.io/",
  },
  {
    name: "propeller heads",
    src: "/assets/ecosystem/propeller.svg",
    link: "https://propellerheads.xyz/",
  },
  {
    name: "flowdesk",
    src: "/assets/ecosystem/flowdesk.svg",
    link: "https://flowdesk.co/",
  },
  {
    name: "skynet",
    src: "/assets/ecosystem/skynet.svg",
    link: "https://skynettrading.com/",
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
          <a
            key={index}
            rel="noreferrer"
            target="_blank"
            className="relative z-10 my-auto flex items-center justify-center"
            href={link}
          >
            <img className="my-auto h-8 px-8" src={src} alt={name} />
          </a>
        ))}
      </Marquee>
    </div>
  );
};

export default MarqueeLogo;
