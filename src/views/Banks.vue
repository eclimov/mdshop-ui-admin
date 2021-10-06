<template>
  <v-card>
    <v-dialog
      v-model="dialogDelete"
      max-width="500px"
    >
      <v-card>
        <v-card-title class="text-h5">
          Are you sure you want to delete this item?
        </v-card-title>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="blue darken-1"
            text
            @click="closeDelete"
          >
            Cancel
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="deleteItemConfirm (editedIndex)"
          >
            OK
          </v-btn>
          <v-spacer />
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-card-title>
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
        {{ $options.dateFormat(item.created_at) }}
      </template>

      <template v-slot:item.actions="{ item }">
        <v-icon
          small
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>

import { deleteBank, getBanks } from '@/api/banks'
import { dateFormat } from '@/utils/string'

export default {
  name: 'Banks',
  dateFormat,
  components: {},

  data () {
    return {
      isLoading: false,
      dialogDelete: false,
      editedIndex: -1,
      search: '',
      headers: [
        {
          text: 'ID',
          align: 'start',
          value: 'id'
        },
        { text: 'Name', value: 'name' },
        { text: 'Created At', sortable: false, value: 'created_at' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      items: []
    }
  },

  watch: {
    dialogDelete (val) {
      val || this.closeDelete()
    }
  },

  async created () {
    await this.fetch()
  },

  methods: {
    async fetch () {
      this.isLoading = true
      try {
        this.items = (await getBanks()).data
      } finally {
        this.isLoading = false
      }
    },

    deleteItem (item) {
      this.editedIndex = item.id
      this.dialogDelete = true
    },

    async deleteItemConfirm (id) {
      this.closeDelete()
      this.isLoading = true
      try {
        await deleteBank(id)
      } finally {
        await this.fetch()
        this.isLoading = false
      }
    },

    closeDelete () {
      this.dialogDelete = false
      this.editedIndex = -1
    }
  }
}
</script>
