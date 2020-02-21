<template>
  <div id="life-expectancy" :class="{placeholder: placeholder}">
    <h1
      :style="{height: placeholder ? '60px' : unset}"
    >{{placeholder ? "" : translateText(differenceTitle)}}</h1>

    <DataDisplay :title="translateText(lifeExpectancyTitle)">
      <DataBarGrouping
        :matchData="matchData"
        :neighborhoodData="neighborhoodData"
        :tooltip="indicator ? indicator.description : ''"
        :placeholder="placeholder"
      />
    </DataDisplay>

    <ul id="life-expectancy-difference">
      <li id="value">{{placeholder ? "?" : difference}}</li>
      <li>{{translateText(yearsDifference)}}</li>
      <li v-if="!placeholder">{{translateText(bigGap)}}</li>
    </ul>
    <img :src="require('./circle.svg')" />
    <p v-if="placeholder" id="no-data-placeholder-text">{{translateText(placeholderText)}}</p>
  </div>
</template>

<script>
import DataDisplay from "./DataDisplay";
import DataBarGrouping from "@/components/public/shared/data-bar/DataBarGrouping";
import axios from "axios";
import { userDataStore } from "../userDataStore";
import translate from "@/mixins/translate";
export default {
  name: "LifeExpectancy",
  data() {
    return {
      storeState: userDataStore.state,
      differenceTitle: {
        en: "you are also very different.",
        es: ""
      },
      lifeExpectancyTitle: {
        en: "average life expectancy",
        es: ""
      },
      yearsDifference: {
        en: "year difference.",
        es: ""
      },
      bigGap: {
        en: "that's a big gap!",
        es: ""
      },
      placeholderText: {
        en: "Don't see a number? Help us find your neighborhood above",
        es: ""
      }
    };
  },
  mixins: [translate],
  components: {
    DataDisplay,
    DataBarGrouping
  },
  props: {
    indicator: Object,
    difference: Number,
    placeholder: Boolean
  },
  computed: {
    neighborhoodData() {
      return this.storeState.neighborhoodData;
    },
    matchData() {
      return this.storeState.matchData;
    }
  }
};
</script>

<style lang="scss" scoped>
.placeholder * {
  color: #8a8a8a;
}
#no-data-placeholder-text {
  position: absolute;
  top: 50%;
  width: 100%;
  font-size: 35px;
  color: white;
  background: #162d54a6;
  font-weight: 100;
  padding: 20px;
  font-family: Bebas Neue;
  border-radius: 10px;
}

@media (max-width: 1264px) {
  #life-expectancy {
    margin-bottom: 55px;
  }

  #life-expectancy-difference {
    margin-top: -37px;
  }
}

@media (min-width: 1265px) {
  #life-expectancy {
    margin-bottom: 150px;
  }

  #life-expectancy-difference {
    margin-top: 0px;
  }
}

h1 {
  position: relative;
  z-index: 2;
}

#life-expectancy {
  margin-top: 100px;

  ul {
    list-style: none;
    padding-left: 0;
  }

  .data-display {
    margin-bottom: 0;
  }
}

#life-expectancy,
.data-display {
  position: relative;
  z-index: 2;
}

h2 {
  font: 20px/28px Montserrat;
  letter-spacing: 2px;
  color: #162d54;
  text-transform: uppercase;
  font-weight: 900;
}

img {
  width: 50%;
  position: absolute;
  top: -55px;
  z-index: 0;
  left: 25%;

  animation-name: spin;
  animation-duration: 40000ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

@media (max-width: 600px) {
  img {
    width: 100%;
    top: 121px;
    left: 0%;
  }
}

#life-expectancy-difference {
  color: $main-dark-blue;
  text-align: center;
  text-transform: uppercase;
  font-family: "Montserrat";
  font-weight: 800;
  position: relative;
  z-index: 2;

  #value {
    letter-spacing: 4px;
    font-size: 5.857rem;
    line-height: 1.2;
  }

  li:nth-child(2) {
    font-size: 1.3rem;
  }

  li:nth-child(3) {
    font-size: 1rem;
    line-height: 2;
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>