import { gql } from '@apollo/client';

export const GET_COUNTRIES = gql`
  query SearchCountries($search: String) {
    countries(filter: { name: { regex: $search } }) {
      name
      code
      emoji
      currency
      languages {
        name
      }
      continent {
        name
      }
    }
  }
`;
