<template>
  <div>
    <Loader v-if="isLoading" />
    <table v-else>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Short Name</th>
        <th>IBAN</th>
        <th>Fiscal Code</th>
        <th>VAT</th>
        <th>Created At</th>
      </tr>
      <tr
        v-for="item in items"
        :key="item.id"
      >
        <td>{{ item.id }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.shortName }}</td>
        <td>{{ item.iban }}</td>
        <td>{{ item.fiscalCode }}</td>
        <td>{{ item.vat }}</td>
        <td>{{ item.created_at }}</td>
      </tr>
    </table>
  </div>
</template>

<script>

import Loader from '@/components/Loader'
import { getCompanies } from '@/api/companies'

export default {
  name: 'Companies',
  components: {
    Loader
  },

  data () {
    return {
      isLoading: false,
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
