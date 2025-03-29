import gql from 'graphql-tag'

// MUTATION
// ADD COMMENT
export const ADD_COMMENT = gql`
  mutation AddComment($input: CreateCommentInput!) {
    addComment(input: $input) {
      _id
      comment
      createdAt
      post
      user {
        _id
        name
        email
        createdAt
      }
      likes {
        _id
        comment
        user
        createdAt
      }
    }
  }
`

// DELETE COMMENT
export const DELETE_COMMENT = gql`
  mutation DeleteComment($commentId: ID!) {
    deleteComment(commentId: $commentId) {
      _id
    }
  }
`
