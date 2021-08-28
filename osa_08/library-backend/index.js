require('dotenv').config();
const mongoose = require('mongoose');
const { ApolloServer, gql } = require('apollo-server');
const { v1: uuid } = require('uuid')

const Author = require('./models/Author');
const Book = require('./models/Book');

const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }
`;

const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allAuthors: async () => await Author.find({}),
    allBooks: async (root, args) => {
      let filteredBooks = await Book.find({});
      if (args.author) filteredBooks = filteredBooks.filter(({ author }) => author === args.author)
      if (args.genre) filteredBooks = filteredBooks.filter(({ genres }) => genres.includes(args.genre))
      return filteredBooks;
    },
  },
  Mutation: {
    addBook: async (root, args) => {
      const author = new Author({
        name: args.author,
        bookCount: 1,
        id: uuid()
      });
      await author.save();

      const book = new Book({ ...args, id: uuid(), author: author.id });
      await book.save();

      return book;
    },
    editAuthor: (root, args) => {
      const author = authors.find(({ name }) => name === args.name)
      let editedAuthor = null;
      
      if (author) {
        editedAuthor = { ...author, born: args.setBornTo }
        authors = authors.map((author) =>
        author.id === editedAuthor.id
          ? editedAuthor
          : author
        );
      }

      return editedAuthor
    }
  },
  Author: {
    bookCount: ({ name }) => books.filter(({ author }) => author === name).length
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
