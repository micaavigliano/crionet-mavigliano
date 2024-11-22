import { ChangeEvent, FormEvent } from "react";

interface SearchBarProps {
  title: string;
  placeholder?: string;
  ariaLabel?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
}

const SearchBar = ({
  title,
  placeholder = "Enter search term...",
  ariaLabel = "Search",
  value,
  onChange,
  onSubmit,
}: SearchBarProps) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <section className="search-bar-container">
      <h1 className="text-3xl font-bold text-center pb-9">{title}</h1>
      <form onSubmit={handleSubmit} className="flex flex-row bg-slate-800 rounded-lg border border-gray-300 items-center justify-between">
        <label htmlFor="search-input" className="sr-only">
          {ariaLabel}
        </label>
        <input
          id="search-input"
          type="text"
          placeholder={placeholder}
          aria-label={ariaLabel}
          value={value}
          onChange={onChange}
          className="text-lg w-1/2 focus:outline-none focus:ring focus:border-blue-300 bg-transparent p-3"
        />
        <button
          type="submit"
          className="text-white rounded-lg text-lg hover:bg-blue-700 transition duration-300"
        >
          Submit
        </button>
      </form>
    </section>
  );
};

export default SearchBar;
