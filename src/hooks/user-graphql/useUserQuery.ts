import { ref, type Ref } from 'vue'
import { useLazyQuery } from '@vue/apollo-composable'
import type { USER } from '@/interface/user.interface'
import { GET_ALL_USERS } from '@/graphql/user.gql'

export function useUserQuery(userId?: Ref<string>) {
  const data: Ref<USER[] | USER | null> = ref(null)

  const { load, loading, onResult } = useLazyQuery(GET_ALL_USERS)

  onResult((result) => {
    data.value = result.data?.getUsers as USER[]
  })

  return { data, loading, load }
}
