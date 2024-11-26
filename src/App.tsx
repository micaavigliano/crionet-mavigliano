import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { useLazyQuery, useQuery } from '@apollo/client';
import { GET_COUNTRIES } from '../lib/queries/GET_COUNTRIES';
import { GET_CONTINENTS } from '../lib/queries/GET_CONTINENTS';
import Card from './Components/UI/Card';
import { breakWords } from '../lib/helper/helper';
import SearchContainer from './Components/layouts/SearchContainer';
import Loading from './Components/UI/Loading';
import { CountriesProps } from '../lib/types/index'

const INITIAL_FILTERS = {
  continent: "",
  name: "",
};

function App() {
  const [filter, setFilter] = useState(INITIAL_FILTERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('name-asc');

  const { data: continentsData } = useQuery(GET_CONTINENTS);
  const [executeSearch, { loading, error, data }] = useLazyQuery(GET_COUNTRIES);

  useEffect(() => {
    executeSearch({
      variables: {
        name: { regex: breakWords(filter.name) },
        continent: { regex: filter.continent }
      },
    });
  }, [filter.name, filter.continent, executeSearch]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(prev => ({ ...prev, name: e.target.value }));
    setSearchTerm(e.target.value);
  };

  const handleContinentChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilter(prev => ({ ...prev, continent: e.target.value }));
  };

  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value);
  };

  const filteredAndSortedCountries = useMemo(() => {
    if (!data?.countries) return [];
    const countries = JSON.parse(JSON.stringify(data.countries));
    let filtered = countries;
    return filtered.sort((a: CountriesProps, b: CountriesProps) => {
      console.log(a, b)
      const multiplier = sortOrder === 'name-desc' ? -1 : 1;
      return multiplier * a.name.localeCompare(b.name);
    });
  }, [data?.countries, sortOrder]);

  return (
    <main className="px-10 py-10 md:px-24 md:py-10 lg:px-24 lg:py-10">
      <h1 className="text-3xl font-bold text-center pb-9">WikiCountry</h1>
      <SearchContainer
        value={searchTerm}
        onChange={handleSearch}
        continents={continentsData?.continents || []}
        sortOrder={sortOrder}
        onContinentChange={handleContinentChange}
        onSortChange={handleSortChange}
        selectedContinent={filter.continent}
      />

      {loading && (
        <div className="flex justify-center my-8">
          <Loading />
        </div>
      )}

      {error && <p>Error: {error.message}</p>}

      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {filteredAndSortedCountries.map((country: CountriesProps) => (
          <li key={country.code}>
            <Card
              emoji={country.emoji}
              name={country.name}
              capital={country.capital}
              continent={country.continent.name}
              code={country.code}
            />
          </li>
        ))}
      </ul>

      {filteredAndSortedCountries.length === 0 && (
        <div className="text-center text-gray-500 my-8">
          No countries found matching your criteria
        </div>
      )}
    </main>
  );
}

export default App;