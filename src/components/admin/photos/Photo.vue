<template></template>

<script>
import PhotoEdit from "./PhotoEdit";
import PhotoThumbnail from "./PhotoThumbnail";
import PhotoData from "../../../api/photo-data";
export default {
  name: "Photo",
  data() {
    return { notAcceptedPhotos: [] };
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