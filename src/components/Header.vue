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

    <v-spacer />

    <v-btn
      icon
      title="Login"
      :to="{ name: 'login' }"
    >
      <v-icon>mdi-login</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style scoped>

</style>
