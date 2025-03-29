import { ADD_COMMENT } from '@/graphql/comment.gql'
import { GET_POST_BY_ID, GET_POSTS } from '@/graphql/post.gql'
import type { COMMENT } from '@/interface/comment.interface'
import type { POST } from '@/interface/post.interface'
import { useMutation } from '@vue/apollo-composable'
import { ref, type Ref } from 'vue'

interface FORM {
  comment: string
}

export function useCommentMutation(postId: string) {
  const data: Ref<COMMENT | null> = ref(null)
  const initialForm: Ref<FORM> = ref({ comment: '', post: '' })
  const form = ref()
  const validForm: Ref<boolean> = ref(false)

  //   ADD
  const { loading, mutate, onDone, onError } = useMutation(ADD_COMMENT, () => ({
    variables: {
      input: {
        comment: initialForm.value.comment.trim(),
        post: postId,
      },
    },
    update: (cache, { data: addComment }) => {
      let data = cache.readQuery<{ getPost: POST }>({
        query: GET_POST_BY_ID,
        variables: { id: postId },
      })

      if (data && data.getPost) {
        const comment = addComment.addComment

        data = {
          ...data,
          getPost: {
            ...data.getPost,
            comments: [comment, ...data.getPost.comments],
          },
        }

        cache.writeQuery({ query: GET_POST_BY_ID, data })
      }
    },
  }))

  onDone((result) => {
    form.value.reset()
  })

  onError((err) => {
    console.log('ERROR -> ', err.graphQLErrors)
  })

  return {
    data,
    initialForm,
    form,
    validForm,
    loading,
    mutate,
  }
}
