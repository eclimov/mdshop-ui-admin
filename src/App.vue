<template>
  <v-app>
    <Header />

    <v-main>
      <v-overlay :value="isLoadingOverlayShown">
        <v-progress-circular
          indeterminate
          size="64"
        />
      </v-overlay>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>

import Header from '@/components/Header'
import { mapGetters } from 'vuex'
export default {
  name: 'App',
  components: { Header },
  computed: {
    ...mapGetters({
      isLoadingOverlayShown: 'general/isLoadingOverlayShown'
    })
  }
}
</script>
