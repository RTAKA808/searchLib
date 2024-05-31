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
    link: String
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    user(_id: ID, username: String): User
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth
    login(username: String, email: String, password: String!): Auth
    saveBook(bookId: String!, authors: String, description: String, title: String, image: String, link: String): User
    deleteBook(bookId: String!): User
  }
`;



module.exports = typeDefs;
