<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useUser } from '@/stores/user'
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useLoader } from '@/stores/loader'
const loaderStore = useLoader()

const router = useRouter()
const userStore = useUser()
const { t } = useI18n()

const valid = ref(true)
const isPasswordValueShown = ref(false)
const form = reactive({
  email: '',
  password: ''
})
const emailRules = reactive([
  (v: string) => !!v || t('validation.required'),
  (v: string) => /.+@.+\..+/.test(v) || t('validation.invalid')
])
const passwordRules = reactive([
  (v: string) => !!v || t('validation.required')
])

async function submit () {
  try {
    loaderStore.isActive = true
    await userStore.login(form)
    await router.push({ name: 'home' })
  } catch (e) {
    // TODO: handle error
  } finally {
    loaderStore.isActive = false
  }
}
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="6">
        <v-form
          v-model="valid"
          validate-on="input lazy"
          @submit.prevent="submit"
        >
          <v-text-field
            v-model="form.email"
            autofocus
            label="Email"
            :rules="emailRules"
            variant="underlined"
          />

          <v-text-field
            v-model="form.password"
            :append-inner-icon="isPasswordValueShown ? 'mdi-eye-off' : 'mdi-eye'"
            counter
            :label="$t('password')"
            :rules="passwordRules"
            :type="isPasswordValueShown ? 'text' : 'password'"
            variant="underlined"
            @click:append-inner="isPasswordValueShown = !isPasswordValueShown"
          />

          <v-btn
            class="mr-4"
            color="success"
            :disabled="!valid"
            type="submit"
          >
            {{ $t('submit') }}
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>
