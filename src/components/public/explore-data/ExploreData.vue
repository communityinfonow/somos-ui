<template>
  <section id="explore-data">
    <ExploreDataScatterPlot :yData="lifeExpectancyData" :xData="selecteIndicatorData" />
  </section>
</template>

<script>
import ExploreDataMap from "./ExploreDataMap";
import ExploreDataScatterPlot from "./ExploreDataScatterPlot";
import axios from "axios";
export default {
  name: "ExploreData",
  components: {
    ExploreDataMap,
    ExploreDataScatterPlot
  },
  data() {
    return {lifeExpectancyData: null, selectedIndicatorData: null, selectedIndicator: null};
  },
  mounted() {
     axios
      .get(
        process.env.VUE_APP_API_DOMAIN + "/census-tracts/indicators/50001/data"
      ) // TODO obviously do this through hateoas
      .then(response => {
        this.lifeExpectancyData = response.data;
        // userDataStore.setLifeExpectancyData(response.data.indicatorData);
      }

      //TODO get all indicators
  }
};
</script>

<style>
</style>