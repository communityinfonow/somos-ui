<template>
  <PhotoThumbnail :photoObj="photoObj"></PhotoThumbnail>
</template>

<script>
import PhotoEdit from "./PhotoEdit";
import PhotoThumbnail from "./PhotoThumbnail";
export default {
  name: "Photo",
  data() {
    return {};
  },
  props: ["photoObj"],
  components: {
    PhotoEdit,
    PhotoThumbnail
  }
};
</script>

<style>
</style>