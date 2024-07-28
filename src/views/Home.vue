<script setup lang="ts">
import imageLogo from '@/assets/logo.png'

function redirectToLocation () {
  window.open('https://goo.gl/maps/Ca6rMzR8Ko26bHBN8', '_blank')
}
</script>

<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          class="my-3"
          draggable="false"
          height="200"
          :src="imageLogo"
        />
      </v-col>

      <v-col class="mb-4">
        <div class="text-h3 font-weight-bold mb-3">
          Artprezent

          <v-btn
            icon="mdi-map-marker"
            :title="$t('location')"
            variant="text"
            @click="redirectToLocation"
          />
        </div>

        <p class="subheading font-weight-regular">
          {{ $t('for-all-questions-contact') }} <b>Eduard Climov</b>
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>
