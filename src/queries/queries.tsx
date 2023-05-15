import { gql } from "@apollo/client";


export const GET_CHAR = gql`
query getCharacters {
    Page(page: 5, perPage: 10) {
        characters(sort: ROLE) {
          id
          name {
            full
          }
          image {
            large
          }
        }
      }
}
`