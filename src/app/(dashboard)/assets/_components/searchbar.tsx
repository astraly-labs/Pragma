import { ChangeEvent, useState } from "react";
import { motion } from "motion/react";
import clsx from "clsx";
import { Search } from "lucide-react";

type SearchBarProps = {
  onInputChange: (value: string) => void;
};

export const SearchBar = ({ onInputChange }: SearchBarProps) => {
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setInputValue(value);
    onInputChange(value);
  };

  return (
    <motion.div
      animate={{
        scale: isFocused ? 1.03 : 1,
        boxShadow: isFocused
          ? "0 0 20px rgba(21, 255, 129, 0.15)"
          : "0 0 0px rgba(21, 255, 129, 0)",
      }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="rounded-full"
    >
      <button
        type="button"
        className="text-lightGrey relative flex w-full flex-row justify-start rounded-full bg-lightBlur px-6 py-3 text-sm sm:w-fit"
      >
        <input
          className={clsx(
            "absolute bottom-0 left-0 h-full w-full rounded-full bg-transparent pl-6 text-lightGreen",
            {
              "backdrop-blur-3xl": inputValue,
            }
          )}
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          aria-label="Search"
        />
        <Search aria-hidden="true" className=" h-5 w-5 pr-2 text-lightGreen" />
        <span className=" pr-10">Search</span>
      </button>
    </motion.div>
  );
};
