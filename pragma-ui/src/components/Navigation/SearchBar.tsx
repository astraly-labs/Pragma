import { ChangeEvent, useState } from "react";
import { SearchIcon } from "@heroicons/react/outline";
import styles from "./styles.module.scss";

import classNames from "classnames";

type SearchBarProps = {
  onInputChange: (value: string) => void;
};

const SearchBar = ({ onInputChange }: SearchBarProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
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
          "absolute bottom-0 left-0 h-full w-full rounded-full bg-transparent pl-6 text-lightGreen",
          inputValue ? "backdrop-blur-3xl" : ""
        )}
        value={inputValue}
        onChange={handleInputChange}
        aria-label="Search"
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
