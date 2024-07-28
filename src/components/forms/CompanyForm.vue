<script setup lang="ts">
import { mapCompanyViewToCreate } from '@/utils/forms'
import { useLoader } from '@/stores/loader'
import type { CompanyTypeView } from '@/types/company'
import { createCompany, updateCompany } from '@/api/companies'
import { type Ref, ref } from 'vue'
import { API_PATH_BANK_AFFILIATES, getBankAffiliates } from '@/api/bankAffiliates'
import type { BankAffiliateTypeView } from '@/types/bankAffiliate'

const company = defineModel<CompanyTypeView>('company', {
  required: true
})

const emit = defineEmits(['cancel', 'saved'])
const loaderStore = useLoader()

const bankAffiliatesOptions: Ref<(string|null|undefined)[]> = ref([])
const isBankAffiliatesLoading = ref(false)

async function save () {
  try {
    loaderStore.isActive = true
    if (company.value.id) {
      await updateCompany(company.value.id, company.value)
    } else {
      await createCompany(
        mapCompanyViewToCreate(company.value)  // TODO: update API - allow sending CompanyTypeView type directly
      )
    }
    emit('saved')
  } finally {
    loaderStore.isActive = false
  }
}

function formatBankAffiliateSelectOption (bankAffiliate: BankAffiliateTypeView) {
  return {
    title: bankAffiliate.affiliateNumber,
    value: `${API_PATH_BANK_AFFILIATES}/${bankAffiliate.id}`
  }
}

async function fetchBankAffiliates () {
  try {
    isBankAffiliatesLoading.value = true

    const bankAffiliates = (await getBankAffiliates()).data
    bankAffiliatesOptions.value = bankAffiliates
      .map((bankAffiliate: BankAffiliateTypeView) => formatBankAffiliateSelectOption(bankAffiliate))

    if (company.value.id) {
      if (company.value.bankAffiliate) {
        company.value.bankAffiliate = formatBankAffiliateSelectOption(company.value.bankAffiliate as BankAffiliateTypeView).value
      } else {
        company.value.bankAffiliate = ''
      }
    }
  } finally {
    isBankAffiliatesLoading.value = false
  }
}

fetchBankAffiliates()
</script>

<template>
  <v-card>
    <v-card-title>
      <span class="text-h5">{{ company.id ? $t('edit-item') : $t('new-item') }}</span>
    </v-card-title>

    <v-card-text>
      <v-container>
        <v-row v-if="company.id">
          <v-col cols="12">
            <!--
            TODO: implement
            <CompanyLogoUploadForm
              :file-name="itemEdited.logo"
              :company-id="itemEdited.id"
            />
            -->
            CompanyLogoUploadForm
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="8">
            <v-text-field
              v-model="company.name"
              autofocus
              :label="$t('name')"
              variant="underlined"
            />
          </v-col>

          <v-col cols="4">
            <v-text-field
              v-model="company.shortName"
              :label="$t('name-short')"
              variant="underlined"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col
            cols="12"
          >
            <v-text-field
              v-model="company.iban"
              counter
              label="IBAN"
              variant="underlined"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="6">
            <v-text-field
              v-model="company.fiscalCode"
              :label="$t('fiscal-code')"
              variant="underlined"
            />
          </v-col>

          <v-col cols="6">
            <v-text-field
              v-model="company.vat"
              :label="$t('vat')"
              variant="underlined"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col
            cols="12"
          >
            <v-autocomplete
              v-model="company.bankAffiliate"
              :disabled="isBankAffiliatesLoading"
              :items="bankAffiliatesOptions"
              :label="$t('bank-affiliate')"
              :loading="isBankAffiliatesLoading"
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
