<template>
  <v-card>
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      />
    </v-card-title>

    <v-data-table
      :headers="headers"
      :items="items"
      class="elevation-1"
      :loading="isLoading"
      loading-text="Loading... Please wait"
      :search="search"
      hide-default-footer
    >
      <template v-slot:item.created_at="{ item }">
        {{ $options.dateFormat(item.created_at) }}
      </template>
    </v-data-table>
  </v-card>
</template>

<script>

import { getInvoices } from '@/api/invoices'
import { dateFormat } from '@/utils/string'

export default {
  name: 'Invoices',
  dateFormat,
  components: {},

  data () {
    return {
      isLoading: false,
      search: '',
      headers: [
        {
          text: 'ID',
          align: 'start',
          value: 'id'
        },
        { text: 'Seller', value: 'seller.name' },
        { text: 'Buyer', value: 'buyer.name' },
        { text: 'Created At', sortable: false, value: 'created_at' }
      ],
      items: []
    }
  },

  async created () {
    this.isLoading = true
    try {
      this.items = (await getInvoices()).data
    } finally {
      this.isLoading = false
    }
  }
}
</script>
