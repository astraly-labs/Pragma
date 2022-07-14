import React from "react";
import PublisherCard from "./PublisherCard";

export interface PublisherCardProps {
  src: string;
  name: string;
  description: string;
}

export const publishers: PublisherCardProps[] = [
  {
    name: "Alameda Research",
    src: "/assets/publishers/alameda.png",
    description:
      "Alameda Research is one of the leading crypto currency high frequently trading firms and liquidity provider. Alameda Research was founded 2017 by Sam Bankman-Fried. They manage over $1B+ in assets: all major coins, altcoins, as well as their derivatives. They have a globally focused team and infrastructure to trade on all major exchanges and markets.\n\n Alameda will use their whole business operation to provide price feeds to the Empiric Network.",
  },
  {
    name: "Jane Street",
    src: "/assets/publishers/jane-street.png",
    description: "Enim ad reprehenderit pariatur excepteur non do ullamco ad.",
  },
  {
    name: "CMT Digital",
    src: "/assets/publishers/cmtdigital.png",
    description:
      "Ipsum dolore qui do nostrud elit dolore. Pariatur ad ea aliquip. Aliquip proident eu labore sint. Id ullamco et excepteur veniam nisi quis dolor consectetur. Irure ut enim aute. Nostrud in labore dolore labore laboris incididunt sint nostrud. Pariatur deserunt eiusmod irure dolore esse veniam incididunt exercitation ad aliquip commodo laborum excepteur proident pariatur. Deserunt nisi qui reprehenderit mollit sit voluptate aliqua consequat aute ullamco est fugiat exercitation.",
  },
  {
    name: "Flow Traders",
    src: "/assets/publishers/flow-traders.png",
    description:
      "Ipsum dolore qui do nostrud elit dolore. Pariatur ad ea aliquip. Aliquip proident eu labore sint. Id ullamco et excepteur veniam nisi quis dolor consectetur. Irure ut enim aute. Nostrud in labore dolore labore laboris incididunt sint nostrud. Pariatur deserunt eiusmod irure dolore esse veniam incididunt exercitation ad aliquip commodo laborum excepteur proident pariatur. Deserunt nisi qui reprehenderit mollit sit voluptate aliqua consequat aute ullamco est fugiat exercitation.",
  },
  {
    name: "FTX",
    src: "/assets/publishers/ftx.svg",
    description:
      "Ipsum dolore qui do nostrud elit dolore. Pariatur ad ea aliquip. Aliquip proident eu labore sint. Id ullamco et excepteur veniam nisi quis dolor consectetur. Irure ut enim aute. Nostrud in labore dolore labore laboris incididunt sint nostrud. Pariatur deserunt eiusmod irure dolore esse veniam incididunt exercitation ad aliquip commodo laborum excepteur proident pariatur. Deserunt nisi qui reprehenderit mollit sit voluptate aliqua consequat aute ullamco est fugiat exercitation.",
  },
  {
    name: "Gemini",
    src: "/assets/publishers/gemini.svg",
    description:
      "Ipsum dolore qui do nostrud elit dolore. Pariatur ad ea aliquip. Aliquip proident eu labore sint. Id ullamco et excepteur veniam nisi quis dolor consectetur. Irure ut enim aute. Nostrud in labore dolore labore laboris incididunt sint nostrud. Pariatur deserunt eiusmod irure dolore esse veniam incididunt exercitation ad aliquip commodo laborum excepteur proident pariatur. Deserunt nisi qui reprehenderit mollit sit voluptate aliqua consequat aute ullamco est fugiat exercitation.",
  },
];

const PublishersSection = () => (
  <ul className="grid w-full max-w-7xl grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
    {publishers.map(({ name, src, description }) => (
      <li key={name}>
        <PublisherCard name={name} src={src} description={description} />
      </li>
    ))}
  </ul>
);

export default PublishersSection;
