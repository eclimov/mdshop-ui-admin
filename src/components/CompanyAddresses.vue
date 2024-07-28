<script setup lang="ts">
import { datetimeFormat } from '@/utils/string'
import { getEmptyCompanyAddressView } from '@/utils/forms'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import ModalConfirm from '@/components/ModalConfirm.vue'
import type { CompanyTypeView } from '@/types/company'
import type { CompanyAddressTypeView } from '@/types/companyAddress'
import { deleteCompanyAddress } from '@/api/companyAddresses'
import { getCompanyAddressesByCompanyId } from '@/api/companies'
import CompanyAddressForm from '@/components/forms/CompanyAddressForm.vue'

const props = defineProps<{
  company: CompanyTypeView;
}>()

const { t } = useI18n()
const isLoading = ref(false)
const isModalDeleteActive = ref(false)
const dialog = ref(false)
const editedItem = ref(getEmptyCompanyAddressView())
const search = ref('')
const headers = ref([
  {
    title: 'ID',
    align: 'start',
    value: 'id',
    sortable: true
  },
  { title: t('address'), value: 'address', sortable: true },
  { title: t('is-juridic'), value: 'juridic', sortable: true },
  { title: t('created-at'), value: 'created_at' },
  { title: t('actions'), value: 'actions' }
] as const)
const items = ref([])

function onSaved () {
  closeDialogEdit()
  fetch()
}

function editItem (item: CompanyAddressTypeView) {
  editedItem.value = { ...item }
  dialog.value = true
}

function deleteItem (item: CompanyAddressTypeView) {
  editedItem.value = { ...item }
  isModalDeleteActive.value = true
}

function resetEditedItem () {
  editedItem.value = getEmptyCompanyAddressView()
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
    await deleteCompanyAddress(id)
  } finally {
    await fetch()
    isLoading.value = false
  }
}

async function fetch () {
  isLoading.value = true
  try {
    items.value = (await getCompanyAddressesByCompanyId(props.company.id)).data
  } finally {
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
    <CompanyAddressForm
      v-model:company-address="editedItem"
      @cancel="closeDialogEdit"
      @saved="onSaved"
    />
  </v-dialog>

  <ModalConfirm
    v-if="isModalDeleteActive"
    :object-value="editedItem.address"
    @cancel="closeDialogDelete"
    @confirm="deleteItemConfirm(editedItem.id)"
  />

  <v-container>
    <v-row>
      <v-col class="text-h5">
        {{ $t('company-addresses') }}
      </v-col>
    </v-row>
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

          <template #[`item.juridic`]="{ value }">
            <v-icon
              v-if="value"
              icon="mdi-check"
            />
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

