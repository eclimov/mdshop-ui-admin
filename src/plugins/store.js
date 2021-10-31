import Vuex from 'vuex'
import Vue from 'vue'
import createPersistedState from 'vuex-persistedstate'
import * as modules from '@/store'

const persistedState = createPersistedState({
  key: 'store',
  paths: ['user']
})

Vue.use(Vuex)
export default new Vuex.Store({
  strict: false,
  modules,
  plugins: [persistedState]
})
