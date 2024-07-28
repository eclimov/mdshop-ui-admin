<template>
  <v-container>
    <v-row>
      <v-col cols="10">
        <span title="Logo">
          <v-file-input
            v-model="image"
            accept="image/jpeg"
            class="input"
            dense
            hint="jpg, 150x100"
            label="Logo"
            outlined
            prepend-icon="mdi-file-image"
            type="file"
            @change="onFileChange"
          />
        </span>
      </v-col>
      <v-col cols="2">
        <v-btn
          class="mr-2"
          color="primary"
          :disabled="!image"
          icon
          large
          :loading="isLoading"
          title="Upload"
          @click="upload"
        >
          <v-icon>mdi-upload</v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <v-row class="mt-0">
      <v-col
        class="pt-0"
        cols="12"
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

<!--TODO: implement or remove this component-->
<script>

import { uploadLogo } from '@/api/companies.js'
import { getCompanyLogoUrl } from '@/utils/files.js'

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
