import Vuex from 'vuex'
import Vue from 'vue'
import * as modules from '@/store'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: false,
  modules
})
