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
    name: "CMT Digital",
    src: "/assets/publishers/cmtdigital.webp",
    description:
      "CMT is a leading market maker and proprietary trading firm. They have been together for more than two decades and has built a team of professionals with significant trading and technology experiences. CMT operates across five continents.\n\n CMT will provide their reliable and stable crypto market data to the Pragma Network.",
    href: "https://cmt.digital/",
  },
  {
    name: "Flow Traders",
    src: "/assets/publishers/flow-traders.webp",
    description:
      "Flow Traders is an established global financial technology-enabled liquidity provider in financial markets. Flow Traders was founded in 2017 and provide liquidity in financial products, historically with a focus on exchange-traded products (ETPs). In recent years, they have diversified the products they trade under virtually all market circumstances.\n\n Flow Traders will contribute its real-time crypto market data directly on-chain to the Pragma Network.",
    href: "https://www.flowtraders.com/",
  },
  {
    name: "Gemini",
    src: "/assets/publishers/gemini.svg",
    description:
      "Gemini is one of the most important cryptocurrency exchanges that allows people to buy, sell, and store digital assets. Gemini is the world first licensed Ether exchange and one of the most secure with significant daily trading volumes.\n\n Gemini will contribute its proprietary crypto market data to the Pragma Network.",
    href: "https://www.gemini.com/",
  },
  {
    name: "Jane Street",
    src: "/assets/publishers/jane-street.webp",
    description:
      "Jane Street is a global liquidity provider and trading firm, using sophisticated quantitative analysis and a deep understanding of market mechanics to help keep the prices consistent and reliable. They traded more than $17 trillion worth of securities in 2020.\n\n Jane Street will provide their accurate low latency crypto data to the Pragma Network.",
    href: "https://www.janestreet.com/",
  },
  {
    name: "Portofino",
    src: "/assets/publishers/portofino.webp",
    description:
      "Portofino is a leading quantitative trading firm providing liquidity and pricing on derivatives exchanges around the world. Portofino Technologies was founded in Zug and has offices around the globe.\n\n Portofino will contribute its unique crypto market data to the Pragma Network.",
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
