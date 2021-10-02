<template>
  <div id="header">
    <div class="logo header-item text-centered">
      <router-link :to="{ name: 'home' }">
        Artprezent
      </router-link>
    </div>

    <div class="header-item text-centered">
      <router-link :to="{ name: 'invoices' }">
        Invoices
      </router-link>
    </div>

    <div class="header-item text-centered">
      <router-link :to="{ name: 'companies' }">
        Companies
      </router-link>
    </div>

    <div class="header-item text-centered">
      <router-link :to="{ name: 'banks' }">
        Banks
      </router-link>
    </div>

    <div class="header-item text-centered">
      <router-link :to="{ name: 'users' }">
        Users
      </router-link>
    </div>

    <div class="header-item text-centered">
      <router-link :to="{ name: 'login' }">
        Login
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style scoped>
.header-item {
  margin: 15px;
}

#header {
  grid-column: 1 / -1;
  background-color: #343a40;
  color: white;
  display: flex;
}

#header > div:last-child {
  margin-left: auto;
}

.logo {
  font-weight: bold;
  font-size: 19px;
  font-style: italic;
  color: #e17d60;
}
</style>
