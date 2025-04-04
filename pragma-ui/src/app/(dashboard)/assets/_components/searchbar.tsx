import { ChangeEvent, useState } from "react";
import classNames from "classnames";
import { SearchIcon } from "@heroicons/react/outline";

type SearchBarProps = {
  onInputChange: (value: string) => void;
};

export const SearchBar = ({ onInputChange }: SearchBarProps) => {
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
          "absolute bottom-0 left-0 h-full w-full rounded-full bg-transparent pl-6 text-lightGreen",
          {
            "backdrop-blur-3xl": inputValue,
          }
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
