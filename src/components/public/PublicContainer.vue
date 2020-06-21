<template>
  <div>
    <Header />

    <v-container>
      <splash id="splash" />
      <Angle :empty="true" :colorLeft="yellow" :colorRight="yellow" class="hidden-sm-and-up"></Angle>
      <MeetYourNeighbors />
      <Angle class="hidden-sm-and-up" empty :colorLeft="secondaryBlue" :colorRight="secondaryBlue"></Angle>
      <div class="angle-container hidden-xs-only">
        <Angle :empty="false" :colorLeft="yellow" :colorRight="secondaryBlue"></Angle>
      </div>
      <UserData />
      <Angle :colorLeft="secondaryBlue" :colorRight="darkBlue" empty="false" />
      <CloseTheGap />
      <div id="footer-grouping">
        <Angle :colorLeft="secondaryBlue" :colorRight="darkBlue" />
        <Footer />
      </div>
    </v-container>
  </div>
</template>

<script>
import Splash from "./splash/Splash";
import MeetYourNeighbors from "./meet-your-neighbor/MeetYourNeighbors";
import Angle from "./shared/Angle";
import globals from "../../globals";
import UserData from "./user-data/UserData";
import CloseTheGap from "./close-the-gap/CloseTheGap";
import Footer from "./Footer";

import Header from "./Header";
export default {
  name: "PublicContainer",
  components: {
    Splash,
    MeetYourNeighbors,
    Angle,
    Header,
    UserData,
    CloseTheGap,
    Footer
  },
  data() {
    return {
      yellow: globals.yellow,
      darkBlue: globals.mainDarkBlue,
      secondaryBlue: globals.mainLightBlue
    };
  },
  methods: {}
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Bebas+Neue&display=swap");
@import url("https://fonts.googleapis.com/css?family=Montserrat:500,600,700,800,900&display=swap");

#splash {
  margin-bottom: 190px;
}

#footer-grouping {
  position: relative;
}

#mos {
  left: 50%;
}

#som,
#mos {
  width: 35%;
  position: absolute;
  z-index: 100;
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

  #som,
  #mos {
    width: 43%;
  }
}
</style>
