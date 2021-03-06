<template>
  <div>
    <v-file-input
      accept="image/*"
      :label="translateText(inputLabel)"
      v-on:change="fileSelected"
      prepend-inner-icon="mdi-image"
      prepend-icon
      dense
      ref="fileInput"
      v-show="!loading"
      :error-messages="errorMessage"
      filled
    ></v-file-input>
    <v-progress-linear :active="loading" :value="progressValue" height="25" striped rounded>
      <strong>{{translateText(progressText)}}</strong>
    </v-progress-linear>
    <v-textarea
      :label="translateText(descriptionLabel)"
      name="name"
      :placeholder="translateText(descriptionPlaceholder)"
      textarea
      v-model="description"
      class="mt-10"
      v-show="!!photo && !loading"
      dense
      rows="2"
    ></v-textarea>
  </div>
</template>

<script>
import { store } from "../../../../store";
import PhotoData from "../../../../api/photo-data";
import { appLinks } from "../../../../mixins/app-links";
import translate from "@/mixins/translate";
export default {
  name: "PhotoInput",
  watch: {
    description: function(newDescription) {
      store.setPhotoDescription(newDescription);
    }
  },
  mixins: [appLinks, translate],
  methods: {
    reset() {
      this.photo = null;
      this.$refs.form.reset();
      store.setPhotoDescription(null);
    },
    fileSelected(file) {
      if (file != undefined) {
        this.photo = { file: file, location: null };
        this.savePhotoInformation(this.photo.file);
      }
    },
    progressMethod(event) {
      this.progressValue = Math.round((event.loaded / event.total) * 100);
    },
    clickHandler() {
      document.getElementById("photo-select").click();
    },
    savePhotoInformation(photo) {
      if (!photo.type.includes("image")) {
        this.errorMessage = "Please upload an image file type";
      } else if (photo.size > this.supportedMaxFileSize * 1048576) {
        // converts MB to bytes
        this.errorMessage =
          "Please limit image size to " + this.supportedMaxFileSize + "MB";
      } else {
        this.loading = true;
        PhotoData.savePhotoInformation(
          this.appLinks.photos.href,
          photo,
          this.progressMethod
        )
          .then(response => {
            store.setPhoto(response.data);
            this.getGPSMetadata(response.data._links["gps-coordinates"].href);
          })
          .catch(error => {
            this.errorMessage = error.message;
          })
          .finally(() => {
            this.loading = false;
          });
      }
    },
    getGPSMetadata(url) {
      PhotoData.getMetadata(url, coordinates => {
        store.setSelectedLocation({
          coordinates: { lat: coordinates.lat, lng: coordinates.lng }
        });

        this.photo.location = {
          coordinates: { lat: coordinates.lat, lng: coordinates.lng }
        };
      });
    }
  },
  data() {
    return {
      photo: null,
      loading: false,
      description: null,
      progressValue: 0,
      errorMessage: null,
      supportedFileTypes: ["jpeg, jpg, png", "tif", "tiff"],
      supportedMaxFileSize: 15,
      storeState: store.state,
      inputLabel: {
        en: "Upload Image",
        es: "Cargar imagen"
      },
      progressText: {
        en: "Uploading...",
        es: "Cargando"
      },
      descriptionLabel: {
        en: "Photo Description",
        es: "descripción de la foto"
      },
      descriptionPlaceholder: {
        en: "Please describe the contents of the photo (not required)",
        es: "Describa el contenido de la foto (no es obligatorio)"
      }
    };
  }
};
</script>

<style lang="scss" scoped>
input {
  display: none;
}
</style>