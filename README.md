# React + TypeScript + Vite: WikiCountry

App to search all the countries around the world and see their details.

project: https://crionet-mavigliano.vercel.app/

## Setup

1. clone the repo
2. run `npm i` to install all the dependencies
3. run `npm run dev` to start the project locally

## APIs 
- Countries GraphQL API -> to bring all the countries, and data about them
- OpenWeather (REST) API -> to bring the data about the weather
- Restcountries (REST) API -> I used this API to have information about the neighbouring countries

## Used technologies:
- Vite
- React
- Typescript
- GraphQL
- Apollo
- Tailwind
- React Router
- i18n-iso-countries (to convert the codes of the countries from iso3 to iso2 so I can perfom the graphQL petition for data)

## What the application does?

The application is a simple country searcher where the user can filter the countries by continent and sort them in a descendant or ascendant way by its name. Furthermore, the user can access to more information if he/she clicks on the "read more" link. Once it is clicked, the user will access to the country information as well as name, capital, flag, population, time zone, neighbouring countries, temperature, etc. 

## Next Steps
- add translations and handle them with i18n
- add tests with vitest
- include a pagination
- handle the theme of the application.
