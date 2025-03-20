import gql from 'graphql-tag'

// MUTATIONS
// CREATE USER
export const ADD_USER = gql`
  mutation AddUser($input: CreateUserInput!) {
    addUser(input: $input) {
      _id
      name
      email
      createdAt
    }
  }
`
// QUERIES
// READ ALL USERS
export const GET_ALL_USERS = gql`
  query {
    getUsers {
      _id
      email
      name
      createdAt
    }
  }
`
