import React from "react";
import QuoteIcon from "../common/QuoteIcon";

const Testimonial = () => (
  <div className="relative w-full max-w-3xl lg:flex lg:items-center">
    <QuoteIcon className="absolute top-0 left-0 h-36 w-36 -translate-y-10 -translate-x-8 transform fill-transparent stroke-slate-200 stroke-2" />
    <blockquote className="relative">
      <p className="text-xl font-medium leading-9 text-gray-900 lg:text-2xl">
        The Empiric team has attracted fantastic data partners and Empiric
        Network is already one of the leading protocols on StarkNet. I am
        excited to see them leverage zk-technology to build out their vision of
        decentralized, transparent and composable data feeds.
      </p>
      <footer className="mt-8">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <img
              className="h-16 w-16 rounded-full lg:h-20 lg:w-20"
              src="/assets/testimonial/uri-starkware.webp"
              alt="Uri Kolodny"
            />
          </div>
          <div className="ml-4 space-y-1">
            <div className="text-base font-medium text-gray-900">
              Uri Kolodny
            </div>
            <div className="text-base font-medium text-indigo-600">
              Co-Founder and CEO at StarkWare
            </div>
          </div>
        </div>
      </footer>
    </blockquote>
  </div>
);

export default Testimonial;
