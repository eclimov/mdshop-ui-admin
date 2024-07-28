<script setup lang="ts">
import { datetimeFormat } from '@/utils/string'
import { ref } from 'vue'
import { useLoader } from '@/stores/loader'
import ModalConfirm from '@/components/ModalConfirm.vue'
import type { UserTypeView } from '@/types/user'
import { deleteUser } from '@/api/users'
import UserForm from '@/components/forms/UserForm.vue'

const props = defineProps<{
  user: UserTypeView;
}>()

const emit = defineEmits(['saved', 'deleted'])
const loaderStore = useLoader()

const isModalDeleteActive = ref(false)
const dialog = ref(false)
const editedItem = ref({ ...props.user })

function resetEditedItem () {
  editedItem.value = { ...props.user }
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
    await deleteUser(id)
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
    <UserForm
      v-model:user="editedItem"
      @cancel="closeDialogEdit"
      @saved="onSave"
    />
  </v-dialog>

  <ModalConfirm
    v-if="isModalDeleteActive"
    :object-value="editedItem.email"
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

      <h1>{{ user.email }}</h1>
    </v-card-title>

    <v-card-subtitle>{{ $t('created-at') }}: {{ datetimeFormat(user.created_at) }}</v-card-subtitle>
  </v-card>
</template>
