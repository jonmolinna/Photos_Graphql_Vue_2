<template>
  <v-card-item>
    <v-toolbar>
      <template v-slot:prepend>
        <Avatar size="x-small" v-bind:name="comment?.user.name" />
      </template>
      <v-card-text class="text-grey-darken-2">
        <span class="text-grey-darken-4">
          {{ capitalizeLetter(comment?.user.name) }}
        </span>
        {{ comment?.comment }}
      </v-card-text>
      <template v-slot:append>
        <ButtonDelete
          v-if="profile?._id === comment?.user._id"
          :loading="loading"
          @handleClick="() => (openConfirm = true)"
        />
        <ButtonLikeComment
          v-bind:commentId="comment._id"
          v-bind:likes="comment.likes"
          v-bind:postId="comment.post"
        />
      </template>
    </v-toolbar>
    <p class="text-caption text-right text-grey-darken-1 mr-3">
      {{
        format({ date: new Date(Number(comment?.createdAt)), format: 'DD-MM-YYYY', locale: 'es' })
      }}
    </p>
  </v-card-item>
  <DialogConfirm
    v-bind:open="openConfirm"
    v-on:update="openConfirm = $event"
    title="Eliminar"
    text="¿Estas seguro de eliminar el comentario?"
    @handleClick="handleClickConfirm"
  />
</template>

<script lang="ts" setup>
// IMPORTACIONES DE BIBLIOTECAS EXTERNAS
import { storeToRefs } from 'pinia'
import { format } from '@formkit/tempo'
import { watch } from 'vue'

// IMPORTACIONES DE ARCHIVOS INTERNOS
import DialogConfirm from './DialogConfirm.vue'
import Avatar from '../images/Avatar.vue'
import ButtonDelete from './ButtonDelete.vue'
import ButtonLikeComment from './ButtonLikeComment.vue'
import { useDialogConfirm } from '@/hooks/containment/useDialogConfirm'
import type { COMMENT } from '@/interface/comment.interface'
import { capitalizeLetter } from '@/setting/letter.setting'
import { useProfileStore } from '@/stores/profile.store'
import { useCommentMutationDelete } from '@/hooks/comment-graphql/useCommentMutationDelete'

// ESTADO Y VARIABLES REACTIVOS
const storeProfile = useProfileStore()

const { profile } = storeToRefs(storeProfile)
const { openConfirm, handleClickConfirm, isDelete } = useDialogConfirm()

// PROPS
const props = defineProps({
  comment: {
    type: Object as () => COMMENT,
    required: true,
  },
})

const { loading, mutate } = useCommentMutationDelete(props.comment._id, props.comment.post)

watch(
  () => isDelete.value,
  () => {
    if (isDelete.value) {
      mutate()
    }
  },
)
</script>
