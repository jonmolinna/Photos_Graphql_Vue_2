<template>
  <div class="mx-auto" style="max-width: 1280px">
    <div class="d-flex justify-center pt-12" v-if="loading">
      <ProgressCircular />
    </div>
    <v-card v-else class="bg-grey-lighten-2">
      <v-layout>
        <article>
          <NavigationLeft />
        </article>
        <div class="w-100 px-2" style="height: 100vh; overflow-y: auto">
          <slot></slot>
        </div>
        <article v-if="mdAndUp">
          <NavigationRight />
        </article>
      </v-layout>
    </v-card>
  </div>
</template>

<script lang="ts" setup>
// IMPORTACIONES DE BIBLIOTECAS EXTERNAS
import { watch } from 'vue'
import { useDisplay } from 'vuetify'

// IMPORTACIONES DE ARCHIVOS INTERNOS
import NavigationLeft from '@/components/navigation/NavigationLeft.vue'
import ProgressCircular from '@/components/feedback/ProgressCircular.vue'
import NavigationRight from '@/components/navigation/NavigationRight.vue'
import { useAuthQuery } from '../../hooks/auth-graphql/useAuthQuery'
import { useProfileStore } from '@/stores/profile.store'

// ESTADO Y VARIABLES REACTIVOS
const storeProfile = useProfileStore()

const { loading, data } = useAuthQuery()
const { mdAndUp } = useDisplay()

watch(
  () => data.value,
  (newData) => {
    if (newData) {
      storeProfile.addProfile(newData)
    }
  },
)
</script>
