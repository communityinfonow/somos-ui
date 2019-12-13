<template>
  <div>
    <v-form ref="form">
      <v-file-input
        accept="image/*"
        label="Upload Image"
        v-on:change="fileSelected"
        prepend-icon="mdi-camera"
        ref="fileInput"
      ></v-file-input>
      <v-progress-linear :active="loading" :value="progressValue"></v-progress-linear>
      <v-textarea
        label="Description of photo"
        name="name"
        placeholder="Please describe the contents of the photo"
        textarea
        v-model="description"
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
      console.log(this.$refs.fileInput);
    },
    clickHandler() {
      document.getElementById("photo-select").click();
    },
    savePhotoInformation(photo) {
      this.loading = true;
      PhotoData.savePhotoInformation(photo, this.progressMethod, data => {
        store.setPhoto(data);
        this.loading = false;
        this.getGPSMetadata(data._links["gps-coordinates"].href);
      });
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
      progressValue: 0
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