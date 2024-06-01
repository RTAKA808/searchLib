const typeDefs =`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    savedBooks: [Book]
  }

  type Book {
    bookId: String
    authors: [String]
    description: String
    title: String
    image: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    myProfile: User
  }

  input BookInput {
    bookId: String
    authors: [String]
    description: String
    title: String
    image: String
}

  type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth
    login(username: String, email: String, password: String!): Auth
    saveBook(bookInfo: BookInput!): User
    deleteBook(bookId: String!): User
  }
`;



module.exports = typeDefs;

