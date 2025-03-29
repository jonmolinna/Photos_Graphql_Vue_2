import gql from 'graphql-tag'

// MUTATION
// DELETE POST
export const DELETE_POST = gql`
  mutation DeletePost($postId: ID!) {
    deletePost(postId: $postId) {
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

// ADD POST
export const ADD_POST = gql`
  mutation AddPost($input: CreatePostInput!) {
    addPost(input: $input) {
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

// UPDATE POST
export const UDPATE_POST = gql`
  mutation UpdatePost($input: CreatePostInput!, $postId: ID!) {
    updatePost(input: $input, postId: $postId) {
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

// QUERIES
// GET POSTS
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

export const GET_POST_BY_ID = gql`
  query GetPost($id: ID!) {
    getPost(id: $id) {
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
  }
`
