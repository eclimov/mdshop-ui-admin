import Vue from 'vue'
import VueRouter from 'vue-router'
import router from '@/router'
import App from '@/App'
import vuetify from '@/plugins/vuetify'
import store from '@/plugins/store'

Vue.config.productionTip = false

Vue.use(VueRouter)

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
