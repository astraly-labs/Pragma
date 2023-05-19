import React from "react";
import PublisherCard from "./PublisherCard";
// import PublisherCard from "./PublisherCard";

export interface PublisherCardProps {
  src: string;
  name: string;
  description: string;
  href?: string;
}

export const publishers: PublisherCardProps[] = [
  {
    name: "Skynet Trading",
    src: "/assets/publishers/skynet.svg",
    description:
      "Skynet Trading is focused on trading strategies for the digital assets market. Skynet provides institutional-grade liquidity solutions and advisory services to token issuers and cryptocurrency exchanges that meet our vision for compliance and innovation.\n\n Skynet will contribute its proprietary crypto market data to the Pragma Network.",
    href: "https://skynettrading.com/",
  },
  {
    name: "Flowdesk",
    src: "/assets/publishers/flowdesk.webp",
    description:
      "Flowdesk is building an all-in-one platform for your crypto business.Flowdesk provides a trading infrastructure for market-making and other crypto-financial services.\n\n Skynet will contribute its proprietary crypto market data to the Pragma Network.",
    href: "https://www.flowdesk.co/",
  },
];

const PublishersSection = () => (
  <>
    <ul className="grid w-full max-w-7xl grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
      {publishers.map(({ name, src, description, href }) => (
        <li key={name}>
          <PublisherCard
            name={name}
            src={src}
            description={description}
            href={href}
          />
        </li>
      ))}
    </ul>
  </>
);

export default PublishersSection;
