<template>
  <v-card class="mx-auto bg-grey-lighten-4 w-100" max-width="500">
    <CardSlotItem
      v-if="comments.length > 0"
      v-for="comment in comments"
      :key="comment._id"
      v-bind:comment="comment"
    />
    <v-card-item v-else>
      <v-card-subtitle class="text-center">Aun no hay comentarios</v-card-subtitle>
    </v-card-item>
  </v-card>
</template>

<script lang="ts" setup>
// IMPORTACIONES DE ARCHIVOS INTERNOS
import CardSlotItem from './CardSlotItem.vue'
import type { COMMENT } from '@/interface/comment.interface'

const props = defineProps({
  comments: {
    type: Array as () => COMMENT[],
    required: true,
    default: [],
  },
})
</script>
