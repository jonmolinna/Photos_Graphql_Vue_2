import { DELETE_COMMENT } from '@/graphql/comment.gql'
import { GET_POST_BY_ID, GET_POSTS } from '@/graphql/post.gql'
import { useMutation } from '@vue/apollo-composable'

export function useCommentMutationDelete(commentId: string, postId: string) {
  const { loading, mutate, onError } = useMutation(DELETE_COMMENT, () => ({
    variables: {
      commentId: commentId,
    },
    refetchQueries: [{ query: GET_POST_BY_ID, variables: { id: postId } }],
  }))

  onError((error) => {
    console.log('ERROR ---> ', error.graphQLErrors)
  })

  return {
    loading,
    mutate: async () => {
      await mutate()
    },
  }
}
