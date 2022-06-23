import React from "react";
import Link from "next/link";
import { StyledExternalLink } from "./StyledLink";

const PontisFooter = () => (
  <div className="w-screen bg-slate-50">
    <div className="container mx-auto flex max-w-7xl flex-col items-center border-t border-slate-300  p-8 sm:flex-row">
      <Link href="/">
        <a>
          <img src="/pontis-logo.svg" className="h-8" alt="Pontis Logo" />
        </a>
      </Link>
      <p className="mt-4 text-sm text-slate-900 sm:mt-0 sm:ml-4 sm:border-l sm:border-slate-300 sm:pl-4">
        © 42 Labs - {new Date().getFullYear()}
      </p>
      <span className="mt-4 inline-flex justify-center space-x-5 sm:mt-0 sm:ml-auto sm:justify-start">
        <StyledExternalLink href="mailto:oskar@42labs.xyz?body=Hi%20Oskar,">
          Contact Us
        </StyledExternalLink>
      </span>
    </div>
  </div>
);

export default PontisFooter;
