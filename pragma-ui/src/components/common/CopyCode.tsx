import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Button } from "./Button";
import Image from "next/image";

const CopyButtonComponent = ({ textToCopy }) => {
  const [isCopied, setIsCopied] = useState(false);

  /**
   * Sets isCopied to true for 1.5 second
   */
  async function copyCode() {
    setIsCopied(true);
    await new Promise((f) => setTimeout(f, 1500));
    setIsCopied(false);
  }

  return (
    <CopyToClipboard text={textToCopy} onCopy={copyCode}>
      <Button variant="solid" color="grey" center={false}>
        {isCopied ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="mr-4 h-5 w-7"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m4.5 12.75 6 6 9-13.5"
            />
          </svg>
        ) : (
          <img src="/assets/vectors/copy.svg" className="pr-3" alt="Copy" />
        )}
        {isCopied ? "Copied!" : "Copy Code"}
      </Button>
    </CopyToClipboard>
  );
};

export default CopyButtonComponent;
