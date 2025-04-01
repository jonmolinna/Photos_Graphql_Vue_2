<template>
  <HomeLayout>
    <aside class="mt-5">
      <v-card class="mx-auto bg-grey-lighten-3 w-100" max-width="500">
        <v-list class="bg-grey-lighten-3">
          <v-list-subheader>Usuarios</v-list-subheader>
          <v-list-item
            v-for="(user, i) in users"
            :key="i"
            :value="user"
            v-on:click="() => router.push(`/m/${user._id}`)"
            color="grey-darken-4"
          >
            <template v-slot:prepend>
              <Avatar v-bind:name="user.name" />
            </template>
            <v-list-item-title>{{ capitalizeLetter(user.name) }}</v-list-item-title>
            <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
          </v-list-item>
        </v-list>
      </v-card>
    </aside>
  </HomeLayout>
</template>

<script lang="ts" setup>
// IMPORTACIONES DE BIBLIOTECAS EXTERNAS
import { useRouter } from 'vue-router'

// IMPORTACIONES DE ARCHIVOS INTERNOS
import HomeLayout from '../HomeLayout.vue'
import Avatar from '@/components/images/Avatar.vue'
import { useUsersQuery } from '@/hooks/user-graphql/useUsersQuery'
import { capitalizeLetter } from '@/setting/letter.setting'

const { data: users } = useUsersQuery()

const router = useRouter()
</script>
