import { defineStore } from 'pinia'
import { login, refreshAccessToken } from '@/api/auth'
import type { AuthTypeCreate } from '@/types/auth'

interface StateType {
  id: number|null,
  companyId: number|null,
  companyName: string|null,
  email: string|null,
  accessToken: string|null,
  refreshToken: string|null,
}

export const useUser = defineStore('user', {
  state: (): StateType => ({
    id: null,
    companyId: null,
    companyName: null,
    email: null,
    accessToken: null,
    refreshToken: null
  }),
  getters: {
  },
  actions: {
    async login (data: AuthTypeCreate) {
      const response = (await login(data)).data
      this.id = response.user_id
      this.companyId = response.company_id
      this.companyName = response.company_name
      this.email = data.email
      this.accessToken = response.token
      this.refreshToken = response.refresh_token
    },
    async refreshAccessToken () {
      const response = (await refreshAccessToken({ refresh_token: this.refreshToken })).data
      this.accessToken = response.token
    },
    reset () {
      this.$reset()
    }
  },
  persist: true
})
