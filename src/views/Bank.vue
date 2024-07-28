<script setup lang="ts">
import { ref } from 'vue'
import { getEmptyBankView } from '@/utils/forms'
import { findBank } from '@/api/banks'
import { useLoader } from '@/stores/loader'
import BankData from '@/components/BankData.vue'
import BankAffiliates from '@/components/BankAffiliates.vue'

const props = defineProps<{
  id: string;
}>()

const loaderStore = useLoader()
const bank = ref(getEmptyBankView())

async function fetch () {
  loaderStore.isActive = true
  try {
    bank.value = (await findBank(props.id)).data
  } finally {
    loaderStore.isActive = false
  }
}

fetch()
</script>

<template>
  <div>
    <BankData
      v-if="bank.id"
      :bank="bank"
      @deleted="$router.push({ name: 'banks' })"
      @saved="fetch"
    />

    <hr />

    <BankAffiliates
      v-if="bank.id"
      :bank="bank"
    />
  </div>
</template>
