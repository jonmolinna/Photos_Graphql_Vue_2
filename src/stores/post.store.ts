import type { POST } from '@/interface/post.interface'
import { defineStore } from 'pinia'

export const usePostStore = defineStore('post', {
  state: () => ({ posts: [] as POST[] }),

  actions: {
    addPosts(posts: POST[]) {
      this.posts = posts
    },
    deletePost(post: POST) {
      this.posts = this.posts.filter((item) => item._id !== post._id)
    },
  },
})
