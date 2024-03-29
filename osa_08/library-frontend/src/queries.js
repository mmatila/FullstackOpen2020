import { gql } from '@apollo/client';

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;

export const ALL_BOOKS = gql`
  query allBooks($author: String, $genre: String){
    allBooks(
      author: $author,
      genre: $genre,
    ) {
      title
      published
      author {
        name
        id
        born
        bookCount
      }
      genres
    }
  }
`;

export const GET_CURRENT_USER = gql`
  query Query {
    me {
      username
      favoriteGenre
      id
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`;

export const ADD_BOOK = gql`
  mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
      title
      author {
        name
        id
        born
        bookCount
      }
      published
      genres
      id
    }
  }
`;

export const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(
      name: $name,
      setBornTo: $setBornTo,
    ) {
      name
      id
      born
      bookCount
    }
  }
`;

export const BOOK_ADDED = gql`
  subscription bookAdded {
    bookAdded {
      title
      author {
        name
        id
        born
        bookCount
      }
      published
      genres
      id
    }
  }
`