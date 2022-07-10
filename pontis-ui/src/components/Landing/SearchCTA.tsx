import React from "react";
import SearchBar from "../Navigation/SearchBar";

const SearchCTA = () => (
  <div className="flex w-full max-w-3xl -translate-y-1/2 flex-col flex-wrap justify-between space-y-8 rounded-lg bg-slate-200 py-12 px-8 shadow-xl sm:items-center lg:flex-row lg:space-y-0">
    <div className="prose prose-slate relative flex-grow text-left sm:text-center md:prose-xl lg:text-left">
      <h3>Want to explore more?</h3>
    </div>
    <SearchBar />
  </div>
);

export default SearchCTA;
