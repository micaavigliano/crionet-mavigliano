import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_COUNTRY } from '../../../lib/queries/GET_COUNTRY';
import { GET_BORDERS } from '../../../lib/queries/GET_BORDERS'
import useFetch from '../../hooks/useFetch';
import countries from "i18n-iso-countries";
import { Fragment, useEffect, useState } from 'react';
import enLocale from "i18n-iso-countries/langs/en.json";
import Loading from '../UI/Loading';
import { ChevronLeft } from 'lucide-react';
import Badge from '../UI/Badge';
import { pastelColors } from '../../../lib/helper/helper';
import Typography from '../UI/Typography';
import Error from '../UI/Error';
import Weather from '../UI/Weather';

countries.registerLocale(enLocale);

const Details = () => {
  const { name } = useParams<{ name: string }>();
  const [iso2Codes, setIso2Codes] = useState<string[]>([]);
  const [colorClasses] = useState(() => {
    const randomIndex = Math.floor(Math.random() * pastelColors.length);
    return pastelColors[randomIndex];
  });

  const { loading: countryLoading, error: countryError, data: dataCountry } = useQuery(GET_COUNTRY, {
    variables: { code: name },
    skip: !name
  });
  const { loading: weatherLoading, data: weatherData } = useFetch<any>(`https://api.openweathermap.org/data/2.5/weather?q=${dataCountry?.country?.capital}&units=metric&appid=${import.meta.env.VITE_WEATHER_API}`)
  const { loading, data } = useFetch<any>(`https://restcountries.com/v3.1/alpha/${name}`);

  useEffect(() => {
    if (data?.[0]?.borders) {
      const iso3codes = data[0].borders;
      const convertedCodes = iso3codes.map((code: string) => countries.alpha3ToAlpha2(code) || "Unknown");
      setIso2Codes(convertedCodes.filter((code: string) => code !== "Unknown"));
    }
  }, [data]);

  const { loading: borderLoading, data: borderData } = useQuery(GET_BORDERS, {
    variables: {
      codes: iso2Codes,
    },
    skip: !iso2Codes.length,
  });

  if (countryLoading || borderLoading || loading || weatherLoading) return <Loading />;
  if (countryError) return <Error message={countryError.message} />;

  const country = dataCountry.country;

  return (
    <main className="p-4">
      <Link to="/" className='flex flex-row items-center'>
        <ChevronLeft />
        <Typography as="span">Go to home</Typography>
      </Link>
      <section className="flex flex-col items-center">
        <Typography as='h1' variant='h1'>{country.name}</Typography>
        <div className='flex flex-col justify-center items-start mt-10 py-2 px-4 lg:w-fit gap-5'>
          <Typography as='p' variant='p'>
            <strong>Capital:</strong>{' '}
            <span className={`${colorClasses}`}>{country.capital || 'N/A'}</span>
          </Typography>
          <Typography as='p' variant='p'>
            <strong>Continent:</strong>{' '}
            <span className={`${colorClasses}`}>{country.continent.name}</span>
          </Typography>
          <Typography as='p' variant='p'>
            <strong>Flag: </strong>{' '}
            <span aria-label={data[0].flags.alt} className="text-3xl">{country.emoji}</span>
          </Typography>
          <Typography as='p' variant='p'>
            <strong>Population: </strong>{' '}
            <span>{data[0].population.toLocaleString('en-US')}</span>
          </Typography>
          <div className="flex flex-row gap-2 items-center flex-wrap">
            <Typography as='p' variant='p'>
              <strong>Time zone: </strong>
              {data[0].timezones.map((time: string) => (
                <span>{time}</span>
              ))}
            </Typography>
          </div>
          <div className="flex flex-row gap-2 items-center flex-wrap">
            <Typography as='p' variant='p'>
              <strong>Languages:</strong>
              {country.languages.map((lang: { name: string }, index: number) => (
                <Badge title={lang.name} key={index} className='ml-3' />
              ))}
            </Typography>
          </div>
          <Typography as='p' variant='p'>
            <strong>Currency:</strong>{' '}
            <span className={`${colorClasses}`}>{country.currency}</span>
          </Typography>
          <Typography as='p' variant='p'>
            <strong>Bordering Countries:</strong>{' '}
            {borderData?.countries?.map((border: { name: string; code: string }, index: number) => (
              <Fragment key={border.code}>
                {index > 0 && ' | '}
                <Link
                  to={`/details/${border.code}`}
                  className="hover:underline"
                >
                  {border.name}
                </Link>
              </Fragment>
            ))}
          </Typography>
          <Weather
            temperature={weatherData.main?.temp}
            conditions={weatherData.main?.humidity}
            icon={weatherData.weather[0].icon}
            description={weatherData.weather[0].description}
          />
        </div>
      </section>
    </main>
  );
};

export default Details;