<template>
  <v-overlay :model-value="overlay" class="align-center justify-center">
    <ProgressCircular />
  </v-overlay>
</template>

<script lang="ts" setup>
import ProgressCircular from './ProgressCircular.vue'

defineProps({
  overlay: {
    type: Boolean,
    default: false,
  },
})
</script>
