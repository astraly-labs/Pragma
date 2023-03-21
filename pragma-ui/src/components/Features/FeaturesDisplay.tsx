import React from "react";
import { StyledExternalLink } from "../common/StyledLink";
import FeatureGrid, { FeatureGridProps } from "./FeatureGrid";
import placeholder1 from "../../../public/assets/features/placeholder1.webp";
import placeholder2 from "../../../public/assets/features/placeholder2.webp";
import placeholder3 from "../../../public/assets/features/placeholder3.webp";

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
        title: "Verifiable Performance",
        description:
          "Every time a publisher sends new data to Pragma, the smart contracts emit events, so anyone can inspect the network's historical performance.",
      },
      {
        title: "Open Source",
        description: (
          <>
            Check out Pragma&apos;s source code on{" "}
            <StyledExternalLink href="https://github.com/Astraly-Labs/Pragma">
              Github
            </StyledExternalLink>
            .
          </>
        ),
      },
    ],
    imgSrc: placeholder1,
    imgLeft: false,
  },
  {
    title: "Decentralization",
    bulletPoints: [
      {
        title: "Proprietary data",
        description:
          "High-quality publishers sign and bring their proprietary data directly on-chain, giving Pragma its best-in-class robustness and accuracy.",
      },
      {
        title: "No off-chain infrastructure",
        description:
          "This makes Pragma as decentralized as the underlying zk-rollup networks.",
      },
    ],
    imgSrc: placeholder2,
    imgLeft: true,
  },
  {
    title: "Composability",
    bulletPoints: [
      {
        title: "Cheap zk-computation",
        description:
          "Raw data building blocks can be composed on-chain. Thus, new feeds that are just as secure and robust as the main price feeds can be created using verifiable computation.",
      },
      {
        title: "Advanced computational feeds",
        description:
          "We are working with leading protocols to create dynamic yield curves, risk metrics, volatility surfaces and more...",
      },
    ],
    imgSrc: placeholder3,
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
