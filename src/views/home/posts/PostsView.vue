<template>
  <HomeLayout>
    <div class="d-flex justify-center pt-12" v-if="loading">
      <ProgressCircular />
    </div>
    <div class="d-flex flex-column ga-5 my-4" v-else>
      <Card v-for="post in posts" :key="post._id" v-bind:post="post" />
    </div>
  </HomeLayout>
</template>

<script lang="ts" setup>
// IMPORTACIONES DE BIBLIOTECAS EXTERNAS
import { onMounted, watch } from 'vue'
import { storeToRefs } from 'pinia'

// IMPORTACIONES DE ARCHIVOS INTERNOS
import HomeLayout from '../HomeLayout.vue'
import ProgressCircular from '@/components/feedback/ProgressCircular.vue'
import Card from '@/components/containment/Card.vue'
import { usePostQuery } from '@/hooks/post-graphql/usePostQuery'
import type { POST } from '@/interface/post.interface'
import { usePostStore } from '@/stores/post.store'

// ESTADO Y VARIABLES REACTIVOS
const storePost = usePostStore()
const { loading, loadAll, data } = usePostQuery()
const { posts } = storeToRefs(storePost)

watch(
  () => data.value,
  (newData) => {
    const data = newData as POST[]
    storePost.addPosts(data)
  },
)

// CICLO DE VIDA DEL COMPONENTE
onMounted(() => {
  loadAll()
})
</script>
