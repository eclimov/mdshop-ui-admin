import { createApp } from 'vue'
import { createPinia } from 'pinia'

// Persisted state custom plugin
import piniaPluginPersistedState from "pinia-plugin-persistedstate"

import App from './App.vue'
import router from './router'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

// I18n
import { createI18n } from 'vue-i18n'
import en from '@/locales/en.json'
import ru from '@/locales/ru.json'

import '@/assets/css/main.css'

const vuetify = createVuetify({
  components,
  directives,
  locale: {
    locale: import.meta.env.VITE_I18N_LOCALE || 'en',
    messages: { en, ru },
  },
  date: {
    locale: {
      en: 'en-GB',
      ru: 'ru-MD',
    },
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
  // ssr: true, // For SSR application
})

// print environment variable: console.log(import.meta.env.MODE)
const i18n = createI18n({
  locale: import.meta.env.VITE_I18N_LOCALE || 'en',
  fallbackLocale: 'en',
  legacy: false,
  messages: {
    en,
    ru
  }
})

const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPluginPersistedState)
app.use(pinia)

app.use(router)
app.use(vuetify)
app.use(i18n)

app.mount('#app')
