<template>
  <v-app-bar
    app
    color="secondary"
    dark
  >
    <div class="d-flex align-center">
      <router-link :to="{ name: 'home' }">
        <v-img
          alt="Logo"
          class="shrink mr-2"
          contain
          src="@/assets/logo.png"
          transition="scale-transition"
          width="40"
        />
      </router-link>
    </div>

    <div v-if="isAuthenticated">
      <v-btn
        text
        :to="{ name: 'invoices' }"
      >
        Invoices
      </v-btn>

      <v-btn
        text
        :to="{ name: 'companies' }"
      >
        Companies
      </v-btn>

      <v-btn
        text
        :to="{ name: 'banks' }"
      >
        Banks
      </v-btn>

      <!--No need to display the following link to users-->
      <!--
      <v-btn
        text
        :to="{ name: 'users' }"
      >
        Users
      </v-btn>
      -->
    </div>

    <v-spacer />

    <template v-if="isAuthenticated">
      <div class="d-flex flex-column">
        <router-link :to="{ name: 'user', params: { id: userId } }">
          {{ userEmail }}
        </router-link>
        <span class="text-caption">{{ userCompanyName }}</span>
      </div>
      <v-btn
        class="ml-2"
        icon
        title="Logout"
        color="warning"
        @click="logout"
      >
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </template>
    <v-btn
      v-else
      icon
      title="Login"
      :to="{ name: 'login' }"
    >
      <v-icon>mdi-login</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Header',

  computed: {
    ...mapGetters({
      userId: 'user/id',
      userCompanyName: 'user/companyName',
      userEmail: 'user/email'
    }),

    isAuthenticated () {
      return !!this.userEmail
    }
  },

  methods: {
    ...mapActions({
      userLogout: 'user/logout'
    }),

    async logout () {
      await this.userLogout()
      await this.$router.push({ name: 'home' })
    }
  }
}
</script>

<style scoped>

</style>
