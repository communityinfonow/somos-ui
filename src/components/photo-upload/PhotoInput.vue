//TODO: handle multiple file upload for multiple location at a time. If multiple files have GPS data, we'll need a way to confirm coordinates and census tract for each one.
<template>
  <div>
    <input type="file" id="photo-select" v-on:change="fileSelected" />
    <button id="photo-select-btn" @click="clickHandler">Upload Image</button>
  </div>
</template>

<script>
import { store } from "../../store";
import PhotoData from "../../api/photo-data";
export default {
  name: "PhotoInput",
  methods: {
    fileSelected(event) {
      var photos = event.target.files.map(file => {
        return { file: file, location: null };
      });
      if (files.length) {
        store.setPhotos(photos);
      }
    },
    clickHandler() {
      document.getElementById("photo-select").click();
    },
    getGPSMetadata() {
      //TODO: append indexes to end of file names to make them unique within this context?
      photoData.getMetadata(this.photos.map(photo => photo.file), data => {
        photos.forEach(photo => {
          data.forEach(response => {
            if (response.fileName === photo.file.name) {
              photo.location = response.location;
            }
          });
        });
      });
    },
    updateFiles() {}
  },
  data() {
    return {
      photos: []
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
// TODO: load image into store state (if possible) for future handling