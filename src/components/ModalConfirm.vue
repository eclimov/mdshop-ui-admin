<script setup lang="ts">
import { ref, watch } from 'vue'

defineProps<{
  objectValue: string;
}>()

const emit = defineEmits(['cancel', 'confirm'])

const status = ref(true)

function cancel () {
  emit('cancel')
}

function confirm () {
  emit('confirm')
}

watch(status, (newVal) => {
  if (!newVal) {
    cancel()
  }
})
</script>

<template>
  <v-dialog
    v-model="status"
    max-width="500px"
  >
    <v-card>
      <v-card-title class="text-h5 text-center">
        <div id="confirmation_text">
          {{ $t('modal-confirm.delete-confirmation') }}
        </div>
      </v-card-title>
      <v-card-subtitle class="text-center">
        {{ objectValue }}
      </v-card-subtitle>
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="blue darken-1"
          @click="cancel"
        >
          {{ $t('cancel') }}
        </v-btn>
        <v-btn
          color="blue darken-1"
          @click="confirm"
        >
          OK
        </v-btn>
        <v-spacer />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
