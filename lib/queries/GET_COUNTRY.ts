import { gql } from '@apollo/client';

export const GET_COUNTRY = gql`
  query GetCountryDetails($code: ID!) {
    country(code: $code) {
      name
      capital
      emoji
      code
      currency
      continent {
        name
      }
      languages {
        name
      }
    }
  }
`;
