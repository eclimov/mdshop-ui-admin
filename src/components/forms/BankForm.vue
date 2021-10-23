<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
      >
        <v-text-field
          v-model="bankEdited.name"
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
      bankEdited: null
    }
  },

  watch: {
    bankEdited: {
      handler (val) {
        this.$emit('input', val)
      },
      deep: true
    }
  },

  created () {
    this.bankEdited = { ...this.value }
  }
}
</script>

<style scoped>

</style>
