import { ADD_MESSAGE } from '@/graphql/message.gql'
import type { MESSAGE } from '@/interface/message.interface'
import { useMutation } from '@vue/apollo-composable'
import { ref, type Ref } from 'vue'

interface FORM {
  message: string
}

export function useMessageMutation(to: Ref<string>) {
  const data: Ref<MESSAGE | null> = ref(null)
  const initialForm: Ref<FORM> = ref({ message: '' })
  const form = ref()
  const validForm: Ref<boolean> = ref(false)

  const { loading, mutate, onDone } = useMutation(ADD_MESSAGE, () => ({
    variables: {
      input: {
        to: to.value,
        message: initialForm.value.message,
      },
    },
  }))

  onDone((result) => {
    if (result.data) {
      form.value.reset()
    }
  })

  return { loading, data, initialForm, form, validForm, mutate }
}
