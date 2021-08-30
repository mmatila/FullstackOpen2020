require('dotenv').config();
const mongoose = require('mongoose');
const { ApolloServer, gql, UserInputError } = require('apollo-server');
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
    bookCount: async () => await Book.countDocuments({}),
    authorCount: async () => await Author.countDocuments({}),
    allAuthors: async () => await Author.find({}),
    allBooks: async (root, args) => {
      if (args.genre && args.author) {
        const author = await Author.find({ name: args.author });
        return await Book
          .find({
            genres: { $in: args.genre },
            author: author ? author : null
          })
          .populate('author');
      }
      if (args.genre) {
        return await Book
          .find({ genres: { $in: args.genre } })
          .populate('author');
      }
      if (args.author) {
        const author = await Author.find({ name: args.author });
        return await Book
          .find({ author: author ? author : null })
          .populate('author')
      }
      return await Book.find({}).populate('author');
    },
  },
  Mutation: {
    addBook: async (root, args) => {
      const author = new Author({
        name: args.author,
        bookCount: 1,
        id: uuid()
      });
      try {
        await author.save();
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args.author })
      }

      const book = new Book({ ...args, id: uuid(), author: author.id });
      try {
        await book.save();
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args.title });
      }

      return book;
    },
    editAuthor: async (root, args) =>  await Author
      .findOneAndUpdate({ name: args.name }, { born: args.setBornTo }, { new: true })
  },
  Author: {
    bookCount: async ({ id }) => await Book.countDocuments({ author: id })
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
