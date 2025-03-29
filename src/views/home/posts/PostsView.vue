<template>
  <HomeLayout>
    <div class="d-flex justify-center pt-12" v-if="loading">
      <ProgressCircular />
    </div>
    <div class="d-flex flex-column ga-5 my-4">
      <Card v-for="post in data" :key="post._id" v-bind:post="post" />
    </div>
  </HomeLayout>
</template>

<script lang="ts" setup>
// IMPORTACIONES DE ARCHIVOS INTERNOS
import HomeLayout from '../HomeLayout.vue'
import ProgressCircular from '@/components/feedback/ProgressCircular.vue'
import Card from '@/components/containment/Card.vue'
import { usePostsQuery } from '@/hooks/post-graphql/usePostsQuery'

// ESTADO Y VARIABLES REACTIVOS
const { loading, data } = usePostsQuery()
</script>
