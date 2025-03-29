import { DELETE_POST, GET_POSTS } from '@/graphql/post.gql'
import type { POST } from '@/interface/post.interface'
import { useMutation } from '@vue/apollo-composable'
import { ref, type Ref } from 'vue'

export function usePostMutationDelete(postId: string) {
  const data: Ref<POST | null> = ref(null)
  const errors: Ref<Array<string>> = ref([])

  const { loading, mutate, onDone } = useMutation(DELETE_POST, () => ({
    variables: {
      postId,
    },
    refetchQueries: [{ query: GET_POSTS }],
  }))

  onDone((result) => {
    data.value = result.data?.deletePost
  })

  return {
    loading,
    errors,
    data,
    mutate: async () => {
      await mutate()
    },
  }
}
