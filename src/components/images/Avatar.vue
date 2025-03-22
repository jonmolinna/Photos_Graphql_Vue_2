<template>
  <v-avatar v-if="name" color="cyan-darken-2">
    <span class="text-h6">{{ charAtFirstLetter(name) }}</span>
  </v-avatar>
  <v-avatar v-else color="cyan-darken-2">
    <v-icon icon="mdi-account"></v-icon>
  </v-avatar>
</template>

<script lang="ts" setup>
import { charAtFirstLetter } from '@/setting/letter.setting'

defineProps({
  name: {
    type: String,
    default: '',
  },
})
</script>
