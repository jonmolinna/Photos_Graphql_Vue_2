<template>
  <HomeLayout>
    <div v-if="loading" class="d-flex justify-center pt-7">
      <ProgressCircular />
    </div>
    <article v-else>
      <MessageCard v-if="user" v-bind:user="user" />
      <v-card v-else class="mx-auto bg-grey-lighten-3 w-100" max-width="500">
        <AlertFeed type="error" color="error" icon="mdi-alert-circle-outline" />
      </v-card>
    </article>
  </HomeLayout>
</template>

<script lang="ts" setup>
// IMPORTACIONES DE BIBLIOTECAS EXTERNAS
import { useRoute } from 'vue-router'
import { onMounted, ref, watch, type Ref } from 'vue'

// IMPORTACIONES DE ARCHIVOS INTERNOS
import HomeLayout from '../HomeLayout.vue'
import ProgressCircular from '@/components/feedback/ProgressCircular.vue'
import MessageCard from '@/components/containment/MessageCard.vue'
import AlertFeed from '@/components/feedback/AlertFeed.vue'
import { useUserQuery } from '@/hooks/user-graphql/useUserQuery'

// ESTADO Y VARIABLES REACTIVOS
const userId: Ref<string> = ref('')
const route = useRoute()
userId.value = route.params?.userId as string

const { load, loading, data: user } = useUserQuery(userId)

watch(
  () => route.params.userId,
  (id) => {
    userId.value = id as string
  },
)

// CICLO DE VIDA
onMounted(() => {
  load()
})
</script>
