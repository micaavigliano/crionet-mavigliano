import { useState } from 'react';
import './App.css';
import { useQuery } from '@apollo/client';
import { GET_COUNTRIES } from '../lib/queries/GET_ITEMS';

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  const regexPattern = searchTerm ? `(${searchTerm[0].toLowerCase()}|${searchTerm[0].toUpperCase()})${searchTerm.slice(1)}` : '';
  const { loading, error, data } = useQuery(GET_COUNTRIES, {
    variables: { search: regexPattern },
  });

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
  };

  console.log(data)

  return (
    <div>
      <input
        type="text"
        placeholder="Search countries..."
        value={searchTerm}
        onChange={handleSearch}
        style={{
          padding: '10px',
          fontSize: '16px',
          width: '100%',
          marginBottom: '20px',
        }}
      />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      <ul>
        {data?.countries?.map((country: any) => (
          <li key={country.code}>
            <strong>{country.name}</strong> ({country.code})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
