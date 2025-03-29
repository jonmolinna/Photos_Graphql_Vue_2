<template>
  <v-btn @click="async () => await mutate()" class="text-grey-darken-2" size="x-small">
    <v-icon
      v-bind:icon="isLiked ? 'mdi-heart' : 'mdi-heart-outline'"
      variant="text"
      start
      v-bind:class="isLiked ? 'text-pink-darken-1' : 'text-grey-darken-2'"
    />
    {{ likes.length > 0 ? likes.length : '' }}
  </v-btn>
</template>

<script lang="ts" setup>
// IMPORTACIONES DE BIBLIOTECAS EXTERNAS
import { storeToRefs } from 'pinia'
import { computed, onMounted, ref, watch, type Ref } from 'vue'

// IMPORTACIONES DE ARCHIVOS INTERNOS
import { useLikeCommentMutation } from '@/hooks/like-comment-graphql/useLikeCommentMutation'
import type { LIKE_COMMENT } from '@/interface/like.interface'
import { useProfileStore } from '@/stores/profile.store'

// ESTADO Y VARIABLES REACTIVOS
const commentId: Ref<string> = ref('')
const likes: Ref<LIKE_COMMENT[]> = ref([])
const storeProfile = useProfileStore()

const { profile } = storeToRefs(storeProfile)
const { mutate, data } = useLikeCommentMutation(commentId)

const isLiked = computed({
  get: () => likes.value.find((like) => like.user === profile.value?._id),
  set: (value: LIKE_COMMENT) => {
    likes.value.find((item) => item._id === value._id)
      ? likes.value.filter((item) => item._id !== value._id)
      : [...likes.value, value]
  },
})

//PROPS
const props = defineProps({
  comment_id: {
    type: String,
    required: true,
  },
  likes: {
    required: true,
    type: Array as () => LIKE_COMMENT[],
    default: [],
  },
})

watch(
  () => props.comment_id,
  (id) => {
    commentId.value = id
  },
)

watch(
  () => data.value,
  (newLike) => {
    isLiked.value = newLike as LIKE_COMMENT
  },
)

// CICLO DE VIDA
onMounted(() => {
  likes.value = props.likes
})
</script>
