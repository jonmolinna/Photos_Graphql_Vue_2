<template>
  <HomeLayout>
    <div class="d-flex justify-center pt-7" v-if="loading">
      <ProgressCircular />
    </div>
    <div v-else class="pt-2">
      <div class="d-flex flex-column ga-1 my-3" v-if="post && errors.length < 1">
        <Card v-bind:post="post" />
        <CommentForm v-bind:post_id="post._id" />
        <CardSlots v-bind:comments="comments" />
      </div>
      <v-card v-else class="mx-auto bg-grey-lighten-3 w-100" max-width="500">
        <AlertFeed type="error" />
      </v-card>
    </div>
  </HomeLayout>
</template>

<script lang="ts" setup>
// IMPORTACIONES DE BIBLIOTECAS EXTERNAS
import { useRoute } from 'vue-router'
import { onMounted, ref, watch, type Ref } from 'vue'

// IMPORTACIONES DE ARCHIVOS INTERNOS
import HomeLayout from '../HomeLayout.vue'
import ProgressCircular from '@/components/feedback/ProgressCircular.vue'
import AlertFeed from '@/components/feedback/AlertFeed.vue'
import Card from '@/components/containment/Card.vue'
import CardSlots from '@/components/containment/CardSlots.vue'
import CommentForm from '@/components/form/CommentForm.vue'
import { usePostQuery } from '@/hooks/post-graphql/usePostQuery'
import type { COMMENT } from '@/interface/comment.interface'

// ESTADO Y VARIABLES REACTIVOS
const route = useRoute()
const comments: Ref<Array<COMMENT>> = ref([])

const params = route.params?.postId as string
const { loading, data: post, load, errors } = usePostQuery(params)

watch(
  () => post.value?.comments,
  (newData) => {
    comments.value = newData as Array<COMMENT>
  },
)

// CICLO DE VIDA DEL COMPONENTE
onMounted(() => {
  load()
})
</script>
