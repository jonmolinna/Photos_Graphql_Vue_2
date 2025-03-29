<template>
  <v-btn @click="async () => await mutate()" v-bind:loading="loading">
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
const storeProfile = useProfileStore()

const props = defineProps({
  likes: {
    required: true,
    type: Array as () => LIKE_POST[],
  },
  postId: {
    required: true,
    type: String,
  },
})

const { mutate, loading } = useLikeMutation(props.postId)
const { profile } = storeToRefs(storeProfile)

const isLiked = computed(() => likes.value.find((like) => like.user === profile.value?._id))

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
