<template>
  <div id="meet-your-neighbors">
    <Angle :empty="true" :colorLeft="yellow" :colorRight="secondaryBlue"></Angle>
    <div style="height: 100px" class="content"></div>
    <Angle :empty="false" :colorLeft="yellow" :colorRight="secondaryBlue"></Angle>
  </div>
</template>

<script>
import Angle from "./shared/Angle";
import globals from "../../globals";
export default {
  name: "meetYourNeighbors",
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
#meet-your-neighbors .content {
  background-image: linear-gradient(
    90deg,
    $main-yellow,
    $main-yellow 50%,
    $main-light-blue 50%
  );
}
</style>