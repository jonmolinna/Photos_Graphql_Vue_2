import { defineStore } from 'pinia'

export const usePostStore = defineStore('post', {
  state: () => ({ id: '' as string }),

  actions: {
    addIdPost(id: string) {
      this.id = id
    },
    deleteIdPost() {
      this.id = ''
    },
  },
})
