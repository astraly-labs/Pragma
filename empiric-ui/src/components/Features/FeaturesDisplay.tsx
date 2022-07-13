import React from "react";
import {
  BeakerIcon,
  CheckIcon,
  PresentationChartLineIcon,
  ShieldCheckIcon,
  StarIcon,
} from "@heroicons/react/outline";
import { Feature } from "./FeatureItem";
import FeatureGrid from "./FeatureGrid";

const generalFeatures: Feature[] = [
  {
    name: "High quality providers",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
    icon: StarIcon,
  },
  {
    name: "Verifyable data",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
    icon: CheckIcon,
  },
  {
    name: "Robust feeds",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
    icon: ShieldCheckIcon,
  },
];
const computeEngineFeatures: Feature[] = [
  {
    name: "Yield Curve",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
    icon: PresentationChartLineIcon,
  },
  {
    name: "Custom Feeds",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
    icon: BeakerIcon,
  },
];

const FeaturesDisplay = () => (
  <div className="max-w-xl space-y-12 sm:space-y-16 lg:max-w-7xl lg:space-y-24">
    <FeatureGrid
      features={generalFeatures}
      title="Getting the fundamentals right"
      description="Minim deserunt elit fugiat. Minim deserunt elit fugiat. Minim deserunt elit fugiat. Sunt fugiat ut ullamco qui. Sunt fugiat ut ullamco qui. Sunt fugiat ut ullamco qui. Sunt fugiat ut ullamco qui."
      imgSrc="/assets/features/marketplace.webp"
      imageLeft={false}
    />
    <FeatureGrid
      features={computeEngineFeatures}
      title="Our novel compute engine"
      description="Minim deserunt elit fugiat. Minim deserunt elit fugiat. Minim deserunt elit fugiat. Sunt fugiat ut ullamco qui. Sunt fugiat ut ullamco qui. Sunt fugiat ut ullamco qui. Sunt fugiat ut ullamco qui."
      imgSrc="/assets/features/compute.webp"
      imageLeft={true}
    />
  </div>
);

export default FeaturesDisplay;
