import { ChangeEvent, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_COUNTRIES } from '../lib/queries/GET_ITEMS';
import SearchBar from './Components/Searchbar';
import Card from './Components/Card';

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  const regexPattern = searchTerm ? `(${searchTerm[0].toLowerCase()}|${searchTerm[0].toUpperCase()})${searchTerm.slice(1)}` : '';
  const [executeSearch, { loading, error, data }] = useLazyQuery(GET_COUNTRIES);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
  };

  const handleSearchSubmit = () => {
    executeSearch({
      variables: {
        search: regexPattern,
      },
    });
  };

  return (
    <main className='px-10 py-5 md:px-24 md:py-10 lg:px-24 lg-py-10'>
      <SearchBar
        title="Welcome to WikiCountry"
        value={searchTerm}
        onChange={handleSearch}
        placeholder='Search a country...'
        onSubmit={handleSearchSubmit}
      />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4'>
        {data?.countries?.map((country: any) => (
          <li key={country.code}>
            <Card emoji={country.emoji} name={country.name} />
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;
