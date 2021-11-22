<template>
  <v-card>
    <ModalConfirm
      v-if="isModalDeleteActive"
      @cancel="resetEditedId"
      @confirm="deleteItemConfirm(editedId)"
    />

    <v-card-title>Bank Affiliates</v-card-title>

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
            title="New Item"
            v-on="on"
          >
            <span class="material-icons">
              add_box
            </span>
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="text-h5">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-row>
                <v-col
                  cols="12"
                >
                  <v-text-field
                    v-model="editedItem.affiliateNumber"
                    autofocus
                    label="Affiliate Number"
                  />
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer />
            <v-btn
              color="blue darken-1"
              text
              @click="close"
            >
              Cancel
            </v-btn>
            <v-btn
              color="blue darken-1"
              text
              @click="save"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
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
      loading-text="Loading... Please wait"
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
import { createBankAffiliate, deleteBankAffiliate, getBankAffiliatesByBankId, updateBankAffiliate } from '@/api/bankAffiliates'
import { datetimeFormat } from '@/utils/string'
import { getBankAffiliateObject } from '@/utils/forms'

export default {
  name: 'BankAffiliates',
  components: { ModalConfirm },
  datetimeFormat,
  props: {
    bank: {
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
        { text: 'Affiliate Number', value: 'affiliateNumber' },
        { text: 'Created At', sortable: false, value: 'created_at' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      items: [],
      editedItem: getBankAffiliateObject(this.bank.id),
      defaultItem: getBankAffiliateObject(this.bank.id)
    }
  },

  computed: {
    formTitle () {
      return this.editedId ? 'Edit Item' : 'New Item'
    }
  },

  watch: {
    dialog (val) {
      val || this.close()
    }
  },

  async created () {
    await this.fetch()
  },

  methods: {
    async fetch () {
      this.isLoading = true
      try {
        this.items = (await getBankAffiliatesByBankId(this.bank.id)).data
      } finally {
        this.isLoading = false
      }
    },

    async save () {
      const editedId = this.editedId
      const editedItem = this.editedItem

      this.close()

      try {
        this.isLoading = true
        if (editedId) {
          await updateBankAffiliate(editedId, editedItem)
        } else {
          await createBankAffiliate(editedItem)
        }
      } finally {
        await this.fetch()
        this.isLoading = false
      }
    },

    editItem (item) {
      this.editedId = item.id
      this.editedItem = Object.assign({}, item)
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
        await deleteBankAffiliate(id)
      } finally {
        await this.fetch()
        this.isLoading = false
      }
    },

    close () {
      this.dialog = false
      this.editedItem = Object.assign({}, this.defaultItem)
      this.resetEditedId()
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
