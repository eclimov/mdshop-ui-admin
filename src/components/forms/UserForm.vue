<script setup lang="ts">
import { mapUserViewToCreate } from '@/utils/forms'
import { useLoader } from '@/stores/loader'
import type { UserTypeView } from '@/types/user'
import { createUser, updateUser } from '@/api/users'
import { type Ref, ref } from 'vue'
import type { CompanyTypeView } from '@/types/company'
import { getCompanies } from '@/api/companies'
import { useI18n } from 'vue-i18n'

const user = defineModel<UserTypeView>('user', {
  required: true
})

const { t } = useI18n()
const emit = defineEmits(['cancel', 'saved'])
const loaderStore = useLoader()

interface CompaniesOptionsType {
  title: string
  value: number
}
const companiesOptions: Ref<CompaniesOptionsType[]> = ref([])

const isPasswordValueShown = ref(false)

async function save () {
  try {
    loaderStore.isActive = true
    const userData = mapUserViewToCreate(user.value, user.value.company.id.toString())
    if (user.value.id) {
      await updateUser(user.value.id, userData)
    } else {
      await createUser(userData)  // Cannot send UserTypeView directly due to password
    }
    emit('saved')
  } finally {
    loaderStore.isActive = false
  }
}

async function fetchCompaniesOptions () {
  try {
    loaderStore.isActive = true

    const companies: CompanyTypeView[] = (await getCompanies()).data
    companiesOptions.value = [
      { title: t('select-an-option'), value: 0 },
      ...companies.map((company) => {
        return { title: company.name, value: company.id }
      })
    ]
  } finally {
    loaderStore.isActive = false
  }
}

fetchCompaniesOptions()
</script>

<template>
  <v-card>
    <v-card-title>
      <span class="text-h5">{{ user.id ? $t('edit-item') : $t('new-item') }}</span>
    </v-card-title>

    <v-card-text>
      <v-container>
        <v-row no-gutters>
          <v-col cols="12">
            <v-text-field
              v-model="user.email"
              autofocus
              label="Email"
              variant="underlined"
            />
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col cols="12">
            <v-text-field
              v-model="user.password"
              :append-icon="isPasswordValueShown ? 'mdi-eye-off' : 'mdi-eye'"
              counter
              :label="$t('password-leave-empty-to-not-to-change')"
              :type="isPasswordValueShown ? 'text' : 'password'"
              variant="underlined"
              @click:append="isPasswordValueShown = !isPasswordValueShown"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-select
              v-model="user.company.id"
              item-title="title"
              item-value="value"
              :items="companiesOptions"
              :label="$t('company')"
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
