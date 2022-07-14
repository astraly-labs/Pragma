import React from "react";
import {
  CheckIcon,
  CubeTransparentIcon,
  PuzzleIcon,
  ShieldCheckIcon,
  StarIcon,
} from "@heroicons/react/outline";
import { Feature } from "./FeatureItem";
import FeatureGrid from "./FeatureGrid";
import { StyledExternalLink } from "../common/StyledLink";

const generalFeatures: Feature[] = [
  {
    name: "Transparency",
    description: (
      <ul className="ml-4 list-disc">
        <li>
          Empiric is entirely on-chain, so anyone can verify any data point from
          origin through transformation to destination.
        </li>
        <li>
          Every time a publisher sends new data to Empiric, the smart contracts
          emit events, so anyone can inspect the network&apos;s historical
          performance.
        </li>
        <li>
          Empiric is also completely{" "}
          <StyledExternalLink href="https://github.com/42labs/Empiric">
            open source
          </StyledExternalLink>
          .
        </li>
      </ul>
    ),
    icon: StarIcon,
  },
  {
    name: "Decentralization",
    description: (
      <ul className="ml-4 list-disc">
        <li>
          Empiric works with many of the biggest market makers and most liquid
          exchanges to sign and bring on-chain their proprietary data. This
          large consortium of high-quality publishers gives Empiric Network its
          best-in-class robustness and accuracy.
        </li>
        <li>
          Empiric has no off-chain infrastructure and is thus as decentralized
          as the underlying zk-rollup networks.
        </li>
      </ul>
    ),
    icon: CubeTransparentIcon,
  },
  {
    name: "Composability",
    description: (
      <ul className="ml-4 list-disc">
        <li>
          Because Empiric brings raw data building blocks on-chain, these data
          points (signed directly by the source) can be composed into new feeds
          using zk-computation. By using verifiable computation, these feeds are
          just as secure and robust as the main price feeds.
        </li>
        <li>
          TradFi runs on advanced computational feeds, such as dynamic yield
          curves, risk metrics, and volatility surfaces. We are working with
          leading protocols to create these computational feeds that will serve
          as the foundation for a new generation of more sophisticated and
          user-friendly protocols.
        </li>
      </ul>
    ),
    icon: PuzzleIcon,
  },
];

const FeaturesDisplay = () => (
  <div className="max-w-xl space-y-12 sm:space-y-16 lg:max-w-7xl lg:space-y-24">
    <FeatureGrid
      features={generalFeatures}
      title="The next generation of data infrastructure"
      description="Leveraging recent advances in zk-computation, Empiric is an entirely on-chain oracle that brings the principles of DeFi to data:"
      imgSrc="/assets/features/marketplace.webp"
      imageLeft={false}
    />
  </div>
);

export default FeaturesDisplay;
