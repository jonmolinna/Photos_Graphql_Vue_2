<template>
  <v-sheet
    class="pa-4 text-center mx-auto bg-grey-lighten-3"
    max-width="500"
    rounded="lg"
    width="100%"
  >
    <v-icon class="mb-5" v-bind:color="color" v-bind:icon="icon" size="50" />
    <h2 class="text-h5 mb-2">{{ title }}</h2>
    <p class="mb-4 text-medium-emphasis text-body-2">
      {{ text }}
    </p>
    <v-btn v-bind:color="color" v-on:click="() => router.push({ path: '/' })" variant="outlined">
      Home
    </v-btn>
  </v-sheet>
</template>

<script lang="ts" setup>
// IMPORTACIONES DE BIBLIOTECAS EXTERNAS
import type path from 'path'
import { useRouter } from 'vue-router'

// PROPS
defineProps({
  text: {
    type: String,
    default: 'Lo sentimos ocurrio un error',
  },
  title: {
    type: String,
    default: 'Ocurrio un error',
  },
  icon: {
    type: String as () => 'mdi-check-circle' | 'mdi-alert-circle-outline',
  },
  color: {
    type: String as () => 'success' | 'info' | 'warning' | 'error',
  },
})

// ESTADO Y VARIABLES REACTIVOS
const router = useRouter()
</script>
