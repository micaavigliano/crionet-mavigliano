import { ChangeEvent } from "react";
import SearchBar from "../UI/Searchbar";
import Select from "../UI/Select";
import { Filter, ArrowDownUp } from "lucide-react";

interface SearchContainerProps {
  placeholder?: string;
  ariaLabel?: string;
  value: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  continents: Array<{ code: string; name: string }>;
  sortOrder: string;
  selectedContinent: string;
  onContinentChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
  onSortChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const SearchContainer = ({
  placeholder,
  ariaLabel,
  value,
  onChange,
  continents,
  sortOrder,
  selectedContinent,
  onContinentChange,
  onSortChange,
}: SearchContainerProps) => {
  const sortOptions = [
    { code: 'name-asc', name: 'Name (A-Z)' },
    { code: 'name-desc', name: 'Name (Z-A)' },
  ];

  return (
    <div className="p-4 border border-gray-600 rounded-lg">
      <div className="flex-1">
        <SearchBar
          placeholder={placeholder}
          ariaLabel={ariaLabel}
          value={value}
          onChange={onChange}
        />
      </div>
      <div className="flex flex-row justify-center flex-wrap gap-5 mt-4">
        <Select
          name="Continents"
          items={continents}
          icon={<Filter size={18} />}
          option="Filter by continent"
          value={selectedContinent}
          onChange={onContinentChange}
        />
        <Select
          name="Sort"
          items={sortOptions}
          icon={<ArrowDownUp size={18} />}
          option="Sort by name"
          value={sortOrder}
          onChange={onSortChange}
        />
      </div>
    </div>
  );
};

export default SearchContainer;
