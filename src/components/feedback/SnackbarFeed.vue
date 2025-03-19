<template>
  <v-snackbar v-model="show2" v-bind:timeout="3000" v-bind:color="color">
    {{ message }}
    <template v-slot:actions>
      <v-btn variant="text" @click="show2 = false"> Ok </v-btn>
    </template>
  </v-snackbar>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const emit = defineEmits()

const props = defineProps({
  message: {
    type: String,
    required: true,
    default: 'this is a message',
  },
  color: {
    type: String,
    default: 'pink-darken-1',
  },
  show: {
    type: Boolean,
    default: false,
  },
})

const show2 = computed({
  get: () => props.show,
  set: (val: boolean) => emit('update', val),
})
</script>
