import { GET_POST_BY_ID } from '@/graphql/post.gql'
import type { POST } from '@/interface/post.interface'
import { useLazyQuery } from '@vue/apollo-composable'
import { ref, type Ref } from 'vue'

export function usePostQuery(postId: string) {
  const data: Ref<POST | null> = ref(null)
  const errors: Ref<Array<string>> = ref([])

  const { loading, load, onResult, onError } = useLazyQuery(GET_POST_BY_ID, () => ({
    id: postId,
  }))

  onResult((result) => {
    data.value = result.data?.getPost
  })

  onError((error) => {
    if (error.graphQLErrors && error.graphQLErrors[0] && error.graphQLErrors[0].message) {
      const err = error.graphQLErrors[0].message
      errors.value = error as unknown as Array<string>
    } else {
      errors.value.push(error.message)
    }
  })

  return {
    loading,
    data,
    errors,
    load: async () => {
      await load()
    },
  }
}
