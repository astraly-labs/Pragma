import React from "react";
import styles from "./styles.module.scss";
import classNames from "classnames";

const providersData = [
  {
    logo: "/assets/ecosystem/canvas.png",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus quis consequat tellus. Phasellus sed bibendum ex. Proin tortor lectus, cursus sit amet consequat non, vestibulum in nisi.",
  },
  {
    logo: "/assets/ecosystem/canvas.png",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus quis consequat tellus. Phasellus sed bibendum ex. Proin tortor lectus, cursus sit amet consequat non, vestibulum in nisi.",
  },
  {
    logo: "/assets/ecosystem/canvas.png",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus quis consequat tellus. Phasellus sed bibendum ex. Proin tortor lectus, cursus sit amet consequat non, vestibulum in nisi.",
  },
];

const ProvidersList = () => (
  <div
    className={classNames(
      "flex w-full flex-col gap-9 overflow-hidden lg:flex-row"
    )}
  >
    {providersData.map((tab, index) => (
      <div className={styles.dpBox} key={index}>
        <img src={tab.logo} className="h-8" alt="logo" />
        {tab.description}
      </div>
    ))}
  </div>
);

export default ProvidersList;
