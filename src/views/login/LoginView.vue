<template>
  <div class="pt-12">
    <v-card v-bind:loading="loading" class="mx-auto" max-width="400">
      <v-card-item>
        <v-card-title class="text-center">Iniciar sesión </v-card-title>
      </v-card-item>
      <v-card-item>
        <v-form @submit.prevent="async () => await mutate()" ref="form" v-model="validForm">
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
            Iniciar Sesión
          </v-btn>
        </v-form>
      </v-card-item>
      <v-card-item>
        <v-card-subtitle class="text-center"> ¿Aún no tienes una cuenta? </v-card-subtitle>
        <v-btn
          v-on:click="() => router.push({ path: '/register' })"
          v-bind:loading="loading"
          variant="outlined"
          block
          class="mt-2"
          color="pink-darken-1"
        >
          Crea tu cuenta
        </v-btn>
      </v-card-item>
    </v-card>
    <v-card v-if="errors.length > 0" class="mx-auto mt-4" max-width="400">
      <ErrorForm v-bind:errors="errors" />
    </v-card>
  </div>
</template>

<script lang="ts" setup>
// IMPORTACIONES DE BIBLIOTECAS EXTERNAS
import { useRouter } from 'vue-router'
import { watch } from 'vue'

// IMPORTACIONES DE ARCHIVOS INTERNOS
import ErrorForm from '@/components/form/ErrorForm.vue'
import { useAuthMutation } from '@/hooks/auth-graphql/useAuthMutation'
import { useValidateForm } from '@/hooks/form/useValidateForm'
import { KEY_LOCAL_STORAGE } from '@/constants'

// ESTADO Y VARIABLES REACTIVOS
const router = useRouter()

const { mutate, loading, errors, initialForm, data, form, validForm } = useAuthMutation()
const { required, email, minLength4, maxLength20 } = useValidateForm()

watch(
  () => data.value,
  () => {
    if (data.value) {
      const token = data.value as string
      localStorage.setItem(KEY_LOCAL_STORAGE, token)
    }

    router.push({ path: '/' })
  },
)
</script>
