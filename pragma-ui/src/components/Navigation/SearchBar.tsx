import React, { useState } from "react";
import { SearchIcon } from "@heroicons/react/outline";
import styles from "./styles.module.scss";

import classNames from "classnames";

interface SearchBarProps {
  onInputChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onInputChange,
}: SearchBarProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setInputValue(value);
    onInputChange(value);
  };

  return (
    <button
      type="button"
      className="text-lightGrey relative flex w-full flex-row justify-start rounded-full bg-lightBlur px-6 py-3 text-sm sm:w-fit"
      // onClick={() => setSearch(true)}
    >
      <input
        className={classNames(
          styles.inputSearch,
          "absolute left-0 bottom-0 h-full w-full rounded-full bg-transparent pl-6 text-lightGreen",
          inputValue ? "backdrop-blur-3xl" : ""
        )}
        value={inputValue}
        onChange={handleInputChange}
      />
      <SearchIcon
        aria-hidden="true"
        className=" h-5 w-5 pr-2 text-lightGreen"
      />
      <span className=" pr-10">Search</span>
    </button>
  );
};

export default SearchBar;
