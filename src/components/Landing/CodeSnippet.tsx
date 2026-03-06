"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import CopyButtonComponent from "../common/CopyCode";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import cb from "./cb";
import { useHasMounted } from "@/lib/has-mounted";

import priceFeedCode from "./snippets/price_feed.cairo";
import realizedVolCode from "./snippets/realized_vol.cairo";

interface Snippet {
  title: string;
  filename: string;
  code: string;
}

const snippets: Snippet[] = [
  {
    title: "Price Feed",
    filename: "price_feed.cairo",
    code: priceFeedCode,
  },
  {
    title: "Realized Vol",
    filename: "realized_vol.cairo",
    code: realizedVolCode,
  },
];

export default function CodeSnippet() {
  const hasMounted = useHasMounted();
  const [activeTab, setActiveTab] = useState(0);

  if (!hasMounted) {
    return null;
  }

  const active = snippets[activeTab];

  return (
    <div className="relative flex h-auto w-full flex-col overflow-hidden rounded-2xl border border-lightGreen/20 lg:min-h-[650px] lg:w-5/12">
      {/* Terminal header */}
      <div className="flex items-center gap-2 border-b border-lightBlur/20 bg-darkGreen/60 px-4 py-3">
        <div className="flex gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <div className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <div className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        <span className="ml-2 font-mono text-xs text-lightGreen/40">
          {active.filename}
        </span>
      </div>

      {/* Tab bar */}
      <div className="px-4 pt-4">
        <div className="relative flex rounded-full bg-lightBlur/60">
          {snippets.map((snippet, index) => (
            <button
              key={snippet.title}
              onClick={() => setActiveTab(index)}
              className={clsx(
                "relative z-10 w-full rounded-full py-2.5 text-sm font-medium tracking-wider transition-colors duration-200",
                "focus:outline-none",
                activeTab === index
                  ? "text-darkGreen"
                  : "text-lightGreen/70 hover:text-white"
              )}
            >
              {activeTab === index && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 rounded-full bg-mint"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                />
              )}
              <span className="relative z-10">{snippet.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Code panel */}
      <div className="relative flex-1 overflow-auto px-4 pb-20 pt-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="font-mono text-sm leading-relaxed"
          >
            <SyntaxHighlighter
              style={cb}
              language="rust"
              showLineNumbers
              lineNumberStyle={{
                color: "rgba(181,240,229,0.2)",
                fontSize: "11px",
                paddingRight: "16px",
                minWidth: "2.5em",
                textAlign: "right",
              }}
              customStyle={{
                background: "transparent",
                padding: 0,
                margin: 0,
              }}
            >
              {active.code.trim()}
            </SyntaxHighlighter>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Copy button */}
      <div className="absolute bottom-4 left-4 z-10">
        <CopyButtonComponent textToCopy={active.code.trim()} />
      </div>

      {/* Scan-line overlay */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-[0.015]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(181,240,229,0.03) 2px, rgba(181,240,229,0.03) 4px)",
        }}
      />
    </div>
  );
}
