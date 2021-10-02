<template>
  <div>
    {{ isLoading }}
    {{ banks }}
  </div>
</template>

<script>

import { getBanks } from '@/api/banks'

export default {
  name: 'Banks',
  components: {

  },

  data () {
    return {
      isLoading: false,
      banks: []
    }
  },

  async created () {
    this.isLoading = true
    this.banks = (await getBanks()).data
    this.isLoading = false
  }
}
</script>
