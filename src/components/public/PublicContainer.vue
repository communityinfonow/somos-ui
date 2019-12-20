<template>
  <v-container>
    <splash />
  </v-container>
</template>

<script>
import Splash from "./splash/Splash";
// import meetYourNeighbors from "./meetYourNeighbors";
// import communityCounterpart from "./communityCounterpart";
// import disparity from "./disparity";
// import explore from "./explore";
export default {
  name: "PublicContainer",
  components: {
    Splash
  },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Bebas+Neue&display=swap");
@import url("https://fonts.googleapis.com/css?family=Montserrat&display=swap");

@media (min-width: 1904px) {
  .container {
    max-width: 1185px !important;
  }
}
</style>
