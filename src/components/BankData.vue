<script setup lang="ts">
import { deleteBank } from '@/api/banks'
import { datetimeFormat } from '@/utils/string'
import type { BankTypeView } from '@/types/bank'
import { ref } from 'vue'
import { useLoader } from '@/stores/loader'
import BankForm from '@/components/forms/BankForm.vue'
import ModalConfirm from '@/components/ModalConfirm.vue'

const props = defineProps<{
  bank: BankTypeView;
}>()

const emit = defineEmits(['saved', 'deleted'])
const loaderStore = useLoader()

const isModalDeleteActive = ref(false)
const dialog = ref(false)
const editedItem = ref({ ...props.bank })

function resetEditedItem () {
  editedItem.value = { ...props.bank }
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
    await deleteBank(id)
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
    <BankForm
      v-model:bank="editedItem"
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

      <h1>{{ bank.name }}</h1>
    </v-card-title>

    <v-card-subtitle>{{ $t('created-at') }}: {{ datetimeFormat(bank.created_at) }}</v-card-subtitle>
  </v-card>
</template>
