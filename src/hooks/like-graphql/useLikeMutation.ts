import { ref, type Ref } from 'vue'
import { useMutation } from '@vue/apollo-composable'
import { ADD_LIKE_OR_DELETE_LIKE } from '@/graphql/like.gql'
import type { LIKE_POST } from '@/interface/like.interface'
import { GET_POSTS } from '@/graphql/post.gql'

export function useLikeMutation(postId: string) {
  const data: Ref<LIKE_POST | null> = ref(null)

  const { mutate, loading, onDone } = useMutation(ADD_LIKE_OR_DELETE_LIKE, () => ({
    variables: {
      postId: postId,
    },
    refetchQueries: [{ query: GET_POSTS }],
  }))

  onDone((result) => {
    data.value = result.data?.addLikeOrUnlikePost
  })

  return {
    loading,
    mutate,
    data,
  }
}
