<template>
  <div>
    <BankData
      v-if="bank"
      :bank="bank"
      @updated="fetch"
    />
    <hr>
    <BankAffiliates
      v-if="bank"
      :bank="bank"
    />
  </div>
</template>

<script>

import { findBank } from '@/api/banks'
import { mapActions } from 'vuex'
import BankData from '@/components/BankData'
import BankAffiliates from '@/components/BankAffiliates'

export default {
  name: 'Bank',
  components: { BankAffiliates, BankData },
  props: {
    id: {
      type: [Number, String],
      required: true
    }
  },

  data () {
    return {
      bank: null
    }
  },

  created () {
    this.fetch()
  },

  methods: {
    ...mapActions({
      showLoadingOverlay: 'general/showLoadingOverlay',
      hideLoadingOverlay: 'general/hideLoadingOverlay'
    }),

    async fetch () {
      this.showLoadingOverlay()
      try {
        this.bank = (await findBank(this.id)).data
      } finally {
        this.hideLoadingOverlay()
      }
    }
  }
}
</script>

<style scoped>

</style>
