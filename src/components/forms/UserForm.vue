<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
      >
        <v-text-field
          v-model="itemEdited.email"
          autofocus
          label="Email"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col
        cols="12"
      >
        <v-text-field
          v-model="itemEdited.password"
          label="Password (leave empty to not to change)"
          :append-icon="isPasswordValueShown ? 'mdi-eye-off' : 'mdi-eye'"
          :type="isPasswordValueShown ? 'text' : 'password'"
          counter
          @click:append="isPasswordValueShown = !isPasswordValueShown"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'UserForm',

  props: {
    value: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      isPasswordValueShown: false,
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
