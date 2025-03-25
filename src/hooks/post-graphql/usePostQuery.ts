import { GET_POST_BY_ID, GET_POSTS } from '@/graphql/post.gql'
import type { POST } from '@/interface/post.interface'
import { useLazyQuery } from '@vue/apollo-composable'
import { ref, type Ref } from 'vue'

export function usePostQuery(postId?: Ref<string>) {
  const data: Ref<Array<POST> | POST | null> = ref(null)

  const { loading: loadingAll, load: loadAll, onResult: onResultAll } = useLazyQuery(GET_POSTS)

  onResultAll((result) => {
    data.value = result.data?.getPosts
  })

  const {
    loading: loadingById,
    load: loadById,
    onResult: onResultById,
  } = useLazyQuery(GET_POST_BY_ID, () => ({
    id: postId?.value,
  }))

  onResultById((result) => {
    data.value = result.data?.getPost
  })

  return {
    data,
    loading: loadingAll || loadingById,
    loadAll: async () => {
      await loadAll()
    },
    loadById: async () => {
      await loadById()
    },
  }
}
