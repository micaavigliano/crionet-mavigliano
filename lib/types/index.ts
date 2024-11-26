export interface WeatherProps {
  main: {
    temp: number;
    humidity: string;
  };
  weather: {
    icon: string;
    description: string
  }[]
}

export interface CountryProps {
  name: string;
  capital?: string[];
  flags: {
    alt: string;
  };
  population: number;
  timezones: string[];
  languages?: { [key: string]: string };
  currencies?: {
    [key: string]: {
      name: string;
    };
  };
  borders?: string[];
  cca3: string;
  emoji: string;
}

export interface CountriesProps {
  code: string;
  name: string;
  emoji: string;
  continent: {
    name: string
  };
  languages: {
    name: string
  }[];
  capital: string;
}