import React from "react";
import { StyledExternalLink } from "./common/StyledLink";

const faqs = [
  {
    question: "How do I start using Pragma?",
    answer: (
      <>
        Integration is simple, just add a few lines of code to your smart
        contract and you can start using our price feeds. See a{" "}
        <StyledExternalLink href="https://docs.pragmaoracle.com/docs/introduction">
          sample code snippet
        </StyledExternalLink>
        .
      </>
    ),
  },
  {
    question: "How does Pragma verify data?",
    answer:
      "Every data point on Pragma is timestamped and signed directly by the source.",
  },
  {
    question: "What are the differences between off- and on-chain oracles?",
    answer:
      "Historically, the limited performance of blockchains has meant that oracles gathered all data off-chain and only posted the final answer on-chain, thereby operating as a black box with a trusted output. On-chain oracles use performant new technologies such as zero-knowledge cryptography to bring the core logic on-chain. This makes the on-chain oracle much more secure and trustless.",
  },
  {
    question: "Why do blockchains need oracles? What is the oracle problem?",
    answer:
      "Blockchains are extremely secure but applications running on them are not able to communicate with the outside world. Oracles bring information about real-life events onto the blockchain, thereby enabling applications to have a useful impact on the outside world.",
  },
  {
    question: "How will Pragma become permissionless?",
    answer:
      "Pragma is already decentralized, transparent and composable as described above. But a critical further step in the evolution of the protocol is becoming permissionless so that anyone can provide their own data while maintaining the highest standard of robustness. We are working on a whitepaper that discusses our plans for this next phase and will release that soon.",
  },
  {
    question: "Why does data composability matter?",
    answer:
      "DeFi is still in its early days: Simple, overcollateralized protocols have shown the massive appeal of the technology. To reach the next billion users, DeFi will need to become more sophisticated and user-friendly. Key to this advance is leveraging advanced feeds such as those on Pragma, such as yield curves (fixed-rate loans) or volatility oracles (hedging against market swings).",
  },
  {
    question: "Why use Pragma rather than building your own oracle?",
    answer:
      "In-house oracle solutions are less robust and decentralized because they do not rely on a large network of the biggest market makers and exchanges providing their proprietary high-quality data.",
  },
  {
    question: "Does Pragma only provide financial data?",
    answer:
      "Pragma is starting with financial data but will quickly expand to sports, weather and news — any event that happens anywhere should be available on-chain.",
  },
  {
    question: "Wen token?",
    answer: "No comment, for now.",
  },
  {
    question: "How do I contact Pragma for help?",
    answer: (
      <>
        Feel free to reach out to us on{" "}
        <StyledExternalLink href="https://twitter.com/PragmaOracle">
          Twitter
        </StyledExternalLink>{" "}
        or send us an{" "}
        <StyledExternalLink href="mailto:support@pragmaoracle.com?body=Hi%20Pragma-Team,">
          email
        </StyledExternalLink>
        .
      </>
    ),
  },
];

const FAQ = () => (
  <dl className="w-full max-w-7xl space-y-10 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-12 md:space-y-0">
    {faqs.map((faq, i) => (
      <div key={i}>
        <dt className="text-secondary text-lg font-medium leading-6 lg:text-xl">
          {faq.question}
        </dt>
        <dd className="text-grey prose prose-slate mt-2">{faq.answer}</dd>
      </div>
    ))}
  </dl>
);

export default FAQ;
