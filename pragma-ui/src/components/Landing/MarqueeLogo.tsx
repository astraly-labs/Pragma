import React from "react";
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

const MarqueeLogo = () => (
  <div className={classNames(styles.boxMarquee)}>
    <Marquee>
      {ecosystem.map(({ name, src }) => (
        <img className="h-8 px-8" src={src} alt={name} />
      ))}
    </Marquee>
  </div>
);

export default MarqueeLogo;
