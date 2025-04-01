import gql from 'graphql-tag'

// MUTATION
export const ADD_MESSAGE = gql`
  mutation AddMessage($input: CreateMessageInput!) {
    addMessage(input: $input) {
      _id
      from
      message
      to
      createdAt
    }
  }
`

// QUERIES
// GET ALL MESSAGES BY FROM -TO
export const GET_MESSAGES = gql`
  query getMessages($to: ID!) {
    getMessages(to: $to) {
      _id
      from
      to
      message
      createdAt
    }
  }
`

// SUBSCRIPTIONS
// MESSAGE SUBS
export const MESSAGE_SUBSCRIPTION = gql`
  subscription MessageAdd {
    messageAdd {
      _id
      from
      to
      message
      createdAt
    }
  }
`
