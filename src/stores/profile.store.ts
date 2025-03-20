import type { USER } from '@/interface/user.interface'
import { defineStore } from 'pinia'

export const useProfileStore = defineStore('profile', {
  state: () => {
    return {
      profile: null as USER | null,
    }
  },

  actions: {
    addProfile(profile: USER) {
      this.profile = profile
    },
  },
})
