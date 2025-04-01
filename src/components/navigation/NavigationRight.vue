<template>
  <v-navigation-drawer
    location="right"
    permanent
    class="bg-grey-lighten-2 position-relative mr-auto"
    style="min-height: 100vh"
  >
    <v-list-item lines="two" title="Chats" />
    <v-divider />
    <v-list density="compact" nav>
      <ProgressLinear v-if="loading" />
      <v-list-item
        v-else
        v-for="user in users"
        v-bind:key="user._id"
        v-on:click="() => router.push(`/m/${user._id}`)"
        prepend-icon="mdi-account"
        v-bind:title="capitalizeLetter(user.name)"
        v-bind:value="user._id"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
// IMPORTACIONES DE BIBLIOTECAS EXTERNAS
import { useRouter } from 'vue-router'

// IMPORTACIONES DE ARCHIVOS INTERNOS
import ProgressLinear from '../feedback/ProgressLinear.vue'
import { capitalizeLetter } from '@/setting/letter.setting'
import { useUsersQuery } from '@/hooks/user-graphql/useUsersQuery'

// ESTADO Y VARIABLES REACTIVOS
const router = useRouter()

const { loading, data: users } = useUsersQuery()
</script>
