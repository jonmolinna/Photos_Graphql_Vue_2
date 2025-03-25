import type { POST } from '@/interface/post.interface'
import { defineStore } from 'pinia'

export const usePostStore = defineStore('post', {
  state: () => ({ posts: [] as POST[], id: '' as string }),

  actions: {
    addPosts(posts: POST[]) {
      this.posts = posts
    },
    addIdPost(id: string) {
      this.id = id
    },
    deleteIdPost() {
      this.id = ''
    },
  },
})
