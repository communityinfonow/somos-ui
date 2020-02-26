<template>
  <h1 id="splash-title">
    <span class="main-text">{{translateText(mainText)}}&nbsp</span>
    <span id="community" v-if="$vuetify.breakpoint.mdAndUp">
      <CyclingText class="secondary-text" :textArray="translateText(communities)" />
    </span>
    <span id="community-container" v-if="$vuetify.breakpoint.smAndDown">
      <span id="community">
        <CyclingText class="secondary-text" :textArray="translateText(communities)" />
      </span>
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
        es: [
          "vecinos",
          "San Antonians",
          "Líderes",
          "Unidos",
          "Solidarios",
          "Amigos",
          "Fuertes",
          "Compasivos"
        ]
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
@media (min-width: 960px) {
  #splash-title {
    height: 50px;
    overflow: hidden;
    position: relative;
  }
}

#splash-title {
  text-align: left;

  span {
    vertical-align: text-bottom;
  }
  text-transform: uppercase;
  margin-bottom: 20px;
}

#community-container {
  height: 50px;
  overflow: hidden;
  width: 100%;
  display: block;
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