import { GET_PROFILE } from '@/graphql/auth.gql'
import type { USER } from '@/interface/user.interface'
import { useQuery } from '@vue/apollo-composable'
import { ref, type Ref } from 'vue'

export const useAuthQuery = () => {
  const data: Ref<USER | null> = ref(null)

  const { loading, onResult, onError } = useQuery(GET_PROFILE)

  onResult((result) => {
    data.value = result.data?.getProfile
  })

  onError((err) => {
    console.log('ERROR --> ', err.graphQLErrors)
  })

  return {
    data,
    loading,
  }
}
