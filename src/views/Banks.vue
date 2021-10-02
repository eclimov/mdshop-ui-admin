<template>
  <div>
    <Loader v-if="isLoading" />
    <table v-else>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Created At</th>
      </tr>
      <tr
        v-for="item in items"
        :key="item.id"
      >
        <td>{{ item.id }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.created_at }}</td>
      </tr>
    </table>
  </div>
</template>

<script>

import { getBanks } from '@/api/banks'
import Loader from '@/components/Loader'

export default {
  name: 'Banks',
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
      this.items = (await getBanks()).data
    } finally {
      this.isLoading = false
    }
  }
}
</script>
