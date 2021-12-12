<template>
  <v-card>
    <ModalConfirm
      v-if="isModalDeleteActive"
      @cancel="resetEditedId"
      @confirm="deleteItemConfirm(editedId)"
    />

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
        <v-card>
          <v-card-title>
            <span class="text-h5">{{ $t('new-item') }}</span>
          </v-card-title>

          <v-card-text>
            <UserForm
              :key="editedItem.id"
              v-model="editedItem"
            />
          </v-card-text>

          <v-card-actions>
            <v-spacer />
            <v-btn
              color="blue darken-1"
              text
              @click="close"
            >
              {{ $t('cancel') }}
            </v-btn>
            <v-btn
              color="blue darken-1"
              text
              @click="save"
            >
              {{ $t('save') }}
            </v-btn>
          </v-card-actions>
        </v-card>
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
      <template v-slot:item.email="{ item }">
        <router-link :to="{ name: 'user', params: { id: item.id } }">
          {{ item.email }}
        </router-link>
      </template>

      <template v-slot:item.created_at="{ item }">
        {{ $options.datetimeFormat(item.created_at) }}
      </template>

      <template v-slot:item.actions="{ item }">
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

import { datetimeFormat } from '@/utils/string'
import ModalConfirm from '@/components/ModalConfirm'
import { getUserObject } from '@/utils/forms'
import UserForm from '@/components/forms/UserForm'
import { createUser, deleteUser, getUsers } from '@/api/users'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Users',
  datetimeFormat,
  components: { UserForm, ModalConfirm },

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
        { text: 'Email', value: 'email' },
        { text: this.$t('created-at'), sortable: false, value: 'created_at' },
        { text: this.$t('actions'), value: 'actions', sortable: false }
      ],
      items: [],
      editedItem: getUserObject()
    }
  },

  computed: {
    ...mapGetters({
      userEmail: 'user/email'
    })
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
    ...mapActions({
      userLogout: 'user/logout'
    }),

    async fetch () {
      this.isLoading = true
      try {
        this.items = (await getUsers()).data
      } finally {
        this.isLoading = false
      }
    },

    async save () {
      const editedItem = this.editedItem

      this.close()

      try {
        this.isLoading = true
        await createUser(editedItem)
      } finally {
        await this.fetch()
        this.isLoading = false
      }
    },

    deleteItem (item) {
      this.editedId = item.id
      this.isModalDeleteActive = true
    },

    async deleteItemConfirm (id) {
      this.resetEditedId()
      this.isLoading = true
      try {
        await deleteUser(id)
      } finally {
        await this.fetch()
        this.isLoading = false
      }
    },

    close () {
      this.dialog = false
      this.editedItem = getUserObject()
      this.resetEditedId()
    },

    resetEditedId () {
      this.editedId = 0
      this.isModalDeleteActive = false
    }
  }
}
</script>
