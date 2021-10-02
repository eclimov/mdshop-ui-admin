<template>
  <div class="ctnr">
    <Header />

    <div class="content">
      <router-view />
    </div>

    <Footer />
  </div>
</template>

<script>

import Header from '@/components/Header'
import Footer from '@/components/Footer'
export default {
  name: 'App',
  components: {
    Footer,
    Header

  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.ctnr {
  height: 100vh;

  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: 50px auto 50px;
}

a {
  text-decoration: none;
  font-weight: bold;
}

a, a:visited, a:hover, a:active {
  color: inherit;
}

.router-link-active {
  color: #c38d9e !important;
}

.content {
  grid-column: 1 / -1;
  display: grid;
  margin: 10px 100px 10px 100px;
  grid-gap: 5px;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: min-content auto;
}

.content > div {
  grid-column: 1 / -1;
}

.text-centered {
  display:flex;
  align-items: center; /* Vertical center alignment */
  justify-content: center; /* Horizontal center alignment */
}

table {
  border-collapse: collapse;
  width: 100%;

  th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: #41b4a4;
    color: white;
  }

  tr:nth-child(even){background-color: #f2f2f2;}
  tr:hover {background-color: #ddd;}

  td, th {
    border: 1px solid #ddd;
    padding: 8px;
  }
}
</style>
