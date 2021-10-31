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
          <v-text-field
            v-model="form.email"
            :rules="emailRules"
            label="Email"
            autofocus
            required
          />

          <v-text-field
            v-model="form.password"
            :rules="passwordRules"
            label="Password"
            :append-icon="isPasswordValueShown ? 'mdi-eye-off' : 'mdi-eye'"
            :type="isPasswordValueShown ? 'text' : 'password'"
            required
            counter
            @click:append="isPasswordValueShown = !isPasswordValueShown"
          />

          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            type="submit"
          >
            Submit
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import { mapActions } from 'vuex'

export default {
  name: 'Login',
  components: {},

  data () {
    return {
      valid: true,
      isPasswordValueShown: false,
      form: {
        email: '',
        password: ''
      },
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ],
      passwordRules: [
        v => !!v || 'Password is required'
      ],
      select: null
    }
  },
  methods: {
    ...mapActions({
      login: 'user/login',
      showLoadingOverlay: 'general/showLoadingOverlay',
      hideLoadingOverlay: 'general/hideLoadingOverlay'
    }),

    async submit () {
      if (this.$refs.form.validate()) {
        this.showLoadingOverlay()
        try {
          await this.login(this.form)
          await this.$router.push({ name: 'home' })
        } finally {
          this.hideLoadingOverlay()
        }
      }
    }
  }
}
</script>
