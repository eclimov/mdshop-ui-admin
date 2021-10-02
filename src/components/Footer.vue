<template>
  <div id="footer">
    <div class="text-centered">
      {{ currentYear }} <a href="mailto:klimovedik88@gmail.com"> Eduard Climov</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer',

  computed: {
    currentYear () {
      return (new Date()).getFullYear()
    }
  }
}
</script>

<style scoped>
#footer {
  grid-column: 1 / -1;

  background-color: #343a40;
  color: white;
  display: flex;
  justify-content: center;
}
</style>
