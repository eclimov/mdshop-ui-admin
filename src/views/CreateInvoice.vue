<template>
  <v-container>
    <v-row>
      <v-col cols="6">
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
          @submit.prevent="submit"
        >
          <v-row>
            <v-col cols="6">
              <v-select
                v-model="form.seller"
                :items="sellerOptions"
                item-text="text"
                item-value="value"
                :label="$t('seller')"
                disabled
              />
            </v-col>
            <v-col cols="6">
              <v-select
                v-model="form.buyer"
                :items="buyerOptions"
                item-text="text"
                item-value="value"
                :label="$t('buyer')"
                disabled
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="6">
              <v-menu
                v-model="isOrderDateOpened"
                :close-on-content-click="true"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="orderDateFormatted"
                    :label="$t('order-date')"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  />
                </template>
                <v-date-picker
                  v-model="form.orderDate"
                  locale="ru-MD"
                  :first-day-of-week="1"
                  @input="menu2 = false"
                />
              </v-menu>
            </v-col>
            <v-col cols="6">
              <v-menu
                v-model="isDeliveryDateOpened"
                :close-on-content-click="true"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="deliveryDateFormatted"
                    :label="$t('delivery-date')"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  />
                </template>
                <v-date-picker
                  v-model="form.deliveryDate"
                  locale="ru-MD"
                  :first-day-of-week="1"
                  @input="menu2 = false"
                />
              </v-menu>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <v-select
                v-model="form.carrier"
                :items="carrierOptions"
                item-text="text"
                item-value="value"
                :label="$t('carrier')"
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="form.attachedDocument"
                :label="$t('attached-document')"
                required
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="6">
              <v-select
                v-model="form.loadingPoint"
                :items="loadingPointOptions"
                item-text="text"
                item-value="value"
                :label="$t('loading-point')"
              />
            </v-col>
            <v-col cols="6">
              <v-select
                v-model="form.unloadingPoint"
                :items="unloadingPointOptions"
                item-text="text"
                item-value="value"
                :label="$t('unloading-point')"
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="6">
              <v-select
                v-model="form.approvedByEmployee"
                :items="approvedByEmployeeOptions"
                item-text="text"
                item-value="value"
                :label="$t('approved-by-employee')"
              />
            </v-col>
            <v-col cols="6">
              <v-select
                v-model="form.processedByEmployee"
                :items="processedByEmployeeOptions"
                item-text="text"
                item-value="value"
                :label="$t('processed-by-employee')"
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="form.recipientName"
                :label="$t('recipient-name')"
                required
              />
            </v-col>
          </v-row>

          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            type="submit"
          >
            {{ $t('create') }}
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'
import {
  generateCompanyPath,
  getCompanies,
  getCompanyAddressesByCompanyId,
  getCompanyEmployeesByCompanyId
} from '@/api/companies'
import { dateFormat } from '@/utils/string'
import { createInvoice } from '@/api/invoices'
import { generateCompanyAddressPath } from '@/api/companyAddresses'
import { generateCompanyEmployeePath } from '@/api/companyEmployees'

// TODO: implement 'add item' feature via 'append-icon' of form input
export default {
  name: 'CreateInvoice',
  components: {},

  props: {
    buyerCompanyId: {
      type: [Number, String],
      required: true
    }
  },

  data () {
    return {
      valid: true,
      sellerOptions: [],
      buyerOptions: [],
      isOrderDateOpened: false,
      isDeliveryDateOpened: false,
      carrierOptions: [],
      loadingPointOptions: [],
      unloadingPointOptions: [],
      approvedByEmployeeOptions: [],
      processedByEmployeeOptions: [],
      form: {
        seller: null,
        buyer: null,
        orderDate: (new Date(Date.now())).toISOString().substr(0, 10),
        deliveryDate: (new Date(Date.now())).toISOString().substr(0, 10),
        carrier: null,
        attachedDocument: '-',
        loadingPoint: null,
        unloadingPoint: null,
        approvedByEmployee: null,
        processedByEmployee: null,
        recipientName: ''
      }
      // emailRules: [
      //   v => !!v || 'E-mail is required',
      //   v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      // ]
    }
  },

  computed: {
    ...mapGetters({
      userCompanyId: 'user/companyId'
    }),

    orderDateFormatted () {
      return dateFormat(this.form.orderDate)
    },
    deliveryDateFormatted () {
      return dateFormat(this.form.deliveryDate)
    }
  },

  async created () {
    try {
      this.showLoadingOverlay()
      await this.fillDataDefault()
    } finally {
      this.hideLoadingOverlay()
    }
  },

  methods: {
    ...mapActions({
      showLoadingOverlay: 'general/showLoadingOverlay',
      hideLoadingOverlay: 'general/hideLoadingOverlay'
    }),

    async fillDataDefault () {
      const companies = (await getCompanies()).data
      const sellerAddresses = (await getCompanyAddressesByCompanyId(this.userCompanyId)).data
      const buyerAddresses = (await getCompanyAddressesByCompanyId(this.buyerCompanyId)).data
      const sellerEmployees = (await getCompanyEmployeesByCompanyId(this.userCompanyId)).data

      this.sellerOptions = [
        { text: this.$t('select-an-option'), value: null },
        ...companies.map((company) => {
          return { text: company.name, value: generateCompanyPath(company.id) }
        })
      ]
      this.buyerOptions = [
        { text: this.$t('select-an-option'), value: null },
        ...companies.map((company) => {
          return { text: company.name, value: generateCompanyPath(company.id) }
        })
      ]
      this.carrierOptions = [
        { text: this.$t('select-an-option'), value: null },
        ...companies.map((company) => {
          return { text: company.name, value: generateCompanyPath(company.id) }
        })
      ]
      this.loadingPointOptions = [
        { text: '--Select an option--', value: null },
        ...sellerAddresses.map((companyAddress) => {
          return { text: companyAddress.address, value: generateCompanyAddressPath(companyAddress.id) }
        })
      ]
      this.unloadingPointOptions = [
        { text: this.$t('select-an-option'), value: null },
        ...buyerAddresses.map((companyAddress) => {
          return { text: companyAddress.address, value: generateCompanyAddressPath(companyAddress.id) }
        })
      ]
      this.approvedByEmployeeOptions = [
        { text: this.$t('select-an-option'), value: null },
        ...sellerEmployees.map((companyEmployee) => {
          return {
            text: `[${companyEmployee.position}] ${companyEmployee.name}`,
            value: generateCompanyEmployeePath(companyEmployee.id)
          }
        })
      ]
      this.processedByEmployeeOptions = [
        { text: this.$t('select-an-option'), value: null },
        ...sellerEmployees.map((companyEmployee) => {
          return {
            text: `[${companyEmployee.position}] ${companyEmployee.name}`,
            value: generateCompanyEmployeePath(companyEmployee.id)
          }
        })
      ]

      this.form.seller = generateCompanyPath(this.userCompanyId)
      this.form.buyer = generateCompanyPath(this.buyerCompanyId)
      this.form.carrier = generateCompanyPath(this.buyerCompanyId)

      if (sellerAddresses.length) {
        const loadingPointAddressToSelectByDefault = sellerAddresses.find((companyAddress) => !companyAddress.juridic) || sellerAddresses[0]
        this.form.loadingPoint = generateCompanyAddressPath(loadingPointAddressToSelectByDefault.id)
      }
      if (buyerAddresses.length) {
        const unloadingPointAddressToSelectByDefault = buyerAddresses.find((companyAddress) => companyAddress.juridic) || buyerAddresses[0]
        this.form.unloadingPoint = generateCompanyAddressPath(unloadingPointAddressToSelectByDefault.id)
      }
      if (sellerEmployees.length) {
        const approvedByEmployeeToSelectByDefault = sellerEmployees[0]
        const processedByEmployeeToSelectByDefault = sellerEmployees[0]
        this.form.approvedByEmployee = generateCompanyEmployeePath(approvedByEmployeeToSelectByDefault.id)
        this.form.processedByEmployee = generateCompanyEmployeePath(processedByEmployeeToSelectByDefault.id)
      }
    },

    async submit () {
      if (this.$refs.form.validate()) {
        this.showLoadingOverlay()
        try {
          const invoice = (await createInvoice({
            ...this.form,
            orderDate: (new Date(this.form.orderDate)).toISOString(),
            deliveryDate: (new Date(this.form.deliveryDate)).toISOString()
          })).data
          await this.$router.push({ name: 'invoice', params: { id: invoice.id } })
        } finally {
          this.hideLoadingOverlay()
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
