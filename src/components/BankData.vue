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
            :title="$t('edit-item')"
            v-on="on"
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="text-h5">{{ $t('edit-item') }}</span>
          </v-card-title>

          <v-card-text>
            <BankForm
              :key="editedItem.id"
              v-model="editedItem"
            />
          </v-card-text>

          <v-card-actions>
            <v-spacer />
            <v-btn
              color="blue darken-1"
              text
              @click="closeDialog"
            >
              {{ $t('cancel') }}
            </v-btn>
            <v-btn
              color="blue darken-1"
              text
              @click="save"
            >
              {{ $t('save') }}
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
        :title="$t('delete-item')"
        @click="isModalDeleteActive = true"
      >
        <v-icon>mdi-delete</v-icon>
      </v-btn>
      <h1>{{ bank.name }}</h1>
    </v-card-title>

    <v-card-subtitle>{{ $t('created-at') }}: {{ $options.datetimeFormat(bank.created_at) }}</v-card-subtitle>
  </v-card>
</template>

<script>

import { mapActions } from 'vuex'
import { deleteBank, updateBank } from '@/api/banks'
import { datetimeFormat } from '@/utils/string'
import ModalConfirm from '@/components/ModalConfirm'
import BankForm from '@/components/forms/BankForm'

export default {
  name: 'BankData',
  components: { BankForm, ModalConfirm },
  datetimeFormat,
  props: {
    bank: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      isLoading: false,
      editedItem: null,
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
      this.editedItem = { ...this.bank }
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
      const editedItem = this.editedItem // Prevent the value from resetting
      this.closeDialog()
      this.showLoadingOverlay()
      try {
        await updateBank(this.bank.id, editedItem)
        this.editedItem = editedItem // Assign the value to form after successful update
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
