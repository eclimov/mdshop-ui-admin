<script setup lang="ts">
import { mapCompanyAddressViewToCreate } from '@/utils/forms'
import { useLoader } from '@/stores/loader'
import { useRoute } from 'vue-router'
import type { CompanyAddressTypeView } from '@/types/companyAddress'
import { createCompanyAddress, updateCompanyAddress } from '@/api/companyAddresses'

const companyAddress = defineModel<CompanyAddressTypeView>('companyAddress', {
  required: true
})

const route = useRoute()

const emit = defineEmits(['cancel', 'saved'])
const loaderStore = useLoader()

async function save () {
  try {
    loaderStore.isActive = true
    if (companyAddress.value.id) {
      await updateCompanyAddress(companyAddress.value.id, companyAddress.value)
    } else {
      await createCompanyAddress(
        mapCompanyAddressViewToCreate(companyAddress.value, route.params.id as string)  // TODO: update API - allow sending CompanyAddressTypeView type directly
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
      <span class="text-h5">{{ companyAddress.id ? $t('edit-item') : $t('new-item') }}</span>
    </v-card-title>

    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="8">
            <v-text-field
              v-model="companyAddress.address"
              autofocus
              :label="$t('company-address')"
              variant="underlined"
            />
          </v-col>

          <v-col cols="4">
            <v-checkbox
              v-model="companyAddress.juridic"
              :label="$t('juridic')"
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
