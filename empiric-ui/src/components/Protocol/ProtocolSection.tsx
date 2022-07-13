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
}

export const protocols: Protocol[] = [
  {
    name: "zkLend",
    category: "Money-Market",
    src: "/assets/protocols/zklend.jpeg",
    description:
      "zkLend is an L2 money-market protocol built on StarkNet, combining zk-rollup scalability, superior transaction speed, and cost-savings with Ethereum's security.",
  },
  {
    name: "Magnety",
    category: "Social Wallet",
    src: "/assets/protocols/magnety.jpeg",
    description:
      "Magnety is an asset management system allowing anyone, such as investment groups, DAOs, or individuals to get the most out of DeFi on Starknet & Ethereum through an easy-to-use platform.",
  },
  {
    name: "FujiDAO",
    category: "Lending",
    src: "/assets/protocols/fujidao.png",
    description:
      "Fuji aggregates lending-borrowing crypto markets within blockchain networks. The protocol optimizes interest rates to both borrowers and lenders by automating routing and movement of funds across lending-borrowing protocols and blockchain networks in search of the best APR.",
  },
  {
    name: "CurveZero",
    category: "Lending",
    src: "/assets/protocols/curvezero.jpeg",
    description:
      "CurveZero is a lend borrow protocol. Liquidity providers deposit USDC into the protocol and borrowers can access this money at fixed rates and at any term they choose.",
  },
  {
    name: "CANVAS",
    category: "Infrastructure",
    src: "/assets/protocols/canvas.jpeg",
    description: "CANVAS provides scalable infrastructure to access Web3.",
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
