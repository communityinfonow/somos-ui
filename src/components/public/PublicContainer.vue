<template>
  <v-container>
    <div id="splash-back-positioning" class="back-positioning">
      <splash />
      <Angle
        id="meet-your-neighbors-topper"
        :empty="true"
        :colorLeft="yellow"
        :colorRight="secondaryBlue"
      ></Angle>
    </div>
    <MeetYourNeighbors />
    <Angle :empty="false" :colorLeft="yellow" :colorRight="secondaryBlue"></Angle>
  </v-container>
</template>

<script>
import Splash from "./splash/Splash";
import MeetYourNeighbors from "./MeetYourNeighbors";
import Angle from "./shared/Angle";
import globals from "../../globals";
// import communityCounterpart from "./communityCounterpart";
// import disparity from "./disparity";
// import explore from "./explore";
export default {
  name: "PublicContainer",
  components: {
    Splash,
    MeetYourNeighbors,
    Angle
  },
  data() {
    return { yellow: globals.yellow, secondaryBlue: globals.mainLightBlue };
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Bebas+Neue&display=swap");
@import url("https://fonts.googleapis.com/css?family=Montserrat&display=swap");

#meet-your-neighbors-topper {
  top: 33%;
  bottom: 0;
  position: absolute;
  width: 100%;
  z-index: 1;
}

#splash-back-positioning {
  position: relative;
  height: auto;
  bottom: 0;
}

@media (min-width: 1904px) {
  .container {
    max-width: 1185px !important;
  }
}
</style>
