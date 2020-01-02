<template>
  <div id="public-container">
    <v-container>
      <PhotoUpload />
    </v-container>
  </div>
</template>

<script>
import PhotoUpload from "./shared/photo-upload/PhotoUpload";

export default {
  name: "PublicContainer",
  components: {
    PhotoUpload
  },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Bebas+Neue&display=swap");
@import url("https://fonts.googleapis.com/css?family=Montserrat:400,500,700&display=swap");

#public-container {
  background-image: linear-gradient(
    90deg,
    $main-light-blue,
    $main-light-blue 50%,
    $main-dark-blue 50%
  );
  height: 100%;
}

@media (min-width: 1904px) {
  .container {
    max-width: 1185px !important;
  }
}

html {
  overflow-y: hidden;
}
</style>
