<template>
  <HomeLayout>
    <div class="d-flex justify-center pt-12" v-if="loading">
      <ProgressCircular />
    </div>
    <aside v-else class="mt-7 mb-5">
      <v-card class="mx-auto w-100 bg-grey-lighten-3" max-width="500">
        <v-card-item>
          <v-card-subtitle class="text-center">
            {{ post ? 'Actualizar publicación' : 'Crear nueva publicación' }}
          </v-card-subtitle>
        </v-card-item>
        <v-divider />
        <v-card-item>
          <v-toolbar>
            <Avatar v-bind:name="profile?.name" />
            <v-card-title
              class="ml-2 text-subtitle-1 text-no-wrap text-grey-darken-4"
              style="width: 25ch"
            >
              {{ capitalizeLetter(profile?.name) }}
            </v-card-title>
          </v-toolbar>
        </v-card-item>
        <v-card-item>
          <v-form
            v-on:submit.prevent="() => (post ? mutateUpdate() : mutateAdd())"
            ref="form"
            v-model="validForm"
          >
            <v-textarea
              v-model="initialForm.comment"
              v-bind:rules="[required, max400, min5]"
              counter
              rows="10"
            />
            <v-btn
              v-bind:disabled="!validForm"
              type="submit"
              block
              color="pink-darken-1"
              class="mt-1"
            >
              {{ post ? 'Actualizar' : 'Publicar' }}
            </v-btn>
            <v-btn v-if="post" block color="pink-darken-1" variant="outlined" class="mt-2"
              >Cancelar</v-btn
            >
          </v-form>
        </v-card-item>
      </v-card>
      <v-card v-if="errors.length > 0" class="mx-auto mt-4" max-width="500">
        <ErrorForm v-bind:errors="errors" />
      </v-card>
    </aside>
  </HomeLayout>
</template>

<script lang="ts" setup>
// IMPORTACIONES DE BIBLIOTECAS EXTERNAS
import { storeToRefs } from 'pinia'
import { onMounted, onUnmounted, watch } from 'vue'
import { useRouter } from 'vue-router'

// IMPORTACIONES DE ARCHIVOS INTERNOS
import HomeLayout from '../HomeLayout.vue'
import Avatar from '@/components/images/Avatar.vue'
import ErrorForm from '@/components/form/ErrorForm.vue'
import ProgressCircular from '@/components/feedback/ProgressCircular.vue'
import { useProfileStore } from '@/stores/profile.store'
import { capitalizeLetter } from '@/setting/letter.setting'
import { usePostMutation } from '@/hooks/post-graphql/usePostMutation'
import { useValidateForm } from '@/hooks/form/useValidateForm'
import { usePostStore } from '@/stores/post.store'
import { usePostQuery } from '@/hooks/post-graphql/usePostQuery'
import type { POST } from '@/interface/post.interface'

// ESTADO Y VARIABLES REACTIVOS
const storeProfile = useProfileStore()
const storePost = usePostStore()
const router = useRouter()

const { profile } = storeToRefs(storeProfile)
const { id: postId } = storeToRefs(storePost)
const { required, min5, max400 } = useValidateForm()
const { mutateAdd, mutateUpdate, initialForm, form, validForm, errors, data } = usePostMutation(
  postId.value,
)
const { loading, load, data: post } = usePostQuery(postId.value)

watch(
  () => data.value,
  (newData) => {
    if (newData) {
      router.push({ path: '/' })
    }
  },
)

watch(
  () => post.value,
  (newPost) => {
    let data = newPost as POST
    initialForm.value.comment = data?.comment
  },
)

// CICLO DE VIDA DEL COMPONENTE
onMounted(() => {
  if (postId.value) {
    load()
  }
})

onUnmounted(() => {
  if (postId.value) {
    storePost.deleteIdPost()
  }
})
</script>
