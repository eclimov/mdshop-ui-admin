import Vue from 'vue'
import VueRouter from 'vue-router'
import router from '@/router'
import App from '@/App'
import vuetify from '@/plugins/vuetify'
import store from '@/plugins/store'
import i18n from './i18n'

Vue.config.productionTip = false

Vue.use(VueRouter)

new Vue({
  router,
  vuetify,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
