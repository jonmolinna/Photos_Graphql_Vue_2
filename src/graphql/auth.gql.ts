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
