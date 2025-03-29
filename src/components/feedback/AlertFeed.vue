<template>
  <v-alert v-bind:text="text" v-bind:title="title" v-bind:type="type" variant="tonal" />
</template>

<script lang="ts" setup>
defineProps({
  text: {
    type: String,
    default: 'Lo sentimos ocurrio un error',
  },
  title: {
    type: String,
    default: 'Ocurrio un error',
  },
  type: {
    type: (String as () => 'success' | 'info' | 'warning' | 'error') || null,
  },
})
</script>
