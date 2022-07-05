import React from "react";
import classNames from "classnames";
import { ChevronRightIcon, CheckIcon } from "@heroicons/react/solid";

const codeStyles = {
  output: "text-white",
  check: "text-green-500",
} as const;

export interface CodeLineProps {
  text: string;
  prefix: keyof typeof codeStyles;
}

const CodeLine: React.FC<CodeLineProps> = ({ text, prefix }) => (
  <div
    className={classNames("relative px-10 text-opacity-70", codeStyles[prefix])}
  >
    <span className="absolute left-1 flex h-full items-center">
      {prefix === "output" && (
        <ChevronRightIcon className="h-8 w-8 opacity-50" />
      )}
      {prefix === "check" && <CheckIcon className="m-2 h-6 w-6 opacity-50" />}
    </span>
    <span className="py-2">{text}</span>
  </div>
);

export default CodeLine;
