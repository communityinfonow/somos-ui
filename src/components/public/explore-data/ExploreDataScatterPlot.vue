<template>
  <ScatterPlot
    :tractData="tractData"
    :xAxisLabel="xAxisLabel"
    :yAxisLabel="yAxisLabel"
    width="300"
    height="300"
  />
</template>

<script>
import ScatterPlot from "./ScatterPlot";
import { exploreDataStore } from "@/store.js";
export default {
  name: "ExploreDataScatterPlot",
  components: {
    ScatterPlot
  },
  data() {
    return {
      storeState: exploreDataStore.state,
      yAxisLabel: "Average Life Expectancy",
      xAxisIndicator: null,
      yData: null
    };
  },
  computed: {
    xAxisLabel() {
      return this.xAxisIndicator ? this.xAxisIndicator.name : "";
    },
    tractData() {
      let combinedData = this.yData
        ? this.yData.map(entry => {
            return { tract: entry.tract, y: entry.dataValue };
          })
        : null;
      combinedData.forEach(entry => {
        this.xData.forEach(xEntry => {
          entry.x = xEntry.dataValue;
        });
      });
      return combinedData;
    }
  }
};
</script>

<style>
</style>