<template>
  <div>
    <v-card v-if="invoice">
      <v-card-title>
        <h1>{{ $t('invoice') }} #{{ invoice.id }}</h1>
      </v-card-title>

      <v-card-subtitle>{{ $t('created-at') }}: {{ $options.datetimeFormat(invoice.created_at) }}</v-card-subtitle>
      <v-card-text>
        <b>{{ $t('seller') }}:</b>
        <router-link :to="{ name: 'company', params: { id: invoice.seller.id } }">
          {{ invoice.seller.name }}
        </router-link>
        <br>
        <b>{{ $t('buyer') }}:</b>
        <router-link :to="{ name: 'company', params: { id: invoice.buyer.id } }">
          {{ invoice.buyer.name }}
        </router-link>
        <br>
        <b>{{ $t('processed-by-employee') }}:</b> {{ invoice.processedByEmployee.name }}
      </v-card-text>

      <v-card-actions>
        <v-icon
          color="secondary"
          large
          :title="$t('download')"
          @click="download"
        >
          mdi-download
        </v-icon>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { findInvoice } from '@/api/invoices'
import { downloadInvoiceDocument } from '@/utils/files'
import { datetimeFormat } from '@/utils/string'

export default {
  name: 'Invoice',
  datetimeFormat,
  props: {
    id: {
      type: [Number, String],
      required: true
    }
  },

  data () {
    return {
      invoice: null
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
        this.invoice = (await findInvoice(this.id)).data
      } finally {
        this.hideLoadingOverlay()
      }
    },

    async download () {
      try {
        this.showLoadingOverlay()
        await downloadInvoiceDocument(this.id)
      } finally {
        this.hideLoadingOverlay()
      }
    }
  }
}
</script>

<style scoped>

</style>
