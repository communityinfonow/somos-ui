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
    },
    clickHandler() {
      document.getElementById("photo-select").click();
    },
    savePhotoInformation(photos) {
      this.loading = true;
      PhotoData.savePhotoInformation(photos, data => {
        store.setPhotos(data);
        this.loading = false;
        data.forEach(photo => {
          this.getGPSMetadata(photo._links["gps-coordinates"].href);
        });
      });
    },
    getGPSMetadata(url) {
      PhotoData.getMetadata(url, coordinates => {
        store.setSelectedLocation({
          coordinates: { lat: coordinates.lat, lng: coordinates.lng }
        });
        this.photos.forEach(photo => {
          photo.location = {
            coordinates: { lat: coordinates.lat, lng: coordinates.lng }
          };
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