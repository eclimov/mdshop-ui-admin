<script setup lang="ts">
import { useUser } from '@/stores/user'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { computed } from 'vue'
import imageLogo from '@/assets/logo.png'

const router = useRouter()

const userStore = useUser()
const {
  id: userId,
  companyId: userCompanyId,
  companyName: userCompanyName,
  email: userEmail
} = storeToRefs(userStore)

const isAuthenticated = computed(() => {
  return !!userEmail.value
})

async function logout () {
  userStore.reset()
  await router.push({ name: 'home' })
}
</script>

<template>
  <v-app-bar color="grey-darken-3">
    <div class="d-flex align-center">
      <router-link :to="{ name: 'home' }">
        <v-img
          :alt="$t('logo')"
          class="shrink mr-2 ml-3"
          :src="imageLogo"
          transition="scale-transition"
          width="40"
        />
      </router-link>
    </div>

    <div v-if="isAuthenticated">
      <v-btn
        :to="{ name: 'invoices' }"
        variant="text"
      >
        {{ $t('invoices') }}
      </v-btn>

      <v-btn
        :to="{ name: 'companies' }"
        variant="text"
      >
        {{ $t('companies') }}
      </v-btn>

      <v-btn
        :to="{ name: 'banks' }"
        variant="text"
      >
        {{ $t('banks') }}
      </v-btn>

      <!--No need to display the following link to users-->
      <!--
      <v-btn
        :to="{ name: 'users' }"
        variant="text"
      >
        Users
      </v-btn>
      -->
    </div>

    <v-spacer />

    <template v-if="isAuthenticated">
      <div class="d-flex flex-column">
        <router-link :to="{ name: 'user', params: { id: userId } }">
          {{ userEmail }}
        </router-link>
        <span class="text-caption">
          <router-link :to="{ name: 'company', params: { id: userCompanyId } }">
            {{ userCompanyName }}
          </router-link>
        </span>
      </div>
      <v-btn
        class="ml-2"
        color="warning"
        icon="mdi-logout"
        variant="text"
        @click="logout"
      />
    </template>
    <v-btn
      v-else
      icon="mdi-login"
      :title="$t('login')"
      :to="{ name: 'login' }"
      variant="text"
    />
  </v-app-bar>
</template>
