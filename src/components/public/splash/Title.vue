<template>
  <div id="splash-title" class="mb-9">
    <span class="main-text">WE ARE&nbsp;</span>
    <CyclingText class="secondary-text" id="community" :textArray="communities" />
  </div>
</template>

<script>
import CyclingText from "../../shared/CyclingText";
export default {
  name: "Title",
  components: {
    CyclingText
  },
  data() {
    return {
      communities: [
        "NEIGHBORS",
        "SAN ANTONIANS",
        "LEADERS",
        "MOTHERS",
        "FATHERS",
        "TEACHERS",
        "STUDENTS",
        "SONS",
        "DAUGHTERS",
        "UNITED",
        "CREATIVE THINKERS",
        "PROBLEM SOLVERS",
        "FRIENDS",
        "LOVERS",
        "STRONG"
      ],
      currentCommunity: null,
      show: true
    };
  }
};
</script>

<style lang="scss" scoped>
#splash-title {
  text-align: left;
  font: Bold 40px Bebas Neue;
  letter-spacing: 8px;
  text-transform: uppercase;
  opacity: 1;
  font-family: "Bebas Neue";
  height: 50px;
  overflow-y: hidden;
  position: relative;
  span {
    vertical-align: text-bottom;
  }
}

#community {
  // position: absolute;
  left: 150px;

  // top: 0;

  // display: inline-block;
}
</style>