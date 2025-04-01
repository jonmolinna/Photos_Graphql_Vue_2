<template>
  <v-navigation-drawer
    permanent
    v-bind:rail="smAndDown"
    class="position-relative bg-grey-lighten-2"
    style="min-height: 100vh"
  >
    <v-list-item prepend-icon="mdi-account" v-bind:title="capitalizeLetter(profile?.name)" />
    <v-divider />
    <v-list density="compact" nav>
      <v-list-item
        v-on:click="() => router.push({ path: '/' })"
        prepend-icon="mdi-home-variant-outline"
        title="Inicio"
        value="home"
      />
      <v-list-item
        v-on:click="() => router.push({ path: '/upload' })"
        prepend-icon="mdi-upload-outline"
        title="Crear"
        value="crear"
      />
      <v-list-item
        v-if="smAndDown"
        v-on:click="() => router.push({ path: '/m/users' })"
        prepend-icon="mdi-account-group-outline"
        title="Chats"
        value="chats"
      />
      <v-list-item
        v-on:click="handleLogout"
        prepend-icon="mdi-exit-to-app"
        title="Salir"
        value="salir"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
// IMPORTACIONES DE BIBLIOTECAS EXTERNAS
import { useDisplay } from 'vuetify'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useApolloClient } from '@vue/apollo-composable'

// IMPORTACIONES DE ARCHIVOS INTERNOS
import { useProfileStore } from '@/stores/profile.store'
import { capitalizeLetter } from '@/setting/letter.setting'
import { KEY_LOCAL_STORAGE } from '@/constants'

// ESTADO Y VARIABLES REACTIVOS
const storeProfile = useProfileStore()
const router = useRouter()

const { profile } = storeToRefs(storeProfile)
const { smAndDown } = useDisplay()
const apolloClient = useApolloClient().client

const handleLogout = async () => {
  storeProfile.resetProfile()
  router.push({ path: '/login' })
  localStorage.removeItem(KEY_LOCAL_STORAGE)
  await apolloClient.resetStore()
}
</script>
