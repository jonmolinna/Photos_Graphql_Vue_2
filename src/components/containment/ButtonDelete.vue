<template>
  <v-btn
    @click="$emit('handleClick')"
    v-bind:loading="loading"
    class="text-grey-darken-2"
    size="x-small"
  >
    <v-icon icon="mdi-delete-outline" variant="text" />
  </v-btn>
</template>

<script setup lang="ts">
defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
})
</script>
