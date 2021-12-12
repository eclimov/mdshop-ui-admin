<template>
  <v-card>
    <ModalConfirm
      v-if="isModalDeleteActive"
      @cancel="resetEditedId"
      @confirm="deleteItemConfirm(editedId)"
    />

    <v-card-title>
      <v-dialog
        v-model="dialog"
        max-width="500px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="success"
            dark
            large
            v-bind="attrs"
            class="mr-2"
            :title="$t('new-item')"
            v-on="on"
          >
            <span class="material-icons">
              add_box
            </span>
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="text-h5">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <CompanyForm
              :key="editedItem.id"
              v-model="editedItem"
            />
          </v-card-text>

          <v-card-actions>
            <v-spacer />
            <v-btn
              color="blue darken-1"
              text
              @click="close"
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

      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        :label="$t('search')"
        single-line
        hide-details
      />
    </v-card-title>

    <v-data-table
      dense
      :items-per-page="items.length"
      :headers="headers"
      :items="items"
      class="elevation-1"
      :loading="isLoading"
      :loading-text="$t('loading-text')"
      :search="search"
      hide-default-footer
    >
      <template v-slot:item.name="{ item }">
        <router-link :to="{ name: 'company', params: { id: item.id } }">
          {{ item.name }}
        </router-link>
      </template>

      <template v-slot:item.created_at="{ item }">
        {{ $options.datetimeFormat(item.created_at) }}
      </template>

      <template v-slot:item.actions="{ item }">
        <v-icon
          small
          class="mr-2"
          color="warning"
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          small
          color="error"
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>

import { createCompany, deleteCompany, getCompanies, updateCompany } from '@/api/companies'
import { datetimeFormat } from '@/utils/string'
import ModalConfirm from '@/components/ModalConfirm'
import CompanyForm from '@/components/forms/CompanyForm'
import { getCompanyObject } from '@/utils/forms'

export default {
  name: 'Companies',
  datetimeFormat,
  components: { CompanyForm, ModalConfirm },

  data () {
    return {
      isLoading: false,
      isModalDeleteActive: false,
      dialog: false,
      editedId: 0,
      search: '',
      headers: [
        {
          text: 'ID',
          align: 'start',
          value: 'id'
        },
        { text: this.$t('name'), value: 'name' },
        { text: this.$t('name-short'), value: 'shortName' },
        { text: 'IBAN', value: 'iban' },
        { text: this.$t('fiscal-code'), value: 'fiscalCode' },
        { text: 'VAT', value: 'vat' },
        { text: this.$t('created-at'), sortable: false, value: 'created_at' },
        { text: this.$t('actions'), value: 'actions', sortable: false }
      ],
      items: [],
      editedItem: getCompanyObject()
    }
  },

  computed: {
    formTitle () {
      return this.editedId ? this.$t('edit-item') : this.$t('new-item')
    }
  },

  watch: {
    dialog (val) {
      val || this.close()
    }
  },

  async created () {
    await this.fetch()
  },

  methods: {
    async fetch () {
      this.isLoading = true
      try {
        this.items = (await getCompanies()).data
      } finally {
        this.isLoading = false
      }
    },

    async save () {
      const editedId = this.editedId
      const editedItem = this.editedItem

      this.close()

      try {
        this.isLoading = true
        if (editedId) {
          await updateCompany(editedId, editedItem)
        } else {
          await createCompany(editedItem)
        }
      } finally {
        await this.fetch()
        this.isLoading = false
      }
    },

    editItem (item) {
      this.editedId = item.id
      this.editedItem = { ...item }
      this.dialog = true
    },

    deleteItem (item) {
      this.editedId = item.id
      this.isModalDeleteActive = true
    },

    async deleteItemConfirm (id) {
      this.resetEditedId()
      this.isLoading = true
      try {
        await deleteCompany(id)
      } finally {
        await this.fetch()
        this.isLoading = false
      }
    },

    close () {
      this.dialog = false
      this.editedItem = getCompanyObject()
      this.resetEditedId()
    },

    resetEditedId () {
      this.editedId = 0
      this.isModalDeleteActive = false
    }
  }
}
</script>
