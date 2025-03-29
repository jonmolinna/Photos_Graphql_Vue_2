<template>
  <v-btn
    @click="async () => await mutate()"
    v-bind:loading="loading"
    class="text-grey-darken-2"
    size="x-small"
  >
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
const likes: Ref<LIKE_COMMENT[]> = ref([])
const storeProfile = useProfileStore()

const { profile } = storeToRefs(storeProfile)

const isLiked = computed(() => likes.value.find((like) => like.user === profile.value?._id))

//PROPS
const props = defineProps({
  commentId: {
    type: String,
    required: true,
  },
  likes: {
    required: true,
    type: Array as () => LIKE_COMMENT[],
    default: [],
  },
  postId: {
    type: String,
    required: true,
  },
})

const { mutate, loading } = useLikeCommentMutation(props.commentId, props.postId)

watch(
  () => props.likes,
  (data) => {
    likes.value = data
  },
)

// CICLO DE VIDA
onMounted(() => {
  likes.value = props.likes
})
</script>
