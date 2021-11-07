<template>
  <div>
    <UserData
      v-if="user"
      :user="user"
      @updated="fetch"
    />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import UserData from '@/components/UserData'
import { findUser } from '@/api/users'

export default {
  name: 'User',
  components: { UserData },
  props: {
    id: {
      type: [Number, String],
      required: true
    }
  },

  data () {
    return {
      user: null
    }
  },

  created () {
    this.fetch()
  },

  methods: {
    ...mapActions({
      showLoadingOverlay: 'general/showLoadingOverlay',
      hideLoadingOverlay: 'general/hideLoadingOverlay'
    }),

    async fetch () {
      this.showLoadingOverlay()
      try {
        this.user = (await findUser(this.id)).data
      } finally {
        this.hideLoadingOverlay()
      }
    }
  }
}
</script>

<style scoped>

</style>
