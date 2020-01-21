<template>
  <v-container>
    <Header />

    <splash id="splash" />

    <MeetYourNeighbors />
    <div class="angle-container hidden-xs-only">
      <Angle :empty="false" :colorLeft="yellow" :colorRight="secondaryBlue"></Angle>
    </div>
    <UserData />
    <Disparity />
    <MakeADifference />
  </v-container>
</template>

<script>
import Splash from "./splash/Splash";
import MeetYourNeighbors from "./meet-your-neighbor/MeetYourNeighbors";
import Angle from "./shared/Angle";
import globals from "../../globals";
import UserData from "./user-data/UserData";
import Disparity from "./Disparity";
import MakeADifference from "./MakeADifference";

import Header from "./Header";
export default {
  name: "PublicContainer",
  components: {
    Splash,
    MeetYourNeighbors,
    Angle,
    Header,
    UserData,
    Disparity,
    MakeADifference
  },
  data() {
    return { yellow: globals.yellow, secondaryBlue: globals.mainLightBlue };
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Bebas+Neue&display=swap");
@import url("https://fonts.googleapis.com/css?family=Montserrat:500,600,700,800,900&display=swap");

#splash {
  margin-bottom: 190px;
}

#mos {
  // top: -300px;
  left: 50%;
  width: 35%;
  position: absolute;
  z-index: 1;
}

@media (min-width: 1904px) {
  .container {
    max-width: 1185px !important;
  }
}

@media (max-width: 1264px) {
  #splash {
    margin-bottom: 71px;
  }
}
</style>
