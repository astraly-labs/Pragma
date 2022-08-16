import React from "react";
import ProtocolTabs from "./ProtocolTabs";
import ProtocolSelect from "./ProtocolSelect";

export const protocolCategories = [
  "All",
  "Money-Market",
  "Social Wallet",
  "Lending",
  "Infrastructure",
] as const;

export interface Protocol {
  name: string;
  category: typeof protocolCategories[number];
  src: string;
  description: string;
  href: string;
}

export const protocols: Protocol[] = [
  {
    name: "Magnety",
    category: "Social Wallet",
    src: "/assets/protocols/magnety.webp",
    description:
      "Magnety is an asset management system allowing anyone, such as investment groups, DAOs, or individuals to get the most out of DeFi on Starknet & Ethereum through an easy-to-use platform.",
    href: "https://www.magnety.finance/",
  },
  {
    name: "zkLend",
    category: "Money-Market",
    src: "/assets/protocols/zklend.svg",
    description:
      "zkLend is an L2 money-market protocol built on StarkNet, combining zk-rollup scalability, superior transaction speed, and cost-savings with Ethereum's security.",
    href: "https://zklend.com/",
  },
  {
    name: "CurveZero",
    category: "Lending",
    src: "/assets/protocols/curvezero.webp",
    description:
      "CurveZero is a lend borrow protocol. Liquidity providers deposit USDC into the protocol and borrowers can access this money at fixed rates and at any term they choose.",
    href: "https://github.com/xan-crypto/CurveZero",
  },
  {
    name: "FujiDAO",
    category: "Lending",
    src: "/assets/protocols/fuji-dao.webp",
    description:
      "Fuji aggregates lending-borrowing crypto markets within blockchain networks. The protocol optimizes interest rates to both borrowers and lenders by automating routing and movement of funds across lending-borrowing protocols and blockchain networks in search of the best APR.",
    href: "https://www.fujidao.org/",
  },
  {
    name: "CANVAS",
    category: "Infrastructure",
    src: "/assets/protocols/canvas.svg",
    description:
      "CANVAS provides scalable infrastructure to access Web3. They have two main products: CANVAS Connect, a Layer 2 Scaling solution for DeFi transactions, and CANVAS Digital, a way to securely access and invest in DeFi and Web3.",
    href: "https://canvas.co/",
  },
  {
    name: "Serity",
    category: "Infrastructure",
    src: "/assets/protocols/serity.webp",
    description:
      "Serity is a community-owned protocol powering the creation and trading of yield-backed synthetic assets. They consist of three core pillars: a PCV-backed stable asset, yield-backed synthetics, and an exchange built on a permissionless ZK rollup.",
    href: "https://serity.finance/",
  },
  {
    name: "Hashstack",
    category: "Lending",
    src: "/assets/protocols/hashstack.webp",
    description:
      "Hashstack Finance is a DeFi platform whose Open protocol aims to disrupt the DeFi lending market by offering under-collateralized loans. It addresses the need of lacking under-collateralized lending avenues by enabling loans at up to 3x collateral.",
    href: "https://hashstack.finance/",
  },
  {
    name: "Nostra",
    category: "Lending",
    src: "/assets/protocols/nostra.webp",
    description:
      " Nostra is a versatile liquidity protocol for lending and borrowing. On top of its basic use-case, Nostra has many innovative features designed to maximize capital efficiency and minimize liquidity risk.",
    href: "https://nostra.finance/",
  },
];

const ProtocolSection = () => (
  <div className="w-full max-w-7xl">
    <div className="hidden sm:block">
      <ProtocolTabs protocols={protocols} />
    </div>
    <div className="sm:hidden">
      <ProtocolSelect protocols={protocols} />
    </div>
  </div>
);

export default ProtocolSection;
