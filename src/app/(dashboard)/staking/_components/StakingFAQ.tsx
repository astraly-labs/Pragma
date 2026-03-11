"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What is STRK staking?",
    answer:
      "Staking on Starknet allows users to lock their STRK tokens in the staking protocol, actively supporting the network's security and performance. Holders of STRK can participate by staking their tokens directly or delegating them to others. Rewards are distributed based on the participant's contribution and level of involvement in the network.\n\nDelegating your stake involves adding your stake to our validator's delegation pool managed by the official staking contract. This approach offers the advantage of lower capital requirements and relieves you of the need to manage the operational aspects of staking, as the validator handles these responsibilities.",
  },
  {
    question: "Native Staking vs Liquid Staking?",
    answer:
      "Native staking involves locking your tokens directly on the native staking contract or on a native delegation pool. This helps secure the network and earn rewards. While this provides the best security, staked tokens are immobilized, meaning they cannot be traded or used elsewhere until they are unstaked, requiring a waiting period for withdrawal.\n\nLiquid staking allows you to stake your tokens while still retaining liquidity. When staking, you receive a liquid token representing your staked assets, which can be freely traded, used in DeFi, or swapped, offering greater flexibility compared to native staking.",
  },
  {
    question: "What does less Smart Contract exposure mean?",
    answer:
      "Native staking involves interacting directly with the official Staking Contract rather than using intermediary smart contracts. When you stake natively, your tokens are locked and managed by the Starknet Staking Contract, ensuring that your funds are not subject to vulnerabilities or risks associated with external smart contracts, such as bugs or exploits. This design eliminates reliance on third-party code, making native staking a more secure option for those prioritizing safety over flexibility.",
  },
  {
    question: "How do I withdraw my staked tokens?",
    answer:
      'To withdraw your staked tokens, you need to go through a two-step process.\n\nFirst, initiate the withdrawal by navigating to the "Withdraw" tab, specifying the amount you want to unstake, and clicking "Initiate Withdraw". This action signals your intent to exit staking and starts the mandatory waiting period.\n\nAfter the waiting period (7 days), you can return to the same "Withdraw" tab to finalize the process and retrieve your unlocked tokens. Once withdrawn, your tokens will be available for use as you see fit.',
  },
  {
    question: "How do I get my rewards?",
    answer:
      "Staking rewards are calculated regularly and accumulate over time. However, it's up to you to claim your rewards manually when you're ready. Once claimed, you have full control over your rewards — you can use them as you wish. For example, you can reinvest them by staking again to compound your earnings or transfer them to another wallet or platform. The choice is entirely yours!",
  },
];

function FAQAccordionItem({
  item,
  isOpen,
  onToggle,
}: {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-lightGreen/10 last:border-b-0">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:text-mint"
      >
        <span className="text-sm font-medium text-lightGreen sm:text-base">
          {item.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0"
        >
          <ChevronDown className="h-4 w-4 text-lightGreen/40" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pb-5 text-sm leading-relaxed text-lightGreen/50 whitespace-pre-line">
              {item.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function StakingFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="w-full rounded-2xl border border-lightGreen/10 bg-darkGreen/40 p-6 backdrop-blur-sm sm:p-8">
      <h3 className="mb-2 text-lg text-lightGreen">
        Frequently Asked Questions
      </h3>
      <p className="mb-6 text-sm text-lightGreen/40">
        Everything you need to know about staking STRK with Pragma.
      </p>
      <div>
        {faqs.map((faq, i) => (
          <FAQAccordionItem
            key={i}
            item={faq}
            isOpen={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? null : i)}
          />
        ))}
      </div>
    </div>
  );
}
