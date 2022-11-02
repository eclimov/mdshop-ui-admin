<template>
  <v-container>
    <v-row>
      <v-col cols="10">
        <span title="Logo">
          <v-file-input
            v-model="image"
            type="file"
            class="input"
            label="Logo"
            hint="jpg, 150x100"
            accept="image/jpeg"
            outlined
            dense
            prepend-icon="mdi-file-image"
            @change="onFileChange"
          />
        </span>
      </v-col>
      <v-col cols="2">
        <v-btn
          color="primary"
          large
          icon
          :disabled="!image"
          :loading="isLoading"
          class="mr-2"
          title="Upload"
          @click="upload"
        >
          <v-icon>mdi-upload</v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <v-row class="mt-0">
      <v-col
        cols="12"
        class="pt-0"
      >
        <v-img
          class="mx-auto"
          :src="`${imageUrl}`"
          style="border: 1px dashed #ccc; width: 150px; height: 100px"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import { uploadLogo } from '../../api/companies'
import { getCompanyLogoUrl } from '../../utils/files'

export default {
  name: 'CompanyLogoUploadForm',

  props: {
    companyId: {
      type: Number,
      required: true
    },
    fileName: {
      type: String,
      default: null
    }
  },

  data () {
    return {
      image: undefined,
      // to save image url
      imageUrl: '',
      isLoading: false
    }
  },

  created () {
    this.setLogoImageUrl(this.fileName)
  },

  methods: {
    setLogoImageUrl (logo) {
      if (logo) {
        this.imageUrl = getCompanyLogoUrl(logo)
      }
    },

    createImage (file) {
      const reader = new FileReader()

      reader.onload = (e) => {
        this.imageUrl = e.target.result
      }
      reader.readAsDataURL(file)
    },
    onFileChange (file) {
      if (!file) {
        return
      }
      this.createImage(file)
    },

    // https://stackoverflow.com/questions/57773556/file-upload-using-vuetify-2-v-file-input-and-axios
    async upload () {
      this.isLoading = true

      try {
        const formData = new FormData()
        formData.append('file', this.image, this.image.name)
        const companyData = await uploadLogo(this.companyId, formData)
        this.setLogoImageUrl(companyData.data.logo)
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>

<style scoped>

</style>
