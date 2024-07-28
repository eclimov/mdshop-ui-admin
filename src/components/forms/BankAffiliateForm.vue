<script setup lang="ts">
import { mapBankAffiliateViewToCreate } from '@/utils/forms'
import { useLoader } from '@/stores/loader'
import type { BankAffiliateTypeView } from '@/types/bankAffiliate'
import { createBankAffiliate, updateBankAffiliate } from '@/api/bankAffiliates'
import { useRoute } from 'vue-router'

const bankAffiliate = defineModel<BankAffiliateTypeView>('bankAffiliate', {
  required: true
})

const route = useRoute()

const emit = defineEmits(['cancel', 'saved'])
const loaderStore = useLoader()

async function save () {
  try {
    loaderStore.isActive = true
    if (bankAffiliate.value.id) {
      await updateBankAffiliate(bankAffiliate.value.id, bankAffiliate.value)
    } else {
      await createBankAffiliate(
        mapBankAffiliateViewToCreate(bankAffiliate.value, route.params.id as string)  // TODO: update API - allow sending BankAffiliateTypeView type directly
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
      <span class="text-h5">{{ bankAffiliate.id ? $t('edit-item') : $t('new-item') }}</span>
    </v-card-title>

    <v-card-text>
      <v-container>
        <v-row>
          <v-col
            cols="12"
          >
            <v-text-field
              v-model="bankAffiliate.affiliateNumber"
              autofocus
              :label="$t('affiliate-number')"
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
