<template>
  <v-card>
    <ModalConfirm
      v-if="isModalDeleteActive"
      @cancel="resetEditedId"
      @confirm="deleteItemConfirm(editedId)"
    />

    <v-card-title>{{ $t('company-employees') }}</v-card-title>

    <v-card-title>
      <v-dialog
        v-model="dialog"
        max-width="500px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="success"
            dark
            large
            v-bind="attrs"
            class="mr-2"
            :title="$t('new-item')"
            v-on="on"
          >
            <span class="material-icons">
              add_box
            </span>
          </v-btn>
        </template>
        <!--v-if="dialog" destroys the component on close-->
        <CompanyEmployeeForm
          v-if="dialog"
          :company-id="company.id"
          :company-employee-id="editedId"
          @cancel="modalClose"
          @ok="modalOk"
        />
      </v-dialog>

      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        :label="$t('search')"
        single-line
        hide-details
      />
    </v-card-title>

    <v-data-table
      dense
      :items-per-page="items.length"
      :headers="headers"
      :items="items"
      class="elevation-1"
      :loading="isLoading"
      :loading-text="$t('loading-text')"
      :search="search"
      hide-default-footer
    >
      <template v-slot:item.created_at="{ item }">
        {{ $options.datetimeFormat(item.created_at) }}
      </template>

      <template v-slot:item.actions="{ item }">
        <v-icon
          small
          class="mr-2"
          color="warning"
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          small
          color="error"
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import ModalConfirm from '@/components/ModalConfirm'
import { datetimeFormat } from '@/utils/string'
import { getCompanyEmployeesByCompanyId } from '@/api/companies'
import { deleteCompanyEmployee } from '@/api/companyEmployees'
import CompanyEmployeeForm from '@/components/forms/CompanyEmployeeForm'

export default {
  name: 'CompanyEmployees',
  components: { CompanyEmployeeForm, ModalConfirm },
  datetimeFormat,
  props: {
    company: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      isLoading: false,
      isModalDeleteActive: false,
      dialog: false,
      editedId: 0,
      search: '',
      headers: [
        {
          text: 'ID',
          align: 'start',
          value: 'id'
        },
        { text: this.$t('name'), value: 'name' },
        { text: this.$t('position'), value: 'position' },
        { text: this.$t('created-at'), sortable: false, value: 'created_at' },
        { text: this.$t('actions'), value: 'actions', sortable: false }
      ],
      employeeNameRules: [
        v => !!v || this.$t('validation.required')
      ],
      employeePositionRules: [
        v => !!v || this.$t('validation.required')
      ],
      items: []
    }
  },

  watch: {
    dialog (val) {
      val || this.modalClose()
    }
  },

  async created () {
    await this.fetch()
  },

  methods: {
    async fetch () {
      this.isLoading = true
      try {
        this.items = (await getCompanyEmployeesByCompanyId(this.company.id)).data
      } finally {
        this.isLoading = false
      }
    },

    editItem (item) {
      this.editedId = item.id
      this.dialog = true
    },

    deleteItem (item) {
      this.editedId = item.id
      this.isModalDeleteActive = true
    },

    async deleteItemConfirm (id) {
      this.resetEditedId()
      this.isLoading = true
      try {
        await deleteCompanyEmployee(id)
      } finally {
        await this.fetch()
        this.isLoading = false
      }
    },

    modalClose () {
      this.dialog = false
      this.resetEditedId()
    },

    modalOk () {
      this.fetch()
      this.modalClose()
    },

    resetEditedId () {
      this.editedId = 0
      this.isModalDeleteActive = false
    }
  }
}
</script>

<style scoped>

</style>
