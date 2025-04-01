import { ref, type Ref } from 'vue'
import { useLazyQuery } from '@vue/apollo-composable'
import type { USER } from '@/interface/user.interface'
import { GET_USER_BY_ID } from '@/graphql/user.gql'

export function useUserQuery(userId: Ref<string>) {
  const data: Ref<USER | null> = ref(null)

  const { loading, load, onResult } = useLazyQuery(GET_USER_BY_ID, () => ({
    id: userId.value,
  }))

  onResult((result) => {
    data.value = result.data?.getUser as USER
  })

  return { data, loading, load: async () => await load() }
}
