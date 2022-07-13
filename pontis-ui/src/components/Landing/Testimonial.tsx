import React from "react";
import QuoteIcon from "../common/QuoteIcon";

const Testimonial = () => (
  <div className="relative w-full max-w-3xl lg:flex lg:items-center">
    <QuoteIcon className="absolute top-0 left-0 h-36 w-36 -translate-y-10 -translate-x-8 transform fill-transparent stroke-slate-200 stroke-2" />
    <blockquote className="relative">
      <div className="text-2xl font-medium leading-9 text-gray-900">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo expedita
          voluptas culpa sapiente alias molestiae. Numquam corrupti in laborum
          sed rerum et corporis.
        </p>
      </div>
      <footer className="mt-8">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <img
              className="h-12 w-12 rounded-full lg:h-16 lg:w-16"
              src="/assets/testimonial/uri-starkware.jpeg"
              alt="Uri Kolodny"
            />
          </div>
          <div className="ml-4">
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
