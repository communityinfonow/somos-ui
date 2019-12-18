<template>
  <div>
    <v-form ref="form">
      <v-file-input
        accept="image/*"
        label="Upload Image"
        v-on:change="fileSelected"
        prepend-icon="mdi-camera"
        ref="fileInput"
        v-show="!loading"
        :error-messages="errorMessage"
      ></v-file-input>
      <v-progress-linear :active="loading" :value="progressValue" height="25" striped rounded>
        <strong>Uploading...</strong>
      </v-progress-linear>
      <v-textarea
        label="Photo Description"
        name="name"
        placeholder="Please describe the contents of the photo"
        textarea
        v-model="description"
        class="mt-10"
      ></v-textarea>
    </v-form>
  </div>
</template>

<script>
import { store } from "../../store";
import PhotoData from "../../api/photo-data";
export default {
  name: "PhotoInput",
  props: ["eventBus"],
  watch: {
    description: function(newDescription) {
      store.setPhotoDescription(newDescription);
    }
  },
  methods: {
    reset() {
      this.photo = null;
      this.$refs.form.reset();
      store.setPhotoDescription(null);
    },
    fileSelected(file) {
      this.photo = { file: file, location: null };
      this.savePhotoInformation(this.photo.file);
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
        // convert MB to bytes
        this.errorMessage =
          "Please limit image size to " + this.supportedMaxFileSize + "MB";
      } else {
        this.loading = true;
        PhotoData.savePhotoInformation(
          this.storeState.photo,
          photo,
          this.progressMethod
        )
          .then(response => {
            store.setPhoto(response.data);
            this.getGPSMetadata(response.data._links["gps-coordinates"].href);
          })
          .catch(error => {
            this.errorMessage = error;
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
      storeState: store.state
    };
  },
  created() {
    this.eventBus.$on("reset", this.reset);
  }
};
</script>

<style lang="scss" scoped>
input {
  display: none;
}
</style>