<template>
  <h1 id="splash-title">
    <span class="main-text">WE ARE&nbsp;</span>
    <span id="community">
      <CyclingText class="secondary-text" :textArray="communities" />
    </span>
  </h1>
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
        "Neighbors",
        "San Antonians",
        "Leaders",
        "United",
        "Problem Solvers",
        "Friends",
        "Strong",
        "Compassionate"
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
  height: 50px;
  overflow: hidden;
  position: relative;
  span {
    vertical-align: text-bottom;
  }
  text-transform: uppercase;
  margin-bottom: 20px;
}

#community {
  vertical-align: inherit;
  position: relative;
}

@media (max-width: 1264px) {
  #splash-title {
    font-size: 1.929rem;
    margin-bottom: 0;
  }
}

@media (min-width: 1265px) {
  #splash-title {
    font-size: 2.857rem;
  }
}
</style>