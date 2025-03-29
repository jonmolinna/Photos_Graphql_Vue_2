<template>
  <v-card class="mx-auto bg-grey-lighten-3 w-100" max-width="500">
    <v-card-item>
      <v-toolbar>
        <template v-slot:prepend>
          <Avatar v-bind:name="post?.user?.name" />
          <v-card-title
            class="ml-2 text-subtitle-1 text-no-wrap text-grey-darken-4"
            style="width: 17ch"
          >
            {{ capitalizeLetter(post.user.name) }}
          </v-card-title>
        </template>
        <ButtonMenuhorizontal @handleClick="() => (openMenu = true)" />
      </v-toolbar>
    </v-card-item>
    <v-card-item class="text-grey-darken-5 text-left font-weight-light">
      {{ post.comment }}
    </v-card-item>
    <v-card-item>
      <v-toolbar>
        <template v-slot:prepend>
          <ButtonLikePost v-bind:likes="post.likes" v-bind:post_id="post._id" />
          <ButtonComment
            v-bind:comments="post.comments.length"
            v-on:click="() => router.push({ path: `/p/${post._id}` })"
          />
        </template>
      </v-toolbar>
    </v-card-item>
  </v-card>
  <DialogMenu
    v-bind:open-modal="openMenu"
    v-on:update="openMenu = $event"
    v-bind:data="menu"
    @handleClick="handleClickItems"
  />
  <DialogConfirm
    v-bind:open="openConfirm"
    v-on:update="openConfirm = $event"
    title="Eliminar"
    text="¿Estas seguro de eliminar la publicación?"
    @handleClick="handleClickConfirm"
  />
  <OverlaysFeed v-bind:overlay="loading" />
</template>

<script lang="ts" setup>
// IMPORTACIONES DE BIBLIOTECAS EXTERNAS
import { computed, ref, watch, type Ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

// IMPORTACIONES DE ARCHIVOS INTERNOS
import Avatar from '../images/Avatar.vue'
import ButtonLikePost from './ButtonLikePost.vue'
import ButtonComment from './ButtonComment.vue'
import ButtonMenuhorizontal from './ButtonMenuhorizontal.vue'
import DialogMenu from './DialogMenu.vue'
import DialogConfirm from './DialogConfirm.vue'
import OverlaysFeed from '../feedback/OverlaysFeed.vue'
import type { POST } from '@/interface/post.interface'
import { capitalizeLetter } from '@/setting/letter.setting'
import { MENU_ITEMS_CARD, type I_MENU_ITEMS } from '@/setting/post-card.data'
import { useProfileStore } from '@/stores/profile.store'
import { useCardDialog } from '@/hooks/containment/useCardDialog'
import { usePostStore } from '@/stores/post.store'
import { usePostMutationDelete } from '@/hooks/post-graphql/usePostMutationDelete'

// ESTADO Y VARIABLES REACTIVOS
const menu_item: Ref<I_MENU_ITEMS[]> = ref(MENU_ITEMS_CARD)
const storeProfile = useProfileStore()
const storePost = usePostStore()
const router = useRouter()

const { profile } = storeToRefs(storeProfile)
const { handleClickItems, openMenu, openConfirm, handleClickConfirm, isDelete, isUpdate } =
  useCardDialog()

const props = defineProps({
  post: {
    required: true,
    type: Object as () => POST,
  },
})

const { loading, mutate, data } = usePostMutationDelete(props.post._id)

const menu = computed(() =>
  menu_item.value.filter((item) =>
    item.author ? (profile.value?._id === props.post.user._id ? item : false) : item,
  ),
)

watch(
  () => isDelete.value,
  (newDelete) => {
    if (newDelete) {
      mutate()
    }
  },
)

watch(
  () => isUpdate.value,
  (confirm) => {
    if (confirm) {
      storePost.addIdPost(props.post._id)
      router.push({ path: '/upload' })
    }
  },
)

watch(
  () => data.value,
  (newData) => {
    if (newData) {
      router.push({ path: '/' })
    }
  },
)
</script>
