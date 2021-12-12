<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('@/assets/logo.png')"
          class="my-3"
          contain
          height="200"
        />
      </v-col>

      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          Artprezent

          <v-btn
            icon
            :title="$t('location')"
            @click="redirectToLocation"
          >
            <v-icon>location_on</v-icon>
          </v-btn>
        </h1>

        <p class="subheading font-weight-regular">
          {{ $t('for-all-questions-contact') }} <b>Eduard Climov</b>
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  name: 'Home',

  components: {},

  methods: {
    redirectToLocation () {
      window.open('https://goo.gl/maps/Ca6rMzR8Ko26bHBN8', '_blank')
    }
  }
}
</script>
