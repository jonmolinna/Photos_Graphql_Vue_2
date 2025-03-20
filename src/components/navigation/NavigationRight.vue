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
        prepend-icon="mdi-account"
        v-bind:title="capitalizeLetter(user.name)"
        v-bind:value="user._id"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
// IMPORTACIONES DE BIBLIOTECAS EXTERNAS
import { onMounted, ref, type Ref, watch } from 'vue'

// IMPORTACIONES DE ARCHIVOS INTERNOS
import ProgressLinear from '../feedback/ProgressLinear.vue'
import { useUserQuery } from '@/hooks/user-graphql/useUserQuery'
import type { USER } from '@/interface/user.interface'
import { capitalizeLetter } from '@/setting/letter.setting'

// ESTADO Y VARIABLES REACTIVOS
const users: Ref<USER[]> = ref([])

const { loading, load, data } = useUserQuery()

watch(
  () => data.value,
  (newUsers) => {
    if (newUsers) {
      users.value = newUsers as Array<USER>
    }
  },
)

// CICLO DE VIDA
onMounted(async () => {
  await load()
})
</script>
