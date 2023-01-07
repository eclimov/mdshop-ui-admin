<template>
  <v-combobox
    v-model="recipientName"
    :loading="isLoading"
    :disabled="isLoading"
    :items="availableCompanyEmployees"
    :label="$t('recipient-name')"
    :hint="$t('hints.invoice-create-recipient-input')"
  />
</template>

<script>
import { getCompanyEmployeesByCompanyId } from '@/api/companies'

export default {
  name: 'InvoiceRecipientInput',

  props: {
    companyId: {
      type: [Number, String],
      required: true
    }
  },

  data () {
    return {
      isLoading: false,
      recipientName: '',
      availableCompanyEmployees: []
    }
  },

  watch: {
    recipientName (val) {
      this.$emit('input', val)
    }
  },

  async created () {
    try {
      this.isLoading = true

      const companyEmployees = (await getCompanyEmployeesByCompanyId(this.companyId)).data
      this.availableCompanyEmployees = companyEmployees.map((companyEmployee) => {
        return companyEmployee.name
      })
    } finally {
      this.isLoading = false
    }
  }
}
</script>

<style scoped>

</style>
