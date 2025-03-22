import gql from 'graphql-tag'

// MUTATION
// ADD LIKE OR DELETE LIKE
export const ADD_LIKE_OR_DELETE_LIKE = gql`
  mutation AddLikeOrUnlikePost($postId: ID!) {
    addLikeOrUnlikePost(postId: $postId) {
      _id
      user
      post
      createdAt
    }
  }
`
