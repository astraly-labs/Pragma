import React from "react";
import Link from "next/link";
import { ChatIcon, CodeIcon } from "@heroicons/react/outline";

const CTASection = () => (
  <div className="relative mt-24 py-16 sm:mt-32">
    <div aria-hidden="true" className="hidden sm:block">
      <div className="absolute inset-y-0 left-0 w-1/2 rounded-r-3xl bg-slate-50" />
      <svg
        className="absolute top-8 left-1/2 -ml-3"
        width={404}
        height={392}
        fill="none"
        viewBox="0 0 404 392"
      >
        <defs>
          <pattern
            id="8228f071-bcee-4ec8-905a-2a059a2cc4fb"
            x={0}
            y={0}
            width={20}
            height={20}
            patternUnits="userSpaceOnUse"
          >
            <rect
              x={0}
              y={0}
              width={4}
              height={4}
              className="text-slate-200"
              fill="currentColor"
            />
          </pattern>
        </defs>
        <rect
          width={404}
          height={392}
          fill="url(#8228f071-bcee-4ec8-905a-2a059a2cc4fb)"
        />
      </svg>
    </div>
    <div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
      <div className="relative overflow-hidden rounded-2xl bg-indigo-500 px-6 py-10 shadow-xl sm:px-12 sm:py-20">
        <div
          aria-hidden="true"
          className="absolute inset-0 -mt-72 sm:-mt-32 md:mt-0"
        >
          <svg
            className="absolute inset-0 h-full w-full"
            preserveAspectRatio="xMidYMid slice"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 1463 360"
          >
            <path
              className="text-indigo-400 text-opacity-40"
              fill="currentColor"
              d="M-82.673 72l1761.849 472.086-134.327 501.315-1761.85-472.086z"
            />
            <path
              className="text-indigo-600 text-opacity-40"
              fill="currentColor"
              d="M-217.088 544.086L1544.761 72l134.327 501.316-1761.849 472.086z"
            />
          </svg>
        </div>
        <div className="relative">
          <div className="sm:text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Ready to get the data you need?
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-indigo-100">
              Leverage recent breakthroughs in zero knowledge computation by
              using verifyable and composable data in your application.
            </p>
          </div>
          <div className="mt-12 sm:mx-auto sm:flex sm:max-w-lg">
            <Link href="/">
              <a className="flex cursor-pointer items-center rounded-lg bg-slate-700 px-4 py-3 text-slate-50 shadow-lg hover:bg-slate-800 hover:shadow-xl focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-500 md:px-6 md:py-4 md:text-xl">
                <CodeIcon className="mr-2 h-5 w-5" />
                Read the Docs
              </a>
            </Link>

            <div className="mt-4 sm:mt-0 sm:ml-6">
              <a
                href="mailto:oskar@42labs.xyz?body=Hi%20Oskar,"
                className="flex cursor-pointer items-center rounded-lg bg-slate-100 px-4 py-3 text-slate-700 shadow-lg hover:bg-slate-200 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-500 md:px-6 md:py-4 md:text-xl"
              >
                <ChatIcon className="mr-2 h-5 w-5" />
                Request asset
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default CTASection;
