<template>
  <div class="pt-12 pb-4">
    <v-card v-bind:loading="loading" class="mx-auto" max-width="400">
      <v-card-item>
        <v-card-title class="text-center"> Crea tu cuenta </v-card-title>
      </v-card-item>
      <v-card-item>
        <v-form @submit.prevent="async () => await mutate()" ref="form" v-model="validForm">
          <v-text-field
            v-model="initialForm.name"
            v-bind:rules="[required, minLength4, maxLength20]"
            type="text"
            label="Nombres"
          />
          <v-text-field
            v-model="initialForm.email"
            v-bind:rules="[required, email]"
            type="email"
            label="Email"
          />
          <v-text-field
            v-model="initialForm.password"
            v-bind:rules="[required, minLength4, maxLength20]"
            type="password"
            label="Contraseña"
          />
          <v-btn
            v-bind:disabled="!validForm"
            v-bind:loading="loading"
            type="submit"
            color="pink-darken-1"
            block
          >
            Crea tu cuenta
          </v-btn>
        </v-form>
      </v-card-item>
      <v-card-item>
        <v-card-subtitle class="text-center"> ¿Tienes una cuenta? </v-card-subtitle>
        <v-btn
          v-on:click="() => router.push({ path: '/login' })"
          v-bind:loading="loading"
          variant="outlined"
          block
          class="mt-2"
          color="pink-darken-1"
        >
          Inicia sesión
        </v-btn>
      </v-card-item>
    </v-card>
    <v-card v-if="errors.length > 0" class="mx-auto mt-4" max-width="400">
      <ErrorForm v-bind:errors="errors" />
    </v-card>
    <SnackbarFeed
      v-bind:message="message"
      v-bind:color="color"
      v-bind:show="show"
      v-on:update="show = $event"
    />
  </div>
</template>

<script lang="ts" setup>
// IMPORTACIONES DE BIBLIOTECAS EXTERNAS
import { useRouter } from 'vue-router'
import { watch } from 'vue'

// IMPORTACIONES DE ARCHIVOS INTERNOS
import ErrorForm from '@/components/form/ErrorForm.vue'
import SnackbarFeed from '@/components/feedback/SnackbarFeed.vue'
import { useUserMutation } from '@/hooks/user-graphql/useUserMutation'
import { useSnackbarFeed } from '@/hooks/feedback/useSnackbarFeed'
import { useValidateForm } from '@/hooks/form/useValidateForm'

// ESTADO Y VARIABLES REACTIVOS
const router = useRouter()

const { mutate, initialForm, loading, errors, form, validForm, data } = useUserMutation()
const { required, email, minLength4, maxLength20 } = useValidateForm()
const { show, message, color, showSnackbar } = useSnackbarFeed()

watch(
  () => data.value,
  () => {
    if (data.value) {
      showSnackbar('Usuario registrado correctamente', 'success', true)
    }
  },
)
</script>
