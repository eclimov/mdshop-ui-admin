<script setup lang="ts">
import { useLoader } from '@/stores/loader'
import { createInvoice } from '@/api/invoices'
import { useUser } from '@/stores/user'
import { storeToRefs } from 'pinia'
import { computed, type Ref, ref } from 'vue'
import {
  generateCompanyPath,
  getCompanies,
  getCompanyAddressesByCompanyId,
  getCompanyEmployeesByCompanyId
} from '@/api/companies'
import type { CompanyTypeView } from '@/types/company'
import type { InvoiceTypeCreate } from '@/types/invoice'
import { dateFormat } from '@/utils/string'
import type { CompanyAddressTypeView } from '@/types/companyAddress'
import type { CompanyEmployeeTypeView } from '@/types/companyEmployee'
import { generateCompanyEmployeePath } from '@/api/companyEmployees'
import { generateCompanyAddressPath } from '@/api/companyAddresses'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import type { VForm } from 'vuetify/components'

const props = defineProps<{
  buyerCompanyId: string;
}>()

const { t } = useI18n()
const userStore = useUser()
const {
  companyId: userCompanyId,
} = storeToRefs(userStore)

const router = useRouter()
const loaderStore = useLoader()
const invoiceForm: Ref<VForm|null> = ref(null)
const valid = ref(true)
const companies: Ref<CompanyTypeView[]> = ref([])
const sellerCompanyAddresses: Ref<CompanyAddressTypeView[]> = ref([])
const sellerEmployees: Ref<CompanyEmployeeTypeView[]> = ref([])
const buyerEmployees: Ref<CompanyEmployeeTypeView[]> = ref([])
const buyerCompanyAddresses: Ref<CompanyAddressTypeView[]> = ref([])

const rules = {
  address: (v: string) => !!v || t('validation.company-should-have-address'),
  required: (value: string) => !!value || t('validation.required')
}

const selectedBuyerId = ref(parseInt(props.buyerCompanyId))
const selectedSellerId = ref(userCompanyId.value)
const isOrderDateOpened = ref(false)
const isDeliveryDateOpened = ref(false)
const orderDate = ref(new Date(Date.now()))
const deliveryDate = ref(new Date(Date.now()))
const selectedCarrierId = ref(parseInt(props.buyerCompanyId))
const attachedDocument = ref('-')
const selectedLoadingPointId = ref(0)
const selectedUnloadingPointId = ref(0)
const selectedApprovedByEmployeeId = ref(0)
const selectedProcessedByEmployeeId = ref(0)
const recipientName = ref('')

const orderDateFormatted = computed(() => {
  return dateFormat(orderDate.value.toDateString())
})
const deliveryDateFormatted = computed(() => {
  return dateFormat(deliveryDate.value.toDateString())
})
const invoiceData = computed((): InvoiceTypeCreate => {
  return {
    seller: generateCompanyPath(selectedSellerId.value?.toString() as string),
    buyer: generateCompanyPath(selectedBuyerId.value.toString()),
    orderDate: orderDate.value.toISOString(),
    deliveryDate: deliveryDate.value.toISOString(),
    carrier: generateCompanyPath(selectedCarrierId.value.toString()),
    attachedDocument: attachedDocument.value,
    loadingPoint: generateCompanyAddressPath(selectedLoadingPointId.value),
    unloadingPoint: generateCompanyAddressPath(selectedUnloadingPointId.value),
    approvedByEmployee: generateCompanyEmployeePath(selectedApprovedByEmployeeId.value),
    processedByEmployee: generateCompanyEmployeePath(selectedProcessedByEmployeeId.value),
    // If you add a recipientName value and then remove it using backspace from the input,
    // the value becomes null. Backend doesn't accept null here
    // TODO: allow accepting null value for recipient name, to get rid of the workaround below
    recipientName: recipientName.value || ''
  }
})


async function submit () {
  loaderStore.isActive = true
  try {
    const invoice = (await createInvoice(invoiceData.value)).data
    await router.push({ name: 'invoice', params: { id: invoice.id } })
  } finally {
    loaderStore.isActive = false
  }
}

async function fetchData () {
  loaderStore.isActive = true
  try {
    companies.value = (await getCompanies()).data

    sellerCompanyAddresses.value = (await getCompanyAddressesByCompanyId(selectedSellerId.value as number)).data
    selectedLoadingPointId.value = (sellerCompanyAddresses.value.find((companyAddress) => !companyAddress.juridic) || sellerCompanyAddresses.value[0]).id
    sellerEmployees.value = (await getCompanyEmployeesByCompanyId(selectedSellerId.value as number)).data
    selectedApprovedByEmployeeId.value = sellerEmployees.value[0].id
    selectedProcessedByEmployeeId.value = sellerEmployees.value[0].id

    buyerCompanyAddresses.value = (await getCompanyAddressesByCompanyId(selectedBuyerId.value)).data
    selectedUnloadingPointId.value = (buyerCompanyAddresses.value.find((companyAddress) => companyAddress.juridic) || buyerCompanyAddresses.value[0]).id
    buyerEmployees.value = (await getCompanyEmployeesByCompanyId(selectedBuyerId.value)).data
  } finally {
    await invoiceForm.value?.validate()  // Validate form to make sure all required data exists in inputs
    loaderStore.isActive = false
  }
}

// TODO: implement 'add item' feature via 'append-icon' of form input

fetchData()
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="8">
        <v-form
          ref="invoiceForm"
          v-model="valid"
          validate-on="input lazy"
          @submit.prevent="submit"
        >
          <v-row>
            <v-col cols="6">
              <v-select
                v-model="selectedSellerId"
                density="compact"
                disabled
                item-title="name"
                item-value="id"
                :items="companies"
                :label="$t('seller')"
                variant="underlined"
              />
            </v-col>
            <v-col cols="6">
              <v-select
                v-model="selectedBuyerId"
                density="compact"
                disabled
                item-title="name"
                item-value="id"
                :items="companies"
                :label="$t('buyer')"
                variant="underlined"
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="6">
              <v-menu
                v-model="isOrderDateOpened"
                :close-on-content-click="false"
              >
                <template #activator="{ props: attrs }">
                  <v-text-field
                    v-model="orderDateFormatted"
                    density="compact"
                    :label="$t('order-date')"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    variant="underlined"
                  />
                </template>
                <v-date-picker
                  v-model="orderDate"
                  color="primary"
                  :title="$t('pick-date')"
                  @update:model-value="isOrderDateOpened = false"
                />
              </v-menu>
            </v-col>
            <v-col cols="6">
              <v-menu
                v-model="isDeliveryDateOpened"
                :close-on-content-click="false"
              >
                <template #activator="{ props: attrs }">
                  <v-text-field
                    v-model="deliveryDateFormatted"
                    v-bind="attrs"
                    density="compact"
                    :label="$t('delivery-date')"
                    prepend-icon="mdi-calendar"
                    readonly
                    variant="underlined"
                  />
                </template>
                <v-date-picker
                  v-model="deliveryDate"
                  color="primary"
                  :title="$t('pick-date')"
                  @update:model-value="isDeliveryDateOpened = false"
                />
              </v-menu>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <v-autocomplete
                v-model="selectedCarrierId"
                density="compact"
                item-title="name"
                item-value="id"
                :items="companies"
                :label="$t('carrier')"
                :rules="[rules.required]"
                variant="underlined"
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="attachedDocument"
                density="compact"
                :label="$t('attached-document')"
                variant="underlined"
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="6">
              <v-select
                v-model="selectedLoadingPointId"
                density="compact"
                item-title="address"
                item-value="id"
                :items="sellerCompanyAddresses"
                :label="$t('loading-point')"
                :rules="[rules.address]"
                variant="underlined"
              >
                <template #item="{ item, props: attrs }">
                  <v-list-item v-bind="attrs">
                    <template #title>
                      {{ item.raw.address }}
                    </template>
                    <template
                      v-if="item.raw.juridic"
                      #subtitle
                    >
                      {{ $t('juridic') }}
                    </template>
                  </v-list-item>
                </template>
              </v-select>
            </v-col>
            <v-col cols="6">
              <v-select
                v-model="selectedUnloadingPointId"
                density="compact"
                item-title="address"
                item-value="id"
                :items="buyerCompanyAddresses"
                :label="$t('unloading-point')"
                :rules="[rules.address]"
                variant="underlined"
              >
                <template #item="{ item, props: attrs }">
                  <v-list-item v-bind="attrs">
                    <template #title>
                      {{ item.raw.address }}
                    </template>
                    <template
                      v-if="item.raw.juridic"
                      #subtitle
                    >
                      {{ $t('juridic') }}
                    </template>
                  </v-list-item>
                </template>
              </v-select>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="6">
              <v-select
                v-model="selectedApprovedByEmployeeId"
                density="compact"
                item-title="name"
                item-value="id"
                :items="sellerEmployees"
                :label="$t('approved-by-employee')"
                variant="underlined"
              >
                <template #item="{ item, props: attrs }">
                  <v-list-item v-bind="attrs">
                    <template #title>
                      {{ item.raw.name }}
                    </template>
                    <template #subtitle>
                      {{ item.raw.position }}
                    </template>
                  </v-list-item>
                </template>
              </v-select>
            </v-col>
            <v-col cols="6">
              <v-select
                v-model="selectedProcessedByEmployeeId"
                density="compact"
                item-title="name"
                item-value="id"
                :items="sellerEmployees"
                :label="$t('processed-by-employee')"
                variant="underlined"
              >
                <template #item="{ item, props: attrs }">
                  <v-list-item v-bind="attrs">
                    <template #title>
                      {{ item.raw.name }}
                    </template>
                    <template #subtitle>
                      {{ item.raw.position }}
                    </template>
                  </v-list-item>
                </template>
              </v-select>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <v-combobox
                v-model="recipientName"
                density="compact"
                :hint="$t('hints.invoice-create-recipient-input')"
                item-title="name"
                item-value="name"
                :items="buyerEmployees"
                :label="$t('recipient-name')"
                persistent-hint
                :return-object="false"
                variant="underlined"
              >
                <template #item="{ item, props: attrs }">
                  <v-list-item v-bind="attrs">
                    <template #title>
                      {{ item.raw.name }}
                    </template>
                    <template #subtitle>
                      {{ item.raw.position }}
                    </template>
                  </v-list-item>
                </template>
              </v-combobox>
            </v-col>
          </v-row>

          <v-row justify="center">
            <v-btn
              color="success"
              :disabled="!valid"
              size="x-large"
              type="submit"
            >
              {{ $t('create') }}
            </v-btn>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>
