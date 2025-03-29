<template>
  <HomeLayout>
    <v-card class="mx-auto my-8 bg-grey-lighten-3 w-100" max-width="500">
      <v-card-item>
        <v-card-title class="text-center"> 404 NOT FOUND </v-card-title>
        <v-card-subtitle class="text-center">Volver al inicio</v-card-subtitle>
        <v-card-actions class="d-flex justify-center">
          <v-btn
            v-on:click="() => router.push({ path: '/' })"
            variant="outlined"
            color="pink-darken-2"
          >
            HOME
          </v-btn>
        </v-card-actions>
      </v-card-item>
    </v-card>
  </HomeLayout>
</template>

<script lang="ts" setup>
// IMPORTACIONES DE BIBLIOTECAS EXTERNAS
import { useRouter } from 'vue-router'

// IMPORTACIONES DE ARCHIVOS INTERNOS
import HomeLayout from '../HomeLayout.vue'

const router = useRouter()
</script>
