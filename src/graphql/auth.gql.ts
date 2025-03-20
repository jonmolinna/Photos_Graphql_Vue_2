import gql from 'graphql-tag'

// MUTATIONS
// AUTHENTICATION
export const AUTHENTICATION = gql`
  mutation Login($loginUserInput: AuthInput!) {
    login(loginUserInput: $loginUserInput) {
      access_token
    }
  }
`
// QUERIES
// GET PROFILE
export const GET_PROFILE = gql`
  query {
    getProfile {
      _id
      name
      email
      createdAt
    }
  }
`
