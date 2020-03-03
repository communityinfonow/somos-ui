<template>
  <section id="explore-data">
    <v-container>
      <ExploreDataScatterPlot
        :yData="lifeExpectancyData"
        :xData="selectedIndicatorData"
        :xAxisIndicator="selectedIndicator"
      />
      <v-menu offset-y>
        <template v-slot:activator="{on}">
          <v-btn block v-on="on" id="change-indicator">{{translateText(changeIndicatorText)}}</v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="indicator in indicators"
            :key="indicator.id"
            @click="setIndicator(indicator)"
          >
            <v-list-item-title class="indicator-item">{{indicator.name}}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-container>
  </section>
</template>

<script>
import ExploreDataMap from "./ExploreDataMap";
import ExploreDataScatterPlot from "./ExploreDataScatterPlot";
import translate from "@/mixins/translate";
import axios from "axios";
import appApi from "@/api/advanced-data.js";
export default {
  name: "ExploreData",
  components: {
    ExploreDataMap,
    ExploreDataScatterPlot
  },
  mixins: [translate],
  data() {
    return {
      lifeExpectancyData: null,
      selectedIndicatorData: null,
      selectedIndicator: null,
      links: null,
      indicators: null,
      changeIndicatorText: { en: "Change Indicator", es: "" }
    };
  },
  methods: {
    getLifeExpectancyData() {
      axios.get(this.links["life-expectancy-data"].href).then(response => {
        this.lifeExpectancyData = response.data;
      });
    },
    getIndicators() {
      axios.get(this.links["indicators"].href).then(response => {
        this.indicators = response.data._embedded.indicatorDtoes;
      });
    },
    setIndicator(indicator) {
      this.selectedIndicator = indicator;
    }
  },
  watch: {
    links() {
      this.getLifeExpectancyData();
      this.getIndicators();
    },
    selectedIndicator(indicator) {
      axios.get(indicator._links["data-by-indicator"].href).then(response => {
        this.selectedIndicatorData = response.data;
      });
    }
  },
  mounted() {
    appApi.getLinks(response => {
      this.links = response.data._links;
    });
  }
};
</script>

<style>
</style>