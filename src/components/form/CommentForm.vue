<template>
  <v-card v-bind:loading="loading" class="mx-auto bg-grey-lighten-3 w-100" max-width="500">
    <v-card-item>
      <v-form
        ref="form"
        v-model="validForm"
        v-on:submit.prevent="async () => await mutate()"
        class="w-100 bg-grey-lighten-3 d-flex ga-2 align-content-center"
      >
        <v-text-field
          v-model="initialForm.comment"
          v-bind:rules="[required, min5, max50]"
          placeholder="Agrega un comentario..."
          variant="solo"
          density="compact"
          class="bg-grey-lighten-3"
        />
        <v-btn
          v-bind:disabled="!validForm"
          v-bind:loading="loading"
          type="submit"
          block
          class="d-none"
        >
          SEND
        </v-btn>
      </v-form>
    </v-card-item>
  </v-card>
</template>

<script lang="ts" setup>
// IMPORTACIONES DE ARCHIVOS INTERNOS
import { useCommentMutation } from '@/hooks/comment-graphql/useCommentMutation'
import { useValidateForm } from '@/hooks/form/useValidateForm'

// PROPS
const props = defineProps({
  post_id: {
    required: true,
    type: String,
  },
})

// ESTADO Y VARIABLES REACTIVOS
const { loading, initialForm, mutate, validForm, form } = useCommentMutation(props.post_id)
const { required, min5, max50 } = useValidateForm()
</script>
