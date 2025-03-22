import { DELETE_POST } from '@/graphql/post.gql'
import type { POST } from '@/interface/post.interface'
import { useMutation } from '@vue/apollo-composable'
import type { Ref } from 'vue'
import { ref } from 'vue'

export function usePostMutation(postId?: Ref<string>) {
  const data: Ref<POST | null> = ref(null)

  // DELETE
  const {
    loading: loadingDelete,
    mutate: deletePost,
    onDone,
  } = useMutation(DELETE_POST, () => ({
    variables: {
      postId: postId?.value,
    },
  }))

  onDone((result) => {
    data.value = result.data?.deletePost as POST
  })

  return {
    loading: loadingDelete,
    data,
    mutate: async () => {
      if (postId?.value) {
        await deletePost()
      }
    },
  }
}
