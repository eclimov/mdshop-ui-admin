<script setup lang="ts">
import { ref } from 'vue'
import { getEmptyUserView } from '@/utils/forms'
import { useLoader } from '@/stores/loader'
import { findUser } from '@/api/users'
import UserData from '@/components/UserData.vue'

const props = defineProps<{
  id: string;
}>()

const loaderStore = useLoader()
const user = ref(getEmptyUserView())

async function fetch () {
  loaderStore.isActive = true
  try {
    user.value = (await findUser(props.id)).data
  } finally {
    loaderStore.isActive = false
  }
}

fetch()
</script>

<template>
  <div>
    <UserData
      v-if="user.id"
      :user="user"
      @deleted="$router.push({ name: 'users' })"
      @saved="fetch"
    />
  </div>
</template>
