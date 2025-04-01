import { MESSAGE_SUBSCRIPTION } from '@/graphql/message.gql'
import type { MESSAGE } from '@/interface/message.interface'
import { useSubscription } from '@vue/apollo-composable'
import { ref, type Ref } from 'vue'

export function useMessageSubscription() {
  const data: Ref<MESSAGE | null> = ref(null)

  const { onResult } = useSubscription(MESSAGE_SUBSCRIPTION, null, () => ({
    fetchPolicy: 'no-cache',
  }))

  onResult((result) => {
    data.value = result.data?.messageAdd
  })

  return {
    data,
  }
}
