import { ref, type Ref } from 'vue'
import { useMutation } from '@vue/apollo-composable'
import { ADD_LIKE_OR_DELETE_LIKE } from '@/graphql/like.gql'
import type { LIKE_POST } from '@/interface/like.interface'
import { GET_POSTS } from '@/graphql/post.gql'
import type { POST } from '@/interface/post.interface'

export function useLikeMutation(postId: Ref<string>) {
  const data: Ref<LIKE_POST | null> = ref(null)

  const { mutate, loading, onDone } = useMutation(ADD_LIKE_OR_DELETE_LIKE, () => ({
    variables: {
      postId: postId.value,
    },
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
