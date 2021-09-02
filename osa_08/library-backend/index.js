require('dotenv').config();
const mongoose = require('mongoose');
const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server');
const { v1: uuid } = require('uuid')
const jwt = require('jsonwebtoken');

const Author = require('./models/Author');
const Book = require('./models/Book');
const User = require('./models/User');

const MONGODB_URI = process.env.MONGODB_URI;
const JWT_SECRET = 'SECRET'

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
    me: User
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
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
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

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  
  type Token {
    value: String!
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
    me: (root, args, { currentUser }) => currentUser,
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      const bookExists = await Book.findOne({ title: args.title });
      const authorExists = await Author.findOne({ name: args.author });

      if (!currentUser) throw new AuthenticationError('Authentication required');

      if (bookExists) {
        throw new UserInputError('Book already exists', {
          invalidArgs: args.title
        });
      };

      if (!authorExists) {
        const author = new Author({
          name: args.author,
        });
        try {
          await author.save();
        } catch (error) {
          throw new UserInputError('Error creating new user', { invalidArgs: args.author })
        }
      }
      
      const author = await Author.findOne({ name: args.author });
      const book = new Book({ ...args, id: uuid(), author });
      try {
        await book.save();
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args.title });
      }
      
      return book;
    },
    editAuthor: async (root, args, { currentUser }) =>  {
      if (!currentUser) throw new AuthenticationError('Authentication required');
      return await Author
        .findOneAndUpdate({ name: args.name }, { born: args.setBornTo }, { new: true })
    },
    createUser: (root, { username, favoriteGenre }) => {
      const user = new User({ username, favoriteGenre });
      
      return user.save()
        .catch((error) => {
          throw new UserInputError((error.message), {
            invalidArgs: args,
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
  
      if ( !user || args.password !== 'salasana' ) {
        throw new UserInputError('Wrong username or password');
      }
  
      const userForToken = {
        username: user.username,
        id: user._id,
      }
  
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  },
  Author: {
    bookCount: async ({ id }) => await Book.countDocuments({ author: id })
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User
        .findById(decodedToken.id)
      return { currentUser }
    }
  },
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
