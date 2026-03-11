"use client";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import cb from "./cb";

interface Props {
  code: string;
}

export default function SyntaxHighlighterWrapper({ code }: Props) {
  return (
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
      {code}
    </SyntaxHighlighter>
  );
}
