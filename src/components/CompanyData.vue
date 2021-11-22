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
            <CompanyForm
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
      <h1>{{ company.name }}</h1>
    </v-card-title>

    <v-card-subtitle>Created At: {{ $options.datetimeFormat(company.created_at) }}</v-card-subtitle>
    <v-card-text>
      <b>Short Name:</b> {{ company.shortName }}
      <br>
      <b>Affiliate Number:</b> <span v-if="company.bankAffiliate">{{ company.bankAffiliate.affiliateNumber }}</span>
      <br>
      <b>Fiscal Code:</b> {{ company.fiscalCode }}
      <br>
      <b>IBAN:</b> {{ company.iban }}
      <br>
      <b>Vat:</b> {{ company.vat }}
    </v-card-text>

    <v-card-actions>
      <v-btn
        color="secondary"
        dark
        large
        class="mr-2"
        title="Create Invoice"
        :to="{ name: 'create-invoice', params: { buyerCompanyId: company.id }}"
      >
        <span class="material-icons">
          note_add
        </span>
        &nbsp;
        Create Invoice
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>

import { mapActions } from 'vuex'
import { datetimeFormat } from '@/utils/string'
import ModalConfirm from '@/components/ModalConfirm'
import { deleteCompany, updateCompany } from '@/api/companies'
import CompanyForm from '@/components/forms/CompanyForm'

export default {
  name: 'CompanyData',
  components: { CompanyForm, ModalConfirm },
  datetimeFormat,
  props: {
    company: {
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
      this.editedItem = { ...this.company }
    },
    async deleteItem () {
      this.isModalDeleteActive = false
      this.showLoadingOverlay()
      try {
        await deleteCompany(this.company.id)
        await this.$router.push({ name: 'companies' })
      } finally {
        this.hideLoadingOverlay()
      }
    },
    async save () {
      const editedItem = this.editedItem // Prevent the value from resetting
      this.closeDialog()
      this.showLoadingOverlay()
      try {
        await updateCompany(this.company.id, editedItem)
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
