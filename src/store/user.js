import { login, refreshAccessToken } from '@/api/auth'

const defaultState = {
  id: null,
  email: null,
  accessToken: null,
  refreshToken: null
}

export default {
  namespaced: true,
  state: { ...defaultState },
  getters: {
    id: (state) => state.id,
    email: (state) => state.email,
    accessToken: (state) => state.accessToken,
    refreshToken: (state) => state.refreshToken
  },
  actions: {
    async login ({ commit }, data) {
      const response = (await login(data)).data
      commit('SET_EMAIL', data.email)
      commit('SET_ID', response.user_id)
      commit('SET_ACCESS_TOKEN', response.token)
      commit('SET_REFRESH_TOKEN', response.refresh_token)
    },
    async refreshAccessToken ({ commit, state }) {
      const response = (await refreshAccessToken({ refresh_token: state.refreshToken })).data
      commit('SET_ACCESS_TOKEN', response.token)
    },
    logout ({ commit }) {
      commit('SET_DEFAULT_STATE')
    }
  },
  mutations: {
    SET_ID: (state, id) => {
      state.id = id
    },
    SET_EMAIL: (state, email) => {
      state.email = email
    },
    SET_ACCESS_TOKEN: (state, accessToken) => {
      state.accessToken = accessToken
    },
    SET_REFRESH_TOKEN: (state, refreshToken) => {
      state.refreshToken = refreshToken
    },
    SET_DEFAULT_STATE: (state) => {
      const keys = Object.keys(state)
      for (const key of keys) {
        state[key] = defaultState[key]
      }
    }
  }
}
