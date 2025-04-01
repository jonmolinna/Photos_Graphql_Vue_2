import { ref, type Ref } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import type { USER } from '@/interface/user.interface'
import { GET_ALL_USERS } from '@/graphql/user.gql'

export function useUsersQuery() {
  const data: Ref<USER[]> = ref([])

  const { loading, onResult } = useQuery(GET_ALL_USERS)

  onResult((result) => {
    data.value = result.data?.getUsers as USER[]
  })

  return { data, loading }
}
