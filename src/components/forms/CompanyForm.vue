<template>
  <v-container>
    <v-row v-if="isExistingCompany">
      <v-col cols="12">
        <CompanyLogoUploadForm
          :file-name="itemEdited.logo"
          :company-id="itemEdited.id"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="8">
        <v-text-field
          v-model="itemEdited.name"
          autofocus
          :label="$t('name')"
        />
      </v-col>

      <v-col cols="4">
        <v-text-field
          v-model="itemEdited.shortName"
          :label="$t('name-short')"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col
        cols="12"
      >
        <!-- TODO: improve UX with validation and 'counter' prop -->
        <v-text-field
          v-model="itemEdited.iban"
          label="IBAN"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="6">
        <v-text-field
          v-model="itemEdited.fiscalCode"
          :label="$t('fiscal-code')"
        />
      </v-col>

      <v-col cols="6">
        <v-text-field
          v-model="itemEdited.vat"
          :label="$t('vat')"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col
        cols="12"
      >
        <v-autocomplete
          v-model="itemEdited.bankAffiliate"
          :loading="isBankAffiliatesLoading"
          :disabled="isBankAffiliatesLoading"
          :items="bankAffiliatesOptions"
          dense
          filled
          :label="$t('bank-affiliate')"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { API_PATH_BANK_AFFILIATES, getBankAffiliates } from '@/api/bankAffiliates'
import CompanyLogoUploadForm from './CompanyLogoUploadForm'

export default {
  name: 'CompanyForm',
  components: { CompanyLogoUploadForm },
  props: {
    value: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      isBankAffiliatesLoading: false,
      bankAffiliatesOptions: [],
      itemEdited: null
    }
  },

  computed: {
    isExistingCompany () {
      return !!this.itemEdited.id
    }
  },

  watch: {
    itemEdited: {
      handler (val) {
        this.$emit('input', val)
      },
      deep: true
    }
  },

  async created () {
    this.itemEdited = { ...this.value }

    try {
      this.isBankAffiliatesLoading = true
      const bankAffiliates = (await getBankAffiliates()).data
      this.bankAffiliatesOptions = bankAffiliates
        .map((bankAffiliate) => this.formatBankAffiliateSelectOption(bankAffiliate))

      if (this.isExistingCompany) {
        if (this.itemEdited.bankAffiliate) {
          this.itemEdited.bankAffiliate = this.formatBankAffiliateSelectOption(this.itemEdited.bankAffiliate).value
        } else {
          this.itemEdited.bankAffiliate = null
        }
      }
    } finally {
      this.isBankAffiliatesLoading = false
    }
  },

  methods: {
    formatBankAffiliateSelectOption (bankAffiliate) {
      return {
        text: bankAffiliate.affiliateNumber,
        value: `${API_PATH_BANK_AFFILIATES}/${bankAffiliate.id}`
      }
    }
  }
}
</script>

<style scoped>

</style>
