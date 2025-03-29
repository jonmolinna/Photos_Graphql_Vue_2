import { ADD_LIKE_OR_DELETE_LIKE_COMMENT } from '@/graphql/like-comment.gql'
import { GET_POST_BY_ID } from '@/graphql/post.gql'
import type { LIKE_COMMENT } from '@/interface/like.interface'
import { useMutation } from '@vue/apollo-composable'
import { ref, type Ref } from 'vue'

export function useLikeCommentMutation(commentId: string, postId: string) {
  const data: Ref<LIKE_COMMENT | null> = ref(null)

  const { loading, onDone, mutate } = useMutation(ADD_LIKE_OR_DELETE_LIKE_COMMENT, () => ({
    variables: {
      commentId: commentId,
    },
    refetchQueries: [{ query: GET_POST_BY_ID, variables: { id: postId } }],
  }))

  onDone((result) => {
    data.value = result.data?.addLikeOrUnlikeComment as LIKE_COMMENT
  })

  return {
    loading,
    data,
    mutate,
  }
}
