import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
mutation Mutation($password: String!, $email: String) {
  login(password: $password, email: $email) {
    user {
      username
      email
    }
    token
  }
}

`;

export const ADD_USER = gql`
mutation Mutation($username: String!, $email: String!, $password: String!) {
  createUser(username: $username, email: $email, password: $password) {
    token
    user {
      _id
      username
      email
    }
  }
}
`;

export const SAVE_BOOK = gql`
  mutation saveBook($bookInfo: BookInput!) {
    saveBook(bookInfo: $bookInfo) {
      _id
      username
      email
      
    }
  }
`;





export const REMOVE_BOOK = gql`
  mutation deleteBook($bookId: String!) {
  deleteBook(bookId: $bookId) {
    _id
    email
    savedBooks {
      authors
      bookId
      description
      image
      title
    }
    username
  }
}
`;