<template>
  <v-sheet
    rounded="xl"
    :elevation="2"
    class="pa-2"
    style="width: fit-content"
    :class="[profile?._id === message.from ? 'ml-auto' : 'bg-blue-grey-lighten-5']"
  >
    {{ message.message }}
    <v-chip color="secondary" density="compact" size="small" variant="text">
      {{
        format({
          date: new Date(Number(message.createdAt)),
          format: 'DD-MM-YYYY',
          locale: 'es',
        })
      }}
    </v-chip>
  </v-sheet>
</template>

<script lang="ts" setup>
// IMPORTACIONES DE BIBLIOTECAS EXTERNAS
import { storeToRefs } from 'pinia'
import { format } from '@formkit/tempo'

// IMPORTACIONES DE ARCHIVOS INTERNOS
import type { MESSAGE } from '@/interface/message.interface'
import { useProfileStore } from '@/stores/profile.store'

// PROPS
defineProps({
  message: {
    type: Object as () => MESSAGE,
    required: true,
  },
})

// ESTADO Y VARIABLES REACTIVOS
const storeProfile = useProfileStore()

const { profile } = storeToRefs(storeProfile)
</script>
