<script setup lang="ts">
import { datetimeFormat } from '@/utils/string'
import { ref } from 'vue'
import { useLoader } from '@/stores/loader'
import ModalConfirm from '@/components/ModalConfirm.vue'
import type { CompanyTypeView } from '@/types/company'
import { deleteCompany } from '@/api/companies'
import CompanyForm from '@/components/forms/CompanyForm.vue'
import type { BankAffiliateTypeView } from '@/types/bankAffiliate'

const props = defineProps<{
  company: CompanyTypeView;
}>()

const emit = defineEmits(['saved', 'deleted'])
const loaderStore = useLoader()

const isModalDeleteActive = ref(false)
const dialog = ref(false)
const editedItem = ref({ ...props.company })

function resetEditedItem () {
  editedItem.value = { ...props.company }
}

function closeDialogDelete () {
  isModalDeleteActive.value = false
  resetEditedItem()
}

function closeDialogEdit () {
  dialog.value = false
}

function onSave () {
  closeDialogEdit()
  emit('saved')
}

async function deleteItemConfirm (id: number) {
  closeDialogDelete()
  loaderStore.isActive = true
  try {
    await deleteCompany(id)
    emit('deleted')
  } finally {
    loaderStore.isActive = false
  }
}
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
      @saved="onSave"
    />
  </v-dialog>

  <ModalConfirm
    v-if="isModalDeleteActive"
    :object-value="editedItem.name"
    @cancel="closeDialogDelete"
    @confirm="deleteItemConfirm(editedItem.id)"
  />

  <v-card class="pb-4">
    <v-card-title class="d-flex align-center pb-0">
      <v-btn
        class="mr-2"
        color="primary"
        icon="mdi-pencil"
        size="large"
        variant="text"
        @click="dialog = true"
      />

      <v-btn
        class="mr-2"
        color="error"
        icon="mdi-delete"
        size="large"
        variant="text"
        @click="isModalDeleteActive = true"
      />

      <h1>{{ company.name }}</h1>
    </v-card-title>

    <v-card-subtitle>{{ $t('created-at') }}: {{ datetimeFormat(company.created_at) }}</v-card-subtitle>

    <v-card-text>
      <b>{{ $t('name-short') }}:</b> {{ company.shortName }}
      <br>
      <b>{{ $t('affiliate-number') }}:</b> <span v-if="company.bankAffiliate">{{ (company.bankAffiliate as BankAffiliateTypeView).affiliateNumber }}</span>
      <br>
      <b>{{ $t('fiscal-code') }}:</b> {{ company.fiscalCode }}
      <br>
      <b>IBAN:</b> {{ company.iban }}
      <br>
      <b>{{ $t('vat') }}:</b> {{ company.vat }}
    </v-card-text>

    <v-card-actions>
      <v-btn
        class="mr-2"
        color="blue-grey-darken-4"
        prepend-icon="mdi-file-plus"
        rounded="md"
        size="large"
        :to="{ name: 'create-invoice', params: { buyerCompanyId: company.id }}"
        variant="elevated"
      >
        {{ $t('create-invoice') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
