import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_COUNTRY } from '../../../lib/queries/GET_COUNTRY';
import { GET_BORDERS } from '../../../lib/queries/GET_BORDERS'
import useFetch from '../../hooks/useFetch';
import countries from "i18n-iso-countries";
import { useEffect, useState } from 'react';
import enLocale from "i18n-iso-countries/langs/en.json";

countries.registerLocale(enLocale);

const Details = () => {
  const { name } = useParams<{ name: string }>();
  const [iso2Codes, setIso2Codes] = useState<string[]>([]);

  console.log(name)

  const { loading: countryLoading, error: countryError, data: dataCountry } = useQuery(GET_COUNTRY, {
    variables: { code: name },
    skip: !name
  });
  console.log(dataCountry)

  //const { loading: weatherLoading, error: weatherError, data: weatherData } = useFetch<any>(`https://api.openweathermap.org/data/2.5/weather?q=${dataCountry?.country?.capital}&appid=${import.meta.env.VITE_WEATHER_API}`)
  //console.log(weatherData)
  const { loading, error, data } = useFetch<any>(`https://restcountries.com/v3.1/alpha/${name}`);

  useEffect(() => {
    if (data?.[0]?.borders) {
      const iso3codes = data[0].borders;
      const convertedCodes = iso3codes.map((code: string) => countries.alpha3ToAlpha2(code) || "Unknown");
      setIso2Codes(convertedCodes.filter((code: string) => code !== "Unknown"));
    }
  }, [data]);

  const { loading: borderLoading, error: borderError, data: borderData } = useQuery(GET_BORDERS, {
    variables: {
      codes: iso2Codes,
    },
    skip: !iso2Codes.length,
  });

  if (countryLoading || borderLoading || loading) return <p>Loading...</p>;
  if (countryError) return <p>Error: {countryError.message}</p>;
  if (!dataCountry?.country) return <p>No country found</p>;

  const country = dataCountry.country;
  console.log(borderData)

  return (
    <section className="p-4">
      <Link to="/">Go to home</Link>
      <h1 className="text-4xl">{country.name}</h1>
      <p className="text-xl mt-4">Capital: {country.capital || '-'}</p>
      <p className="text-xl mt-4">Continent: {country.continent.name}</p>
      <span aria-hidden="true" className="text-6xl">{country.emoji}</span>
      <div className="mt-4">
        <p className="font-bold">Languages:</p>
        {country.languages.map((lang: { name: string }, index: number) => (
          <span key={index} className="mr-2">{lang.name}</span>
        ))}
      </div>
      <p className="mt-4">Currency: {country.currency}</p>

      {borderData?.countries && borderData.countries.length > 0 && (
        <div className="mt-4">
          <p className="font-bold">Bordering Countries:</p>
          {borderData.countries.map((border: { name: string, code: string }) => (
            <Link to={`/details/${border.code}`} key={border.code} className="mr-2">{border.name}</Link>
          ))}
        </div>
      )}
    </section>
  );
};

export default Details;