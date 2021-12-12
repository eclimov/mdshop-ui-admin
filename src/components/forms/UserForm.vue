<template>
  <v-container>
    <v-row>
      <v-col
        cols="8"
      >
        <v-text-field
          v-model="itemEdited.email"
          autofocus
          label="Email"
        />
      </v-col>
      <v-col
        cols="4"
      >
        <v-select
          v-model="itemEdited.company"
          :items="companiesOptions"
          item-text="text"
          item-value="value"
          :label="$t('company')"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col
        cols="12"
      >
        <v-text-field
          v-model="itemEdited.password"
          :label="$t('password-leave-empty-to-not-to-change')"
          :append-icon="isPasswordValueShown ? 'mdi-eye-off' : 'mdi-eye'"
          :type="isPasswordValueShown ? 'text' : 'password'"
          counter
          @click:append="isPasswordValueShown = !isPasswordValueShown"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { generateCompanyPath, getCompanies } from '@/api/companies'

export default {
  name: 'UserForm',

  props: {
    value: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      isPasswordValueShown: false,
      itemEdited: null,
      companiesOptions: []
    }
  },

  watch: {
    itemEdited: {
      handler (val) {
        this.$emit('input', val)
      },
      deep: true
    }
  },

  async created () {
    this.itemEdited = {
      ...this.value,
      company: generateCompanyPath(this.value.company?.id || null)
    }
    const companies = (await getCompanies()).data
    this.companiesOptions = [
      { text: this.$t('select-an-option'), value: null },
      ...companies.map((company) => {
        return { text: company.name, value: generateCompanyPath(company.id) }
      })
    ]
  }
}
</script>

<style scoped>

</style>
