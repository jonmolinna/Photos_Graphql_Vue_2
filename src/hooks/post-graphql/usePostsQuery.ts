import { GET_POSTS } from '@/graphql/post.gql'
import type { POST } from '@/interface/post.interface'
import { useQuery } from '@vue/apollo-composable'
import { ref, type Ref } from 'vue'

export function usePostsQuery() {
  const data: Ref<Array<POST>> = ref([])

  const { loading, onResult } = useQuery(GET_POSTS)

  onResult((result) => {
    data.value = result.data?.getPosts
  })

  return {
    data,
    loading,
  }
}
