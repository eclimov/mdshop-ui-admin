<template>
  <v-card>
    <ModalConfirm
      v-if="isModalDeleteActive"
      @cancel="resetEditedId"
      @confirm="deleteItemConfirm(editedId)"
    />

    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      />
    </v-card-title>

    <!-- TODO: expand row with details: https://vuetifyjs.com/en/components/data-tables/#expandable-rows-->
    <!--OR https://codepen.io/francobao/pen/mqxMKP-->
    <v-data-table
      dense
      :items-per-page="items.length"
      :headers="headers"
      :items="items"
      class="elevation-1"
      :loading="isLoading"
      loading-text="Loading... Please wait"
      :search="search"
      hide-default-footer
    >
      <template v-slot:item.id="{ item }">
        <router-link :to="{ name: 'invoice', params: { id: item.id } }">
          {{ item.id }}
        </router-link>
      </template>

      <template v-slot:item.buyer.name="{ item }">
        <router-link :to="{ name: 'company', params: { id: item.buyer.id } }">
          {{ item.buyer.name }}
        </router-link>
      </template>

      <template v-slot:item.created_at="{ item }">
        {{ $options.datetimeFormat(item.created_at) }}
      </template>

      <template v-slot:item.actions="{ item }">
        <v-icon
          color="secondary"
          title="Download"
          @click="download(item.id)"
        >
          mdi-download
        </v-icon>
        &nbsp;
        <v-icon
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

import { getInvoices, deleteInvoice } from '@/api/invoices'
import { datetimeFormat } from '@/utils/string'
import { mapActions } from 'vuex'
import { downloadInvoiceDocument } from '@/utils/files'
import ModalConfirm from '../components/ModalConfirm'

export default {
  name: 'Invoices',
  datetimeFormat,
  components: { ModalConfirm },

  data () {
    return {
      isLoading: false,
      isModalDeleteActive: false,
      editedId: 0,
      search: '',
      headers: [
        {
          text: 'ID',
          align: 'start',
          value: 'id'
        },
        { text: 'Buyer', value: 'buyer.name' },
        { text: 'Created At', sortable: false, value: 'created_at' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      items: []
    }
  },

  async created () {
    await this.fetch()
  },

  methods: {
    ...mapActions({
      showLoadingOverlay: 'general/showLoadingOverlay',
      hideLoadingOverlay: 'general/hideLoadingOverlay'
    }),

    async fetch () {
      this.isLoading = true
      try {
        this.items = (await getInvoices()).data
      } finally {
        this.isLoading = false
      }
    },

    async download (id) {
      try {
        this.showLoadingOverlay()
        await downloadInvoiceDocument(id)
      } finally {
        this.hideLoadingOverlay()
      }
    },

    resetEditedId () {
      this.editedId = 0
      this.isModalDeleteActive = false
    },

    deleteItem (item) {
      this.editedId = item.id
      this.isModalDeleteActive = true
    },

    async deleteItemConfirm (id) {
      this.resetEditedId()
      this.isLoading = true
      try {
        await deleteInvoice(id)
      } finally {
        await this.fetch()
        this.isLoading = false
      }
    }
  }
}
</script>
