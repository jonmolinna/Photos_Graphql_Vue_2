import { GET_POSTS } from '@/graphql/post.gql'
import type { POST } from '@/interface/post.interface'
import { useLazyQuery } from '@vue/apollo-composable'
import { ref, type Ref } from 'vue'

export function usePostQuery(postId?: Ref<string>) {
  const data: Ref<Array<POST> | POST | null> = ref(null)

  const { loading: loadingAll, load: loadAll, onResult: onResultAll } = useLazyQuery(GET_POSTS)

  onResultAll((result) => {
    data.value = result.data?.getPosts
  })

  return {
    data,
    loading: loadingAll,
    load: async () => {
      if (postId?.value) {
        console.log('Hola a todos ---> ', postId.value)
        // await load({ id: postId.value })
      } else {
        await loadAll()
      }
    },
  }
}
