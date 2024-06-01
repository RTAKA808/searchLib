import { gql } from "@apollo/client";

export const GET_USER = gql`
  {
    myProfile {
      savedBooks {
        authors
        bookId
        description
        image
        title
      }
      username
      email
      _id
    }
  }
`;
