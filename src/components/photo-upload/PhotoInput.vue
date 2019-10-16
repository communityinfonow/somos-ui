//TODO: handle multiple file upload for one location at a time. If multiple files have GPS data, get center of those coordinates
<template>
  <div>
    <input type="file" id="photo-select" v-on:change="fileSelected" />
    <button id="photo-select-btn" @click="clickHandler">Upload Image</button>
  </div>
</template>

<script>
export default {
  name: "PhotoInput",
  methods: {
    fileSelected(event) {
      var files = event.target.files;
      if (files.length) {
      }
    },
    clickHandler() {
      document.getElementById("photo-select").click();
    }
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