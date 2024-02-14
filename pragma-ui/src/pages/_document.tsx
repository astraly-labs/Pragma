import React from "react";
import { Html, Head, Main, NextScript } from "next/document";

/**
 * Used to set the lang property according to:
 * https://nextjs.org/docs/advanced-features/custom-document
 * @return {JSX.Element}
 */
export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
