<template>
  <v-btn @click="async () => await mutate()">
    <v-icon
      v-bind:icon="isLiked ? 'mdi-heart' : 'mdi-heart-outline'"
      variant="text"
      size="large"
      start
      v-bind:class="isLiked ? 'text-pink-darken-1' : 'text-grey-darken-2'"
    />
    {{ likes.length > 0 ? likes.length : '' }}
  </v-btn>
</template>

<script lang="ts" setup>
// IMPORTACIONES DE BIBLIOTECAS EXTERNAS
import { computed, onMounted, ref, type Ref, watch } from 'vue'
import { storeToRefs } from 'pinia'

// IMPORTACIONES DE ARCHIVOS INTERNOS
import type { LIKE_POST } from '@/interface/like.interface'
import { useProfileStore } from '@/stores/profile.store'
import { useLikeMutation } from '@/hooks/like-graphql/useLikeMutation'

// ESTADO Y VARIABLES REACTIVOS
const likes: Ref<LIKE_POST[]> = ref([])
const postId: Ref<string> = ref('')
const storeProfile = useProfileStore()

const { data, mutate } = useLikeMutation(postId)
const { profile } = storeToRefs(storeProfile)

const props = defineProps({
  likes: {
    required: true,
    type: Array as () => LIKE_POST[],
  },
  post_id: {
    required: true,
    type: String,
  },
})

const isLiked = computed({
  get: () => likes.value.find((like) => like.user === profile.value?._id),
  set: (value: LIKE_POST) => {
    likes.value = likes.value.find((item) => item._id === value._id)
      ? likes.value.filter((item) => item._id !== value._id)
      : [...likes.value, value]
  },
})

watch(
  () => data.value,
  (newLike) => {
    isLiked.value = newLike as LIKE_POST
  },
)

// CICLO DE VIDA
onMounted(() => {
  likes.value = props.likes
  postId.value = props.post_id
})
</script>
