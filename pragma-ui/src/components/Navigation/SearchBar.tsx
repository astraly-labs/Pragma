import React from "react";
import { SearchIcon } from "@heroicons/react/outline";

import { useSearch } from "../../providers/search";

const SearchBar: React.FC = () => {
  const setSearch = useSearch();

  return (
    <button
      type="button"
      className="text-lightGrey flex w-full flex-row justify-start rounded-full bg-lightBlur px-6 py-3 text-sm sm:w-fit"
      onClick={() => setSearch(true)}
    >
      <SearchIcon
        aria-hidden="true"
        className=" h-5 w-5 pr-2 text-lightGreen"
      />
      <span className=" pr-10">Search</span>
      <kbd className="hidden font-sans font-semibold sm:inline-block">
        <kbd title="Command" className="text-grey no-underline">
          {/* This needs to be cross-platform compatible.
            More info at https://github.com/mdn/content/issues/14429.
          */}
          ⌘
        </kbd>{" "}
        K
      </kbd>
    </button>
  );
};

export default SearchBar;
