import React from "react";
import PublisherCard from "./PublisherCard";

export interface PublisherCardProps {
  src: string;
  name: string;
  description: string;
  href: string;
}

export const publishers: PublisherCardProps[] = [
  {
    name: "Alameda Research",
    src: "/assets/publishers/alameda.png",
    description:
      "Alameda Research is one of the leading cryptocurrency high frequently trading firms and liquidity provider. Alameda Research was founded in 2017 by Sam Bankman-Fried. They manage over $1B+ in assets: all major coins, altcoins, as well as their derivatives. \n\n Alameda Research will use their business operations to provide price feeds to the Empiric Network.",
    href: "https://www.alameda-research.com/",
  },
  {
    name: "Jane Street",
    src: "/assets/publishers/jane-street.png",
    description:
      "Jane Street is a global liquidity provider and trading firm, using sophisticated quantitative analysis and a deep understanding of market mechanics to help keep the prices consistent and reliable. They traded more than $17 trillion worth of security in 2020.\n\n Jane Street will provide their accurate low latency crypto data to the Empiric Network.",
    href: "https://www.janestreet.com/",
  },
  {
    name: "CMT Digital",
    src: "/assets/publishers/cmtdigital.png",
    description:
      "CMT is a leading market maker and proprietary trading firm. They have been together for more than two decades and has built a team of professionals with significant trading and technology experiences. CMT operates across five continents.\n\n CMT will provide their reliable and stable crypto market data to the Empiric Network.",
    href: "https://cmt.digital/",
  },
  {
    name: "Flow Traders",
    src: "/assets/publishers/flow-traders.png",
    description:
      "Flow Traders is an established global financial technology-enabled liquidity provider in financial markets. Flow Traders was founded in 2017 and provide liquidity in financial products, historically with a focus on exchange-traded products (ETPs). In recent years, they have diversified the products they trade under virtually all market circumstances.\n\n Flow Traders will contribute its real-time crypto market data directly on-chain to the Empiric Network.",
    href: "https://www.flowtraders.com/",
  },
  {
    name: "FTX",
    src: "/assets/publishers/ftx.svg",
    description:
      "FTX is one of the leading cryptocurrency exchanges built by traders for traders. FTX offers innovative products including industry-first derivates, options, volatility products and leveraged tokens and an OTC desk. They have $10 billion of daily trading volume and over one millions active users.\n\n FTX will contribute its 24/7 real-time market data through the custom integration to the Empiric Network.",
    href: "https://ftx.us/",
  },
  {
    name: "Gemini",
    src: "/assets/publishers/gemini.svg",
    description:
      "Ipsum dolore qui do nostrud elit dolore. Pariatur ad ea aliquip. Aliquip proident eu labore sint. Id ullamco et excepteur veniam nisi quis dolor consectetur. Irure ut enim aute. Nostrud in labore dolore labore laboris incididunt sint nostrud. Pariatur deserunt eiusmod irure dolore esse veniam incididunt exercitation ad aliquip commodo laborum excepteur proident pariatur. Deserunt nisi qui reprehenderit mollit sit voluptate aliqua consequat aute ullamco est fugiat exercitation.",
    href: "https://www.gemini.com/",
  },
];

const PublishersSection = () => (
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
);

export default PublishersSection;
