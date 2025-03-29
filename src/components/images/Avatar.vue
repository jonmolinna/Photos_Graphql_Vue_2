<template>
  <v-avatar v-if="name" color="cyan-darken-2" :size="size">
    <span :class="[size === 'x-small' ? 'text-caption' : 'text-h6']">{{
      charAtFirstLetter(name)
    }}</span>
  </v-avatar>
  <v-avatar v-else color="cyan-darken-2" :size="size">
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
  size: {
    type: String,
    validator(value: string) {
      return ['x-small', 'x-large'].includes(value)
    },
  },
})
</script>
