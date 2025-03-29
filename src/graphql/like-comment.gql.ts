import gql from 'graphql-tag'

// MUTATION
export const ADD_LIKE_OR_DELETE_LIKE_COMMENT = gql`
  mutation addLikeOrUnlikeComment($commentId: ID!) {
    addLikeOrUnlikeComment(commentId: $commentId) {
      _id
      user
      comment
      createdAt
    }
  }
`
