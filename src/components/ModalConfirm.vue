<template>
  <v-dialog
    v-model="status"
    max-width="500px"
  >
    <v-card>
      <v-card-title class="text-h5">
        <slot name="title">
          {{ $t('modal-confirm.delete-question') }}
        </slot>
      </v-card-title>
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="blue darken-1"
          text
          @click="cancel"
        >
          {{ $t('cancel') }}
        </v-btn>
        <v-btn
          color="blue darken-1"
          text
          @click="confirm"
        >
          OK
        </v-btn>
        <v-spacer />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>

export default {
  name: 'ModalConfirm',

  data () {
    return {
      status: true
    }
  },

  watch: {
    status (value) {
      if (!value) {
        this.cancel()
      }
    }
  },

  methods: {
    cancel () {
      this.$emit('cancel')
    },

    confirm () {
      this.$emit('confirm')
    }
  }
}
</script>

<style scoped>

</style>
