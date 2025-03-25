import { ref, type Ref } from 'vue'
import { useMutation } from '@vue/apollo-composable'
import { ADD_POST, DELETE_POST, GET_POSTS, UDPATE_POST } from '@/graphql/post.gql'
import type { POST } from '@/interface/post.interface'
import { da } from 'vuetify/locale'

interface FORM {
  comment: string
}

export function usePostMutation(postId?: Ref<string>) {
  const data: Ref<POST | null> = ref(null)
  const errors: Ref<string[]> = ref([])
  const initialForm: Ref<FORM> = ref({ comment: '' })
  const form = ref()
  const validForm: Ref<boolean> = ref(false)

  // DELETE
  const { loading: loadingDelete, mutate: deletePost } = useMutation(DELETE_POST, () => ({
    variables: {
      postId: postId?.value,
    },
    update: (cache, { data: { deletePost } }) => {
      let data = cache.readQuery<{ getPosts: POST[] }>({ query: GET_POSTS })

      if (data) {
        cache.writeQuery({
          query: GET_POSTS,
          data: {
            ...data,
            getPosts: data.getPosts.filter((post) => post._id !== deletePost._id),
          },
        })

        cache.evict({ id: `PostType:${deletePost._id}` })
      }
    },
  }))

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
      postId: postId?.value,
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
    loading: loadingDelete || loadingAdd || loadingUpdate,
    data,
    initialForm,
    form,
    validForm,
    errors,
    mutateAdd: async () => {
      await addPost()
    },
    mutateDelete: async () => {
      await deletePost()
    },
    mutateUpdate: async () => {
      await mutateUpdate()
    },
  }
}
