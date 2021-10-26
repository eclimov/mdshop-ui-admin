<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
      >
        <v-text-field
          v-model="itemEdited.name"
          autofocus
          label="Name"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'BankForm',

  props: {
    value: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      itemEdited: null
    }
  },

  watch: {
    itemEdited: {
      handler (val) {
        this.$emit('input', val)
      },
      deep: true
    }
  },

  created () {
    this.itemEdited = { ...this.value }
  }
}
</script>

<style scoped>

</style>
