import React from "react";
import SearchBar from "./SearchBar";

const SearchCTA = () => (
  <div className="mx-auto flex max-w-3xl flex-col justify-between space-y-8 rounded-lg bg-slate-200 py-12 px-8 shadow-xl sm:items-center lg:flex-row lg:space-y-0 lg:space-x-20">
    <div className="prose prose-slate flex-grow text-left sm:text-center md:prose-xl lg:text-left">
      <h3>Want to explore more?</h3>
    </div>
    <SearchBar />
  </div>
);

export default SearchCTA;
