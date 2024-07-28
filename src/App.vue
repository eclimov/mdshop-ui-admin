<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from '@/components/Header.vue'
import { useLoader } from '@/stores/loader'

const loaderStore = useLoader()
</script>

<template>
  <v-app>
    <Header />

    <v-main>
      <v-overlay
        :model-value="loaderStore.isActive"
        class="align-center justify-center"
        persistent
      >
        <v-progress-circular
          color="grey-lighten-5"
          bg-color="transparent"
          indeterminate
          size="64"
        />
      </v-overlay>
      <router-view />
    </v-main>
  </v-app>
</template>

