<script setup lang="ts">
import { datetimeFormat } from '@/utils/string'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import ModalConfirm from '@/components/ModalConfirm.vue'
import { getEmptyCompanyView } from '@/utils/forms'
import CompanyForm from '@/components/forms/CompanyForm.vue'
import { deleteCompany, getCompanies } from '@/api/companies'
import type { CompanyTypeView } from '@/types/company'

const { t } = useI18n()
const isLoading = ref(false)
const isModalDeleteActive = ref(false)
const dialog = ref(false)
const editedItem = ref(getEmptyCompanyView())
const search = ref('')
const headers = ref([
  {
    title: 'ID',
    align: 'start',
    value: 'id',
    sortable: true
  },
  { title: t('name'), value: 'name', sortable: true },
  { title: t('name-short'), value: 'shortName', sortable: false },
  { title: 'IBAN', value: 'iban', sortable: false },
  { title: t('fiscal-code'), value: 'fiscalCode', sortable: false },
  { title: t('vat'), value: 'vat', sortable: false },
  { title: t('created-at'), value: 'created_at' },
  { title: t('actions'), value: 'actions' }
] as const)
const items = ref([])

async function fetch () {
  isLoading.value = true
  try {
    items.value = (await getCompanies()).data
  } finally {
    isLoading.value = false
  }
}

function onSaved () {
  closeDialogEdit()
  fetch()
}

function editItem (item: CompanyTypeView) {
  editedItem.value = { ...item }
  dialog.value = true
}

function deleteItem (item: CompanyTypeView) {
  editedItem.value = { ...item }
  isModalDeleteActive.value = true
}

function resetEditedItem () {
  editedItem.value = getEmptyCompanyView()
}

function closeDialogDelete () {
  isModalDeleteActive.value = false
  resetEditedItem()
}

function closeDialogEdit () {
  dialog.value = false
}

async function deleteItemConfirm (id: number) {
  closeDialogDelete()
  isLoading.value = true
  try {
    await deleteCompany(id)
  } finally {
    await fetch()
    isLoading.value = false
  }
}

fetch()
</script>

<template>
  <v-dialog
    v-model="dialog"
    max-width="500px"
    @after-leave="resetEditedItem"
  >
    <CompanyForm
      v-model:company="editedItem"
      @cancel="closeDialogEdit"
      @saved="onSaved"
    />
  </v-dialog>

  <ModalConfirm
    v-if="isModalDeleteActive"
    :object-value="editedItem.name"
    @cancel="closeDialogDelete"
    @confirm="deleteItemConfirm(editedItem.id)"
  />

  <v-container fluid>
    <v-row no-gutters>
      <v-col
        class="d-flex align-center"
        cols="12"
      >
        <v-btn
          class="mr-4"
          color="success"
          rounded="md"
          :title="$t('new-item')"
          @click="dialog = true"
        >
          <v-icon size="large">
            mdi-plus-box
          </v-icon>
        </v-btn>

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

          <template #[`item.name`]="{ item }: any">
            <router-link :to="{ name: 'company', params: { id: item.id } }">
              {{ item.name }}
            </router-link>
          </template>

          <template #[`item.created_at`]="{ value }">
            {{ datetimeFormat(value) }}
          </template>

          <template #[`item.actions`]="{ item }">
            <v-icon
              class="mr-2"
              color="warning"
              icon="mdi-pencil"
              size="small"
              @click="editItem(item)"
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
