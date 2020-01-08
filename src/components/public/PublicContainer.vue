<template>
  <v-container>
    <Header />

    <splash id="splash" />

    <MeetYourNeighbors />
    <div class="angle-container hidden-xs-only">
      <Angle :empty="false" :colorLeft="yellow" :colorRight="secondaryBlue"></Angle>
      <v-img id="mos" :src="require('./Mos.svg')"></v-img>
    </div>
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
import Header from "./Header";
export default {
  name: "PublicContainer",
  components: {
    Splash,
    MeetYourNeighbors,
    Angle,
    Header
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

#splash {
  margin-bottom: 190px;
}

#mos {
  // top: -300px;
  left: 50%;
  width: 35%;
  position: absolute;
}

@media (min-width: 1904px) {
  .container {
    max-width: 1185px !important;
  }
}

@media (max-width: 1264px) {
  #splash {
    margin-bottom: 41px;
  }
}
</style>
