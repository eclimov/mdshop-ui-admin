<template>
  <v-card>
    <v-card-title>
      <v-dialog
        v-model="dialog"
        max-width="500px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="primary"
            dark
            large
            icon
            v-bind="attrs"
            class="mr-2"
            title="Edit Item"
            v-on="on"
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="text-h5">Edit Item</span>
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
              @click="closeDialog"
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
      <ModalConfirm
        v-if="isModalDeleteActive"
        @cancel="isModalDeleteActive = false"
        @confirm="deleteItem"
      />
      <v-btn
        color="error"
        dark
        large
        icon
        class="mr-2"
        title="Delete Item"
        @click="isModalDeleteActive = true"
      >
        <v-icon>mdi-delete</v-icon>
      </v-btn>
      <h1>{{ user.email }}</h1>
    </v-card-title>

    <v-card-subtitle>Created At: {{ $options.dateFormat(user.created_at) }}</v-card-subtitle>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { dateFormat } from '@/utils/string'
import ModalConfirm from '@/components/ModalConfirm'
import UserForm from '@/components/forms/UserForm'
import { deleteUser, updateUser } from '@/api/users'

export default {
  name: 'UserData',
  components: { UserForm, ModalConfirm },
  dateFormat,
  props: {
    user: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      isLoading: false,
      editedItem: null,
      isModalDeleteActive: false,
      dialog: false
    }
  },

  computed: {
    ...mapGetters({
      userEmail: 'user/email'
    })
  },

  created () {
    this.resetForm()
  },

  methods: {
    ...mapActions({
      userLogout: 'user/logout',
      showLoadingOverlay: 'general/showLoadingOverlay',
      hideLoadingOverlay: 'general/hideLoadingOverlay'
    }),
    closeDialog () {
      this.dialog = false
      this.resetForm()
    },
    resetForm () {
      this.editedItem = { ...this.user }
    },
    async deleteItem () {
      this.isModalDeleteActive = false
      this.showLoadingOverlay()
      try {
        await deleteUser(this.user.id)
        await this.$router.push({ name: 'users' })
      } finally {
        this.hideLoadingOverlay()
      }
    },
    async save () {
      const editedItem = this.editedItem // Prevent the value from resetting
      this.closeDialog()
      this.showLoadingOverlay()
      try {
        await updateUser(this.user.id, editedItem)
        if (this.editedItem.email === this.userEmail) {
          await this.userLogout()
          await this.$router.push({ name: 'home' })
        }

        this.editedItem = { ...editedItem } // Assign the value to form after successful update
      } finally {
        this.hideLoadingOverlay()
        this.$emit('updated')
      }
    }
  }
}
</script>

<style scoped>

</style>
