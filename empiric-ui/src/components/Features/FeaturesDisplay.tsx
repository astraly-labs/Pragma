import React from "react";
import FeatureGrid, { FeatureGridProps } from "./FeatureGrid";

const features: FeatureGridProps[] = [
  {
    title: "Transparency",
    bulletPoints: [
      {
        title: "On-Chain",
        description:
          "Anyone can verify any data point from origin through transformation to destination.",
      },
      {
        title: "Historical Performance",
        description:
          "Every time a publisher sends new data to Empiric, the smart contracts emit events, so anyone can inspect the network's historical performance.",
      },
      {
        title: "Open Source",
        description: "Check out Empiric's source code on GitHub.",
      },
    ],
    imgSrc: "/assets/features/placeholder1.png",
    imgLeft: false,
  },
  {
    title: "Decentralization",
    bulletPoints: [
      {
        title: "Proprietary data",
        description:
          "Hight-quality publishers sign and bring their proprietary data directly on-chain - giving Empiric Network its best-in-class robustness and accuracy.",
      },
      {
        title: "No off-chain infrastructure",
        description:
          "This makes Empiric as decentralized as the underlying zk-rollup networks.",
      },
    ],
    imgSrc: "/assets/features/placeholder2.png",
    imgLeft: true,
  },
  {
    title: "Composability",
    bulletPoints: [
      {
        title: "Zk-computation",
        description:
          "Raw data building blocks can be composed on-chain. Thus, new feeds that are just as secure and robust as the main price feeds can be created using verifiable computation.",
      },
      {
        title: "Advanced computational feeds",
        description:
          "We are working with leading protocols to create dynamic yield curves, risk metrics, volatility surfaces ...",
      },
    ],
    imgSrc: "/assets/features/placeholder3.png",
    imgLeft: false,
  },
];

const FeaturesDisplay = () => (
  <div className="max-w-xl space-y-12 sm:space-y-16 lg:max-w-7xl lg:space-y-24">
    {features.map((feature) => (
      <FeatureGrid key={feature.title} {...feature} />
    ))}
  </div>
);

export default FeaturesDisplay;
