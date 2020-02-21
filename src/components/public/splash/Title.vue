<template>
  <h1 id="splash-title">
    <span class="main-text">{{translateText(mainText)}}&nbsp</span>
    <span id="community">
      <CyclingText class="secondary-text" :textArray="translateText(communities)" />
    </span>
  </h1>
</template>

<script>
import CyclingText from "../../shared/CyclingText";
import translate from "@/mixins/translate";
export default {
  name: "Title",
  components: {
    CyclingText
  },
  data() {
    return {
      communities: {
        en: [
          "Neighbors",
          "San Antonians",
          "Leaders",
          "United",
          "Problem Solvers",
          "Friends",
          "Strong",
          "Compassionate"
        ],
        es: ["vecinos"]
      },
      mainText: {
        en: "we are",
        es: "somos"
      },
      currentCommunity: null,
      show: true
    };
  },

  mixins: [translate]
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