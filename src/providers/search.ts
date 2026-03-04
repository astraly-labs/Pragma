import { createContext, useContext } from "react";

const SearchContext = createContext(null);

const useSearch = () => useContext(SearchContext);

export { SearchContext, useSearch };
