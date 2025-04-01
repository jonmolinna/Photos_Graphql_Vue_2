<template>
  <HomeLayout>
    <aside>
      <NavigationSelectUsers />
      <v-card class="mt-4 bg-grey-lighten-3 mx-auto" max-width="500">
        <v-card-item>
          <v-card-text class="text-center">
            Seleccione un usuario para iniciar una conversación
          </v-card-text>
        </v-card-item>
      </v-card>
    </aside>
  </HomeLayout>
</template>

<script lang="ts" setup>
// IMPORTACIONES DE ARCHIVOS INTERNOS
import HomeLayout from '../HomeLayout.vue'
import NavigationSelectUsers from '@/components/navigation/NavigationSelectUsers.vue'
</script>
