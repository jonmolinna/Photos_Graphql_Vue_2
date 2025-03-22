import gql from 'graphql-tag'

// MUTATION
export const DELETE_POST = gql`
  mutation DeletePost($postId: ID!) {
    deletePost(postId: $postId) {
      _id
      comment
      createdAt
    }
  }
`

// QUERIES
export const GET_POSTS = gql`
  query {
    getPosts {
      _id
      comment
      createdAt
      user {
        _id
        name
      }
      likes {
        _id
        post
        user
      }
      comments {
        _id
      }
    }
  }
`
