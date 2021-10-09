export default {
  namespaced: true,
  state: {
    isLoadingOverlayShown: false
  },
  actions: {
    showLoadingOverlay ({ commit }) {
      commit('SET_LOADING_OVERLAY_STATUS', true)
    },
    hideLoadingOverlay ({ commit }) {
      commit('SET_LOADING_OVERLAY_STATUS', false)
    }
  },
  mutations: {
    SET_LOADING_OVERLAY_STATUS: (state, status) => {
      state.isLoadingOverlayShown = status
    }
  },
  getters: {
    isLoadingOverlayShown: (state) => state.isLoadingOverlayShown
  }
}
