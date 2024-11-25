import { ChangeEvent, FormEvent } from "react";
import { Search } from 'lucide-react';

interface SearchBarProps {
  placeholder?: string;
  ariaLabel?: string;
  value: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar = ({
  placeholder = "Enter country...",
  ariaLabel = "Search",
  value,
  onChange,
}: SearchBarProps) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-row bg-slate-800 rounded-lg border text-white placeholder-slate-400 items-center justify-between focus-within:ring-2 focus-within:ring-blue-500 px-2"
        tabIndex={0}
      >
        <label htmlFor="search-input" className="flex items-center">
          <Search className="text-gray-400" />
          <p className="sr-only">{ariaLabel}</p>
        </label>
        <input
          id="search-input"
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          className="w-full pl-4 pr-4 py-2 rounded-lg bg-slate-800 outline-none"
        />
      </form>
    </div>
  );
};

export default SearchBar;