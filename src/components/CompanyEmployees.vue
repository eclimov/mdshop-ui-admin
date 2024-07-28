<script setup lang="ts">
import { datetimeFormat } from '@/utils/string'
import { getEmptyCompanyEmployeeView } from '@/utils/forms'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import ModalConfirm from '@/components/ModalConfirm.vue'
import type { CompanyEmployeeTypeView } from '@/types/companyEmployee'
import { deleteCompanyEmployee } from '@/api/companyEmployees'
import { getCompanyEmployeesByCompanyId } from '@/api/companies'
import CompanyEmployeeForm from '@/components/forms/CompanyEmployeeForm.vue'
import type { CompanyTypeView } from '@/types/company'

const props = defineProps<{
  company: CompanyTypeView;
}>()

const { t } = useI18n()
const isLoading = ref(false)
const isModalDeleteActive = ref(false)
const dialog = ref(false)
const editedItem = ref(getEmptyCompanyEmployeeView())
const search = ref('')
const headers = ref([
  {
    title: 'ID',
    align: 'start',
    value: 'id',
    sortable: true
  },
  { title: t('name'), value: 'name', sortable: true },
  { title: t('position'), value: 'position', sortable: true },
  { title: t('created-at'), value: 'created_at' },
  { title: t('actions'), value: 'actions' }
] as const)
const items = ref([])

function onSaved () {
  closeDialogEdit()
  fetch()
}

function editItem (item: CompanyEmployeeTypeView) {
  editedItem.value = { ...item }
  dialog.value = true
}

function deleteItem (item: CompanyEmployeeTypeView) {
  editedItem.value = { ...item }
  isModalDeleteActive.value = true
}

function resetEditedItem () {
  editedItem.value = getEmptyCompanyEmployeeView()
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
    await deleteCompanyEmployee(id)
  } finally {
    await fetch()
    isLoading.value = false
  }
}

async function fetch () {
  isLoading.value = true
  try {
    items.value = (await getCompanyEmployeesByCompanyId(props.company.id)).data
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
    <CompanyEmployeeForm
      v-model:company-employee="editedItem"
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

  <v-container>
    <v-row>
      <v-col class="text-h5">
        {{ $t('company-employees') }}
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
