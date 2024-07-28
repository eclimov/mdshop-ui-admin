<script setup lang="ts">
import type { BankTypeView } from '@/types/bank'
import { createBank, updateBank } from '@/api/banks'
import { mapBankViewToCreate } from '@/utils/forms'
import { useLoader } from '@/stores/loader'

const bank = defineModel<BankTypeView>('bank', {
  required: true
})

const emit = defineEmits(['cancel', 'saved'])
const loaderStore = useLoader()

async function save () {
  try {
    loaderStore.isActive = true
    if (bank.value.id) {
      await updateBank(bank.value.id, bank.value)
    } else {
      await createBank(
        mapBankViewToCreate(bank.value)  // TODO: update API - allow sending BankTypeView type directly
      )
    }
    emit('saved')
  } finally {
    loaderStore.isActive = false
  }
}

</script>

<template>
  <v-card>
    <v-card-title>
      <span class="text-h5">{{ bank.id ? $t('edit-item') : $t('new-item') }}</span>
    </v-card-title>

    <v-card-text>
      <v-container>
        <v-row>
          <v-col
            cols="12"
          >
            <v-text-field
              v-model="bank.name"
              autofocus
              :label="$t('name')"
              variant="underlined"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>

    <v-card-actions>
      <v-spacer />
      <v-btn
        color="blue darken-1"
        @click="emit('cancel')"
      >
        {{ $t('cancel') }}
      </v-btn>
      <v-btn
        color="blue darken-1"
        @click="save"
      >
        {{ $t('save') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
