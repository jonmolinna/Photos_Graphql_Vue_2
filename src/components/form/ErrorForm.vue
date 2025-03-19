<template>
  <v-banner>
    <v-banner-text>
      <ul>
        <li v-for="(error, index) in errors" :key="index">
          {{ index + 1 }} {{ '. ' }} {{ error }}
        </li>
      </ul>
    </v-banner-text>
  </v-banner>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'

defineProps({
  errors: {
    type: Array as () => string[],
    default: () => [],
  },
})
</script>
