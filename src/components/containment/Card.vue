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
</template>

<script lang="ts" setup>
// IMPORTACIONES DE BIBLIOTECAS EXTERNAS
import { computed, onMounted, ref, watch, type Ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

// IMPORTACIONES DE ARCHIVOS INTERNOS
import Avatar from '../images/Avatar.vue'
import ButtonLikePost from './ButtonLikePost.vue'
import ButtonComment from './ButtonComment.vue'
import ButtonMenuhorizontal from './ButtonMenuhorizontal.vue'
import DialogMenu from './DialogMenu.vue'
import DialogConfirm from './DialogConfirm.vue'
import type { POST } from '@/interface/post.interface'
import { capitalizeLetter } from '@/setting/letter.setting'
import { MENU_ITEMS_CARD, type I_MENU_ITEMS } from '@/setting/post-card.data'
import { useProfileStore } from '@/stores/profile.store'
import { useCardDialog } from '@/hooks/containment/useCardDialog'
import { usePostMutation } from '@/hooks/post-graphql/usePostMutation'
import { usePostStore } from '@/stores/post.store'

// ESTADO Y VARIABLES REACTIVOS
const postId: Ref<string> = ref('')
const menu_item: Ref<I_MENU_ITEMS[]> = ref(MENU_ITEMS_CARD)
const storeProfile = useProfileStore()
const storePost = usePostStore()
const router = useRouter()

const { profile } = storeToRefs(storeProfile)
const { handleClickItems, openMenu, openConfirm, handleClickConfirm, isDelete } = useCardDialog()
const { data, mutate } = usePostMutation(postId)

const props = defineProps({
  post: {
    required: true,
    type: Object as () => POST,
  },
})

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
  () => data.value,
  (newData) => {
    const data = newData as POST
    console.log('-----> data ', data)
    storePost.deletePost(data)
  },
)

// CICLO DE VIDA
onMounted(() => {
  postId.value = props.post._id
})
</script>
