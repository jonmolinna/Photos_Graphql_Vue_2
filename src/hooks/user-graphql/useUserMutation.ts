import { ADD_USER } from '@/graphql/user.gql'
import type { USER } from '@/interface/user.interface'
import { useMutation } from '@vue/apollo-composable'
import { ref, type Ref } from 'vue'

interface FORM {
  name: string
  email: string
  password: string
}

export function useUserMutation() {
  const data: Ref<USER | null> = ref(null)
  const initialForm: Ref<FORM> = ref({ name: '', email: '', password: '' })
  const errors: Ref<string[]> = ref([])
  const form = ref()
  const validForm: Ref<boolean> = ref(false)

  // ADD USER
  const { mutate, onDone, onError, loading } = useMutation(ADD_USER, () => ({
    variables: {
      input: {
        name: initialForm.value.name.trim().toLocaleLowerCase(),
        email: initialForm.value.email.trim().toLocaleLowerCase(),
        password: initialForm.value.password,
      },
    },
  }))

  onDone((result) => {
    data.value = result.data?.addUser
    form.value.reset()
  })

  onError((err) => {
    if (
      err.graphQLErrors &&
      err.graphQLErrors[0] &&
      err.graphQLErrors[0].extensions &&
      err.graphQLErrors[0].extensions.originalError
    ) {
      const error = (err.graphQLErrors[0].extensions.originalError as { message: string }).message
      errors.value = error as unknown as Array<string>
    } else {
      errors.value.push(err.message)
    }
  })

  return {
    data,
    initialForm,
    mutate,
    loading: loading,
    errors,
    form,
    validForm,
  }
}
