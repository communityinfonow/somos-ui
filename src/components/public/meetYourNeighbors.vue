<template>
  <div id="meet-your-neighbors">
    <v-container class="my-0 py-0">
      <div>
        <div style="height: 100px"></div>
      </div>
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

<style lang="scss">
#meet-your-neighbors {
  background-image: linear-gradient(
    90deg,
    $main-yellow,
    $main-yellow 50%,
    $main-light-blue 50%
  );
}
</style>