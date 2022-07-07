import React from "react";

const Testimonial = () => (
  <div className="relative w-full max-w-3xl lg:flex lg:items-center">
    <svg
      className="absolute top-0 left-0 h-36 w-36 -translate-x-8 -translate-y-24 transform text-indigo-200 opacity-50"
      stroke="currentColor"
      fill="none"
      viewBox="0 0 144 144"
      aria-hidden="true"
    >
      <path
        strokeWidth={2}
        d="M41.485 15C17.753 31.753 1 59.208 1 89.455c0 24.664 14.891 39.09 32.109 39.09 16.287 0 28.386-13.03 28.386-28.387 0-15.356-10.703-26.524-24.663-26.524-2.792 0-6.515.465-7.446.93 2.327-15.821 17.218-34.435 32.11-43.742L41.485 15zm80.04 0c-23.268 16.753-40.02 44.208-40.02 74.455 0 24.664 14.891 39.09 32.109 39.09 15.822 0 28.386-13.03 28.386-28.387 0-15.356-11.168-26.524-25.129-26.524-2.792 0-6.049.465-6.98.93 2.327-15.821 16.753-34.435 31.644-43.742L121.525 15z"
      />
    </svg>
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
