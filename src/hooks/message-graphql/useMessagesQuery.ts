import { GET_MESSAGES } from '@/graphql/message.gql'
import type { MESSAGE } from '@/interface/message.interface'
import { useLazyQuery } from '@vue/apollo-composable'
import { ref, type Ref } from 'vue'

export function useMessagesQuery(to: Ref<string>) {
  const data: Ref<MESSAGE[]> = ref([])

  const { loading, onResult, load } = useLazyQuery(
    GET_MESSAGES,
    () => ({
      to: to.value,
    }),
    { fetchPolicy: 'no-cache' },
  )

  onResult((result) => {
    data.value = result.data?.getMessages as MESSAGE[]
  })

  return {
    loading,
    data,
    load: async () => await load(),
  }
}
