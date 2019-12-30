
import { gql } from 'apollo-boost';

export const IS_AUTHENTICATED = gql`
    query IsAuthenticated {
        isAuthenticated @client(always: true)
    }
`;


export const LOGIN = gql`
    mutation Login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
          isAuthenticated
        }
      }
`;

export const LOGOUT = gql`
    mutation {
        logout {
            isAuthenticated
        }
    }
`;

export const GET_BOOKS = gql`
    {
        books {
            id
            title
        }
    }
`;

export const ADD_BOOK = gql`
    mutation AddBook($title: String!) {
        addBook(title: $title) {
            id
            title
        }
    }
`;

export const GET_GENRES = gql`
    {
        genres {
            id
            name
        }
    }
`;


export const ADD_GENRE = gql`
    mutation AddGenre($name: String!) {
        addGenre(name: $name) {
            id
            name
        }
    }
`;