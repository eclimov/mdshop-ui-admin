<script setup lang="ts">
import { mapCompanyEmployeeViewToCreate } from '@/utils/forms'
import { useLoader } from '@/stores/loader'
import { useRoute } from 'vue-router'
import type { CompanyEmployeeTypeView } from '@/types/companyEmployee'
import { createCompanyEmployee, updateCompanyEmployee } from '@/api/companyEmployees'
import { useI18n } from 'vue-i18n'
import { positionsEnum } from '@/utils/enums'

const companyEmployee = defineModel<CompanyEmployeeTypeView>('companyEmployee', {
  required: true
})

const route = useRoute()

const emit = defineEmits(['cancel', 'saved'])
const loaderStore = useLoader()

const { t } = useI18n()

const rules = {
  required: (value: string) => !!value || t('validation.required')
}

async function save () {
  try {
    loaderStore.isActive = true
    if (companyEmployee.value.id) {
      await updateCompanyEmployee(companyEmployee.value.id, companyEmployee.value)
    } else {
      await createCompanyEmployee(
        mapCompanyEmployeeViewToCreate(companyEmployee.value, route.params.id as string)  // TODO: update API - allow sending CompanyEmployeeTypeView type directly
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
      <span class="text-h5">{{ companyEmployee.id ? $t('edit-item') : $t('new-item') }}</span>
    </v-card-title>

    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="7">
            <v-text-field
              v-model="companyEmployee.name"
              autofocus
              :label="$t('employee-name')"
              :rules="[rules.required]"
              variant="underlined"
            />
          </v-col>

          <v-col cols="5">
            <v-select
              v-model="companyEmployee.position"
              :items="[positionsEnum.CONSULTANT, positionsEnum.DIRECTOR]"
              :label="$t('position')"
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
