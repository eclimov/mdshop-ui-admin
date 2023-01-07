<template>
  <v-card
    :disabled="isLoading"
    :loading="isLoading"
  >
    <v-card-title>
      <span class="text-h5">{{ title }}</span>
    </v-card-title>

    <v-card-text>
      <v-form v-model="isValid">
        <v-container>
          <v-row>
            <v-col cols="8">
              <v-text-field
                v-model="editedItem.name"
                :rules="employeeNameRules"
                autofocus
                :label="$t('employee-name')"
              />
            </v-col>

            <v-col cols="4">
              <v-select
                v-model="editedItem.position"
                :items="positions"
                :rules="employeePositionRules"
                :label="$t('position')"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card-text>

    <v-card-actions>
      <v-spacer />
      <v-btn
        color="blue darken-1"
        text
        @click="$emit('cancel')"
      >
        {{ $t('cancel') }}
      </v-btn>
      <v-btn
        color="blue darken-1"
        text
        :disabled="!isValid"
        @click="save"
      >
        {{ $t('save') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { positionsEnum } from '@/utils/enums'
import { getCompanyEmployeeObject } from '@/utils/forms'
import { findCompanyEmployee, createCompanyEmployee, updateCompanyEmployee } from '@/api/companyEmployees'

export default {
  name: 'CompanyEmployeeFormVue',

  props: {
    companyId: {
      type: Number,
      required: true
    },
    companyEmployeeId: {
      type: Number,
      required: true
    }
  },

  data () {
    return {
      isLoading: false,
      positions: [
        positionsEnum.CONSULTANT,
        positionsEnum.DIRECTOR
      ],
      employeeNameRules: [
        v => !!v || this.$t('validation.required')
      ],
      employeePositionRules: [
        v => !!v || this.$t('validation.required')
      ],
      isValid: false,
      editedItem: getCompanyEmployeeObject(this.companyId)
    }
  },

  computed: {
    title () {
      return this.companyEmployeeId ? this.$t('edit-item') : this.$t('new-item')
    }
  },

  async created () {
    if (this.companyEmployeeId) {
      try {
        this.isLoading = true
        this.editedItem = (await findCompanyEmployee(this.companyEmployeeId)).data
      } finally {
        this.isLoading = false
      }
    }
  },

  methods: {
    async save () {
      const editedItem = this.editedItem

      try {
        this.isLoading = true
        if (this.companyEmployeeId) {
          await updateCompanyEmployee(this.companyEmployeeId, editedItem)
        } else {
          await createCompanyEmployee(editedItem)
        }
        this.$emit('ok')
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>

<style scoped>

</style>
