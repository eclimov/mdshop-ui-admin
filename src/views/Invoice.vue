<script setup lang="ts">
import { ref } from 'vue'
import { getEmptyInvoiceView } from '@/utils/forms'
import { useLoader } from '@/stores/loader'
import { findInvoice } from '@/api/invoices'
import InvoiceData from '@/components/InvoiceData.vue'

const props = defineProps<{
  id: string;
}>()

const loaderStore = useLoader()
const invoice = ref(getEmptyInvoiceView())

async function fetch () {
  loaderStore.isActive = true
  try {
    invoice.value = (await findInvoice(props.id)).data
  } finally {
    loaderStore.isActive = false
  }
}

fetch()
</script>

<template>
  <div>
    <InvoiceData
      v-if="invoice.id"
      :invoice="invoice"
      @deleted="$router.push({ name: 'invoices' })"
    />
  </div>
</template>
