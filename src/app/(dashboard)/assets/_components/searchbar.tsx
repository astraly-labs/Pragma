import { Search } from "lucide-react";
type Props = { onInputChange: (value: string) => void; label?: string };
export const SearchBar = ({ onInputChange, label = "Search" }: Props) => (
  <label className="explorer-search">
    <Search size={16} aria-hidden="true" />
    <input
      type="search"
      aria-label={label}
      placeholder={label}
      onChange={(event) => onInputChange(event.target.value)}
    />
  </label>
);
