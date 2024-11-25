import { gql } from "@apollo/client";

export const GET_BORDERS = gql`
  query countries($codes: [String!]!) {
    countries(filter: { code: { in: $codes } }) {
      code
      name
      capital
    }
  }
`