<template>
  <v-btn class="text-grey-darken-2">
    <v-icon icon="mdi-message-outline" start variant="text" size="large" />
    {{ comments > 0 ? comments : '' }}
  </v-btn>
</template>

<script lang="ts" setup>
defineProps({
  comments: {
    type: Number,
    required: true,
    default: 0,
  },
})
</script>
