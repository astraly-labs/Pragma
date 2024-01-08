import React from "react";
import { SearchIcon } from "@heroicons/react/outline";

import { useSearch } from "../../providers/search";

const SearchBar: React.FC = () => {
  const setSearch = useSearch();

  return (
    <button
      type="button"
      className="text-grey ring-grey hover:ring-secondary focus:ring-primary flex h-12 w-full items-center space-x-3 rounded-lg bg-black px-4 text-left shadow-sm ring-1 focus:outline-none focus:ring-2 sm:w-60 lg:h-14"
      onClick={() => setSearch(true)}
    >
      <SearchIcon aria-hidden="true" className="text-grey h-6 w-6" />
      <span className="flex-auto">Search assets...</span>
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
