<template>
  <v-card>
    <v-card-title>
      <v-dialog
        v-model="dialog"
        max-width="500px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="primary"
            dark
            large
            icon
            v-bind="attrs"
            class="mr-2"
            title="Edit Item"
            v-on="on"
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="text-h5">Edit Item</span>
          </v-card-title>

          <v-card-text>
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
          </v-card-text>

          <v-card-actions>
            <v-spacer />
            <v-btn
              color="blue darken-1"
              text
              @click="closeDialog"
            >
              Cancel
            </v-btn>
            <v-btn
              color="blue darken-1"
              text
              @click="save"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <ModalConfirm
        v-if="isModalDeleteActive"
        @cancel="isModalDeleteActive = false"
        @confirm="deleteItem"
      />
      <v-btn
        color="error"
        dark
        large
        icon
        class="mr-2"
        title="Delete Item"
        @click="isModalDeleteActive = true"
      >
        <v-icon>mdi-delete</v-icon>
      </v-btn>
      <span>{{ bank.name }}</span>
    </v-card-title>

    <v-card-subtitle>Created At: {{ $options.dateFormat(bank.created_at) }}</v-card-subtitle>
  </v-card>
</template>

<script>

import { mapActions } from 'vuex'
import { deleteBank, updateBank } from '@/api/banks'
import { dateFormat } from '@/utils/string'
import ModalConfirm from '@/components/ModalConfirm'

export default {
  name: 'BankData',
  components: { ModalConfirm },
  dateFormat,
  props: {
    bank: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      isLoading: false,
      bankEdited: null,
      isModalDeleteActive: false,
      dialog: false
    }
  },

  created () {
    this.resetForm()
  },

  methods: {
    ...mapActions({
      showLoadingOverlay: 'general/showLoadingOverlay',
      hideLoadingOverlay: 'general/hideLoadingOverlay'
    }),
    closeDialog () {
      this.dialog = false
      this.resetForm()
    },
    resetForm () {
      this.bankEdited = { ...this.bank }
    },
    async deleteItem () {
      this.isModalDeleteActive = false
      this.showLoadingOverlay()
      try {
        await deleteBank(this.bank.id)
        await this.$router.push({ name: 'banks' })
      } finally {
        this.hideLoadingOverlay()
      }
    },
    async save () {
      this.closeDialog()
      this.showLoadingOverlay()
      try {
        await updateBank(this.bank.id, this.bankEdited)
      } finally {
        this.hideLoadingOverlay()
        this.$emit('updated')
      }
    }
  }
}
</script>

<style scoped>

</style>
