<template>
  <div id="life-expectancy">
    <h1>you are also very different.</h1>
    <DataDisplay title="average life expectancy">
      <DataBarGrouping
        :matchData="matchData"
        :neighborhoodData="neighborhoodData"
        :tooltip="indicator.description"
      />
    </DataDisplay>
    <ul id="life-expectancy-difference">
      <li id="value">{{difference}}</li>
      <li>year difference.</li>
      <li>that's a big gap!</li>
    </ul>
    <img :src="require('./circle.svg')" />
  </div>
</template>

<script>
import DataDisplay from "./DataDisplay";
import DataBarGrouping from "@/components/public/shared/data-bar/DataBarGrouping";
import axios from "axios";
export default {
  name: "LifeExpectancy",
  data() {
    return {
      neighborhoodData: null,
      matchData: null
    };
  },
  components: {
    DataDisplay,
    DataBarGrouping
  },
  props: {
    indicator: Object,
    difference: Number
  },
  methods: {
    getData(indicator) {
      if (indicator && indicator._links) {
        axios
          .get(indicator._links["parent-life-expectancy"].href)
          .then(response => {
            this.neighborhoodData = response.data;
          });

        axios
          .get(indicator._links["child-life-expectancy"].href)
          .then(response => {
            this.matchData = response.data;
          });
      }
    }
  },
  watch: {
    indicator(newIndicator) {
      this.getData(newIndicator);
    }
  },
  mounted() {
    this.getData(this.indicator);
  }
};
</script>

<style lang="scss" scoped>
@media (max-width: 600px) {
}

@media (max-width: 960px) {
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
  animation-timing-function: ease-in;
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