import React from "react";
import Link from "next/link";
import SearchBar from "./SearchBar";

const PontisHeader = () => (
  <div className="w-screen bg-slate-50">
    <div className="my-8 mx-auto flex w-full max-w-7xl flex-row items-center justify-between px-8">
      <Link href="/">
        <a>
          <img
            className="inline h-12"
            src="/pontis-logo.svg"
            alt="Pontis Icon"
          />
        </a>
      </Link>
      <SearchBar />
    </div>
  </div>
);

export default PontisHeader;
