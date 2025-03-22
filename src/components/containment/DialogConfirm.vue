<template>
  <v-dialog v-model="dialog" max-width="500">
    <v-card class="bg-grey-darken-4">
      <v-card-item>
        <v-card-title class="text-subtitle-1">{{ title }}</v-card-title>
      </v-card-item>
      <v-divider />
      <v-card-item>
        <v-card-text> {{ text }} </v-card-text>
      </v-card-item>
      <v-divider />
      <template v-slot:actions>
        <v-btn @click="emit('handleClick', true)" color="pink-darken-3"> Confirmar </v-btn>
        <v-btn @click="emit('handleClick', false)" color="cyan-darken-2"> Cancelar </v-btn>
      </template>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const emit = defineEmits()

const props = defineProps({
  open: {
    type: Boolean,
    required: true,
    default: false,
  },
  title: {
    type: String,
    required: true,
    default: 'Accion',
  },
  text: {
    type: String,
    required: true,
    default: '¿Estas seguro de realizar la acción?',
  },
})

const dialog = computed({
  get() {
    return props.open
  },
  set(value: boolean) {
    emit('update', value)
  },
})
</script>
