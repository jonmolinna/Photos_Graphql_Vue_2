<template>
  <v-dialog v-model="dialog" max-width="500">
    <v-card>
      <v-list class="bg-grey-darken-4 text-center" density="compact" nav>
        <v-list-item
          v-for="(item, i) in props.data"
          :key="i"
          @click="$emit('handleClick', item.name)"
        >
          <v-list-item-title>{{ item.name }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import type { I_MENU_ITEMS } from '@/setting/post-card.data'

const emit = defineEmits()

const props = defineProps({
  openModal: {
    type: Boolean,
    required: true,
    default: false,
  },
  data: {
    type: Array as () => I_MENU_ITEMS[],
    required: true,
  },
})

const dialog = computed({
  get() {
    return props.openModal
  },
  set(val: boolean) {
    emit('update', val)
  },
})
</script>
