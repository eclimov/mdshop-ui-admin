<script setup lang="ts">
import { datetimeFormat } from '@/utils/string'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import ModalConfirm from '@/components/ModalConfirm.vue'
import { getEmptyInvoiceView } from '@/utils/forms'
import { deleteInvoice, getInvoices } from '@/api/invoices'
import type { InvoiceTypeView } from '@/types/invoice'
import { downloadInvoiceDocument } from '@/utils/files'
import { useLoader } from '@/stores/loader'

const loaderStore = useLoader()
const { t } = useI18n()
const isLoading = ref(false)
const isModalDeleteActive = ref(false)
const editedItem = ref(getEmptyInvoiceView())
const search = ref('')
const headers = ref([
  {
    title: 'ID',
    align: 'start',
    value: 'id',
    sortable: true
  },
  { title: t('buyer'), value: 'buyer.name', sortable: true },
  { title: t('created-at'), value: 'created_at' },
  { title: t('actions'), value: 'actions' }
] as const)
const items = ref([])

async function fetch () {
  isLoading.value = true
  try {
    items.value = (await getInvoices()).data
  } finally {
    isLoading.value = false
  }
}

function deleteItem (item: InvoiceTypeView) {
  editedItem.value = { ...item }
  isModalDeleteActive.value = true
}

function resetEditedItem () {
  editedItem.value = getEmptyInvoiceView()
}

function closeDialogDelete () {
  isModalDeleteActive.value = false
  resetEditedItem()
}

async function deleteItemConfirm (id: number) {
  closeDialogDelete()
  isLoading.value = true
  try {
    await deleteInvoice(id)
  } finally {
    await fetch()
    isLoading.value = false
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

fetch()
</script>

<template>
  <ModalConfirm
    v-if="isModalDeleteActive"
    :object-value="`${editedItem.buyer.name} ${datetimeFormat(editedItem.created_at)}`"
    @cancel="closeDialogDelete"
    @confirm="deleteItemConfirm(editedItem.id)"
  />

  <v-container fluid>
    <v-row no-gutters>
      <v-col
        class="d-flex align-center"
        cols="12"
      >
        <v-text-field
          v-model="search"
          append-inner-icon="mdi-magnify"
          class="flex-grow-1"
          hide-details
          :label="$t('search')"
          single-line
          variant="underlined"
        />
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col>
        <v-data-table
          class="elevation-1"
          density="compact"
          :headers="headers"
          hide-default-footer
          hover
          :items="items"
          :items-per-page="items.length"
          :loading="isLoading"
          :loading-text="$t('loading-text')"
          :search="search"
        >
          <template #loader>
            <v-progress-linear
              color="primary"
              indeterminate
            />
          </template>

          <template #no-data>
            {{ $t('data-table.no-data') }}
          </template>

          <template #[`item.id`]="{ item, value }: any">
            <router-link :to="{ name: 'invoice', params: { id: item.id } }">
              {{ value }}
            </router-link>
          </template>

          <template #[`item.buyer.name`]="{ item, value }: any">
            <router-link :to="{ name: 'company', params: { id: item.buyer.id } }">
              {{ value }}
            </router-link>
          </template>

          <template #[`item.created_at`]="{ value }">
            {{ datetimeFormat(value) }}
          </template>

          <template #[`item.actions`]="{ item }: any">
            <v-icon
              color="blue-grey-darken-4"
              icon="mdi-download"
              :title="$t('download')"
              @click="download(item.id)"
            />
            &nbsp;
            <v-icon
              color="error"
              icon="mdi-delete"
              size="small"
              @click="deleteItem(item)"
            />
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>
