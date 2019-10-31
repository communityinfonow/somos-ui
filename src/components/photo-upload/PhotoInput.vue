//TODO: handle multiple file upload for multiple location at a time. If multiple files have GPS data, we'll need a way to confirm coordinates and census tract for each one.
<template>
  <div>
    <v-file-input
      multiple
      accept="image/*"
      label="Upload Image(s)"
      v-on:change="fileSelected"
      prepend-icon="mdi-camera"
      :loading="loading"
    ></v-file-input>
  </div>
</template>

<script>
import { store } from "../../store";
import PhotoData from "../../api/photo-data";
export default {
  name: "PhotoInput",
  methods: {
    fileSelected(event) {
      this.photos = event.map(file => {
        return { file: file, location: null };
      });
      this.savePhotoInformation(this.photos.map(photo => photo.file));
      store.setPhotos(this.photos);
    },
    clickHandler() {
      document.getElementById("photo-select").click();
    },
    savePhotoInformation(photos) {
      let self = this;
      this.loading = true;
      PhotoData.savePhotos(photos, data => {
        this.loading = false;
        data.forEach(photo => {
          this.getGPSMetadata(
            photo.links.find(link => link.rel === "gps-coordinates").href
          );
        });
      });
    },
    getGPSMetadata(url) {
      //TODO: append indexes to end of file names to make them unique within this context?
      PhotoData.getMetadata(url, coordinates => {
        this.photos.forEach(photo => {
          photo.location = coordinates;
        });
      });
    },
    updateFiles() {}
  },
  data() {
    return {
      photos: [],
      loading: false
    };
  }
};
</script>

<style lang="scss" scoped>
input {
  display: none;
}
</style>

// TODO: load image into input
// TODO: load GPS data (from server  ) from image and place in store state (for finding containing census tract)
