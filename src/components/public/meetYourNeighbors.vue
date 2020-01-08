<template>
  <div id="meet-your-neighbors">
    <v-container class="my-0 py-0">
      <div class="angle-container">
        <Angle
          id="meet-your-neighbors-topper"
          :empty="true"
          :colorLeft="yellow"
          :colorRight="yellow"
          class="hidden-sm-and-up"
        ></Angle>
        <!-- <v-img class="hidden-xs-only" id="som" :src="require('./som.svg')"></v-img> -->
      </div>
      <div class="title">
        <h1>meet your neighbors</h1>
      </div>

      <v-row class="content">
        <v-col cols="12" sm="6"></v-col>
        <v-col cols="12" sm="6"></v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Angle from "./shared/Angle";
import globals from "../../globals";
export default {
  name: "MeetYourNeighbors",
  components: {
    Angle
  },
  data() {
    return {
      yellow: globals.yellow,
      secondaryBlue: globals.mainLightBlue
    };
  }
};
</script>

<style lang="scss" >
@media (min-width: 961px) {
  // #meet-your-neighbors {
  //   background-image: linear-gradient(
  //     90deg,
  //     $main-yellow,
  //     $main-yellow 50%,
  //     $main-light-blue 50%
  //   );
  // }
}

@media (max-width: 961px) {
  #meet-your-neighbors {
    background: $main-yellow;
  }
}

.title {
  position: relative;

  h1 {
    position: absolute;
    text-align: center;
    width: 100%;
    top: 30px;
    z-index: 1;
  }
}

#meet-your-neighbors-topper {
  // top: 280px;
  bottom: 0;
  position: absolute;
  width: 100%;
  z-index: 0;
}

.angle-container {
  position: relative;
  height: auto;
  bottom: 0;
}

.content {
  [class^="col"] {
    z-index: 0;
  }

  div:nth-child(1) {
    background: $main-yellow;
  }

  div:nth-child(2) {
    background: $main-light-blue;
  }
}
</style>