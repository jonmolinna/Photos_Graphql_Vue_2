import { AUTHENTICATION } from '@/graphql/auth.gql'
import { useMutation } from '@vue/apollo-composable'
import { ref, type Ref } from 'vue'

interface FORM {
  email: string
  password: string
}

export function useAuthMutation() {
  const data: Ref<string> = ref('')
  const initialForm: Ref<FORM> = ref({ email: '', password: '' })
  const errors: Ref<Array<string>> = ref([])
  const form = ref()
  const validForm: Ref<boolean> = ref(false)

  //   AUTHENTICATION
  const { mutate, loading, onDone, onError } = useMutation(AUTHENTICATION, () => ({
    variables: {
      loginUserInput: {
        email: initialForm.value.email.trim().toLocaleLowerCase(),
        password: initialForm.value.password,
      },
    },
  }))

  onDone((result) => {
    data.value = result.data?.login?.access_token as string
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
      errors.value.push(error)
    } else {
      errors.value.push(err.message)
    }
  })

  return {
    data,
    initialForm,
    errors,
    form,
    validForm,
    mutate,
    loading,
  }
}
