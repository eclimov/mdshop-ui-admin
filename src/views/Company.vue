<script setup lang="ts">
import { ref } from 'vue'
import { getEmptyCompanyView } from '@/utils/forms'
import { useLoader } from '@/stores/loader'
import { findCompany } from '@/api/companies'
import CompanyData from '@/components/CompanyData.vue'
import CompanyAddresses from '@/components/CompanyAddresses.vue'
import CompanyEmployees from '@/components/CompanyEmployees.vue'

const props = defineProps<{
  id: string;
}>()

const loaderStore = useLoader()
const company = ref(getEmptyCompanyView())

async function fetch () {
  loaderStore.isActive = true
  try {
    company.value = (await findCompany(props.id)).data
  } finally {
    loaderStore.isActive = false
  }
}

fetch()
</script>

<template>
  <div>
    <CompanyData
      v-if="company.id"
      :company="company"
      @deleted="$router.push({ name: 'companies' })"
      @saved="fetch"
    />

    <hr />

    <CompanyAddresses
      v-if="company.id"
      :company="company"
    />

    <CompanyEmployees
      v-if="company.id"
      :company="company"
    />
  </div>
</template>
