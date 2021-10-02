<template>
  <div>
    <Loader v-if="isLoading" />
    <table v-else>
      <tr>
        <th>ID</th>
        <th>Seller</th>
        <th>Buyer</th>
        <th>Created At</th>
      </tr>
      <tr
        v-for="item in items"
        :key="item.id"
      >
        <td>{{ item.id }}</td>
        <td>{{ item.seller.name }}</td>
        <td>{{ item.buyer.name }}</td>
        <td>{{ item.created_at }}</td>
      </tr>
    </table>
  </div>
</template>

<script>

import Loader from '@/components/Loader'
import { getInvoices } from '@/api/invoices'

export default {
  name: 'Invoices',
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
      this.items = (await getInvoices()).data
    } finally {
      this.isLoading = false
    }
  }
}
</script>
