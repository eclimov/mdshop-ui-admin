<template>
  <div>
    <CompanyData
      v-if="company"
      :company="company"
      @updated="fetch"
    />
    <hr>
    <CompanyAddresses
      v-if="company"
      :company="company"
    />
    <hr>
    <CompanyEmployees
      v-if="company"
      :company="company"
    />
  </div>
</template>

<script>
import CompanyData from '@/components/CompanyData'
import { mapActions } from 'vuex'
import { findCompany } from '@/api/companies'
import CompanyAddresses from '@/components/CompanyAddresses'
import CompanyEmployees from '@/components/CompanyEmployees'

export default {
  name: 'Company',
  components: { CompanyEmployees, CompanyAddresses, CompanyData },
  props: {
    id: {
      type: [Number, String],
      required: true
    }
  },

  data () {
    return {
      company: null
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
        this.company = (await findCompany(this.id)).data
      } finally {
        this.hideLoadingOverlay()
      }
    }
  }
}
</script>

<style scoped>

</style>
