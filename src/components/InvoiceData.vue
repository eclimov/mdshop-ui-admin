<script setup lang="ts">
import { dateFormat, datetimeFormat } from '@/utils/string'
import { ref } from 'vue'
import { useLoader } from '@/stores/loader'
import ModalConfirm from '@/components/ModalConfirm.vue'
import type { InvoiceTypeView } from '@/types/invoice'
import { deleteInvoice } from '@/api/invoices'
import { downloadInvoiceDocument } from '@/utils/files'

defineProps<{
  invoice: InvoiceTypeView;
}>()

const emit = defineEmits(['deleted'])
const loaderStore = useLoader()

const isModalDeleteActive = ref(false)

function closeDialogDelete () {
  isModalDeleteActive.value = false
}

async function deleteItemConfirm (id: number) {
  closeDialogDelete()
  loaderStore.isActive = true
  try {
    await deleteInvoice(id)
    emit('deleted')
  } finally {
    loaderStore.isActive = false
  }
}

async function download (id: number) {
  try {
    loaderStore.isActive = true
    await downloadInvoiceDocument(id)
  } finally {
    loaderStore.isActive = false
  }
}
</script>

<template>
  <ModalConfirm
    v-if="isModalDeleteActive"
    :object-value="`${invoice.buyer.name} ${datetimeFormat(invoice.created_at)}`"
    @cancel="closeDialogDelete"
    @confirm="deleteItemConfirm(invoice.id)"
  />

  <v-card class="pb-4">
    <v-card-title class="d-flex align-center pb-0">
      <v-btn
        class="mr-2"
        color="error"
        icon="mdi-delete"
        size="large"
        variant="text"
        @click="isModalDeleteActive = true"
      />

      <h1>{{ $t('invoice') }} #{{ invoice.id }}</h1>
    </v-card-title>

    <v-card-subtitle>{{ $t('created-at') }}: {{ datetimeFormat(invoice.created_at) }}</v-card-subtitle>

    <v-card-text>
      <b>{{ $t('seller') }}:</b>
      &nbsp;
      <router-link :to="{ name: 'company', params: { id: invoice.seller.id } }">
        {{ invoice.seller.name }}
      </router-link>
      <br />

      <b>{{ $t('buyer') }}:</b>
      &nbsp;
      <router-link :to="{ name: 'company', params: { id: invoice.buyer.id } }">
        {{ invoice.buyer.name }}
      </router-link>
      <br />

      <b>{{ $t('order-date') }}:</b>
      &nbsp;
      <span>{{ dateFormat(invoice.orderDate) }}</span>
      <br />

      <b>{{ $t('delivery-date') }}:</b>
      &nbsp;
      <span>{{ dateFormat(invoice.deliveryDate) }}</span>
      <br />

      <b>{{ $t('carrier') }}:</b>
      &nbsp;
      <router-link :to="{ name: 'company', params: { id: invoice.carrier.id } }">
        {{ invoice.carrier.name }}
      </router-link>
      <br />

      <b>{{ $t('attached-document') }}:</b>
      &nbsp;
      <span>{{ invoice.attachedDocument }}</span>
      <br />

      <b>{{ $t('loading-point') }}:</b>
      &nbsp;
      <span>{{ invoice.loadingPoint.address }}</span>
      <br />

      <b>{{ $t('unloading-point') }}:</b>
      &nbsp;
      <span>{{ invoice.unloadingPoint.address }}</span>
      <br />

      <b>{{ $t('approved-by-employee') }}:</b>
      &nbsp;
      <span>{{ invoice.approvedByEmployee.name }}</span>
      <br />

      <b>{{ $t('processed-by-employee') }}:</b>
      &nbsp;
      <span>{{ invoice.processedByEmployee.name }}</span>
      <br />

      <b>{{ $t('recipient-name') }}:</b>
      &nbsp;
      <span>{{ invoice.recipientName }}</span>
      <br />
    </v-card-text>

    <v-card-actions>
      <v-btn
        class="mr-2"
        color="blue-grey-darken-4"
        prepend-icon="mdi-download"
        rounded="md"
        size="large"
        variant="elevated"
        @click="download(invoice.id)"
      >
        {{ $t('download') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
