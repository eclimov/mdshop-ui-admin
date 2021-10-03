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
      dense
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

import { getCompanies } from '@/api/companies'
import { dateFormat } from '@/utils/string'

export default {
  name: 'Companies',
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
        { text: 'Name', value: 'name' },
        { text: 'Short Name', value: 'shortName' },
        { text: 'IBAN', value: 'iban' },
        { text: 'Fiscal Code', value: 'fiscalCode' },
        { text: 'VAT', value: 'vat' },
        { text: 'Created At', sortable: false, value: 'created_at' }
      ],
      items: []
    }
  },

  async created () {
    this.isLoading = true
    try {
      this.items = (await getCompanies()).data
    } finally {
      this.isLoading = false
    }
  }
}
</script>
