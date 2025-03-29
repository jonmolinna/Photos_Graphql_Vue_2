import { ref, type Ref } from 'vue'
import { useMutation } from '@vue/apollo-composable'
import { ADD_POST, GET_POSTS, UDPATE_POST } from '@/graphql/post.gql'
import type { POST } from '@/interface/post.interface'

interface FORM {
  comment: string
}

export function usePostMutation(postId?: string) {
  const data: Ref<POST | null> = ref(null)
  const errors: Ref<string[]> = ref([])
  const initialForm: Ref<FORM> = ref({ comment: '' })
  const form = ref()
  const validForm: Ref<boolean> = ref(false)

  // ADD
  const {
    loading: loadingAdd,
    mutate: addPost,
    onDone: onDoneAdd,
    onError: onErrorAdd,
  } = useMutation(ADD_POST, () => ({
    variables: {
      input: {
        comment: initialForm.value.comment.trim(),
      },
    },
    update: (cache, { data: { addPost } }) => {
      let data = cache.readQuery<{ getPosts: POST[] }>({ query: GET_POSTS })
      data = {
        ...data,
        getPosts: [addPost, ...(data?.getPosts || [])],
      }

      cache.writeQuery({ query: GET_POSTS, data })
    },
  }))

  onDoneAdd((result) => {
    data.value = result.data?.addPost
    form.value.reset()
  })

  onErrorAdd((err) => {
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

  // UPDATE
  const {
    loading: loadingUpdate,
    mutate: mutateUpdate,
    onDone: onDoneUpdate,
    onError: onErrorUpdate,
  } = useMutation(UDPATE_POST, () => ({
    variables: {
      input: {
        comment: initialForm.value.comment.trim(),
      },
      postId: postId,
    },
  }))

  onDoneUpdate((result) => {
    data.value = result.data?.updatePost as POST
    form.value.reset()
  })

  onErrorUpdate((err) => {
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
    loading: loadingAdd || loadingUpdate,
    data,
    initialForm,
    form,
    validForm,
    errors,
    mutateAdd: async () => {
      await addPost()
    },
    mutateUpdate: async () => {
      await mutateUpdate()
    },
  }
}
