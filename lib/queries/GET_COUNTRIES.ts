import { gql } from "@apollo/client";

export const GET_COUNTRIES = gql`
  query GetCountries($name: StringQueryOperatorInput, $continent: StringQueryOperatorInput) {
    countries(
      filter: {
        name: $name
        continent: $continent
      }
    ) {
      code
      name
      emoji
      continent {
        name
      }
      languages {
        name
      }
      capital
    }
  }
`;