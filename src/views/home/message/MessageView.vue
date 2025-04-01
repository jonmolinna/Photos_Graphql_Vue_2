<template>
  <HomeLayout>
    <div v-if="loading" class="d-flex justify-center pt-7">
      <ProgressCircular />
    </div>
    <v-card
      v-else
      class="mx-auto bg-grey-lighten-2 d-flex flex-column"
      max-width="500"
      height="100vh"
      variant="text"
    >
      <v-card-item>
        <v-toolbar>
          <template v-slot:prepend>
            <Avatar v-bind:name="user?.name" />
            <v-card-title
              class="ml-2 text-subtitle-1 text-no-wrap text-grey-darken-4"
              style="width: 17ch"
            >
              {{ capitalizeLetter(user?.name) }}
            </v-card-title>
          </template>
        </v-toolbar>
      </v-card-item>
      <v-card-item v-if="data && data.length < 1" class="flex-1-1">
        <v-card-subtitle class="text-center"> Aún no hay mensajes </v-card-subtitle>
      </v-card-item>
      <v-card-item v-else>
        <v-virtual-scroll :items="data" :height="'70vh'" class="gap-2">
          <template v-slot:default="{ item }">
            <v-list-item class="mt-2">
              <Message v-bind:message="item" />
            </v-list-item>
          </template>
        </v-virtual-scroll>
      </v-card-item>
      <v-card-item>
        <v-form
          v-on:submit.prevent="async () => await sendMessage()"
          ref="form"
          v-model="validForm"
        >
          <v-text-field
            v-model="initialForm.message"
            v-bind:rules="[required, minLength4, max50]"
            type="text"
            label="Enviar mensaje"
            variant="solo"
          />
          <v-btn v-bind:disabled="!validForm" class="mt-2 d-none" type="submit">Send</v-btn>
        </v-form>
      </v-card-item>
    </v-card>
  </HomeLayout>
</template>

<script lang="ts" setup>
// IMPORTACIONES DE BIBLIOTECAS EXTERNAS
import { useRoute } from 'vue-router'
import { computed, onMounted, ref, watch, type Ref } from 'vue'
import { storeToRefs } from 'pinia'

// IMPORTACIONES DE ARCHIVOS INTERNOS
import HomeLayout from '../HomeLayout.vue'
import Avatar from '@/components/images/Avatar.vue'
import ProgressCircular from '@/components/feedback/ProgressCircular.vue'
import Message from '@/components/containment/Message.vue'
import { capitalizeLetter } from '@/setting/letter.setting'
import { useUserQuery } from '@/hooks/user-graphql/useUserQuery'
import { useMessagesQuery } from '@/hooks/message-graphql/useMessagesQuery'
import { useMessageMutation } from '@/hooks/message-graphql/useMessageMutation'
import { useValidateForm } from '@/hooks/form/useValidateForm'
import { useMessageSubscription } from '@/hooks/message-graphql/useMessageSubscription'
import type { MESSAGE } from '@/interface/message.interface'
import { useProfileStore } from '@/stores/profile.store'

// ESTADO Y VARIABLES REACTIVOS
const userId: Ref<string> = ref('')
const route = useRoute()
userId.value = route.params?.userId as string
const storeProfile = useProfileStore()

const { profile } = storeToRefs(storeProfile)
const { load, loading, data: user } = useUserQuery(userId)
const { data: messages, load: loadMessages } = useMessagesQuery(userId)
const { initialForm, form, validForm, mutate: sendMessage } = useMessageMutation(userId)
const { data: message } = useMessageSubscription()
const { max50, minLength4, required } = useValidateForm()

const data = computed({
  get: () => messages.value,
  set: (message: MESSAGE) => {
    const array = [profile.value?._id, user.value?._id] // [from, to]
    const isMessageCorrect = array.includes(message.from) && array.includes(message.to)

    if (isMessageCorrect) {
      messages.value = [message, ...messages.value]
    }
  },
})

watch(
  () => route.params.userId,
  (id) => {
    userId.value = id as string
  },
)

watch(
  () => message.value,
  (newMessage) => {
    if (newMessage) {
      data.value = newMessage as MESSAGE
    }
  },
)

// CICLO DE VIDA
onMounted(() => {
  load()
  loadMessages()
})
</script>
