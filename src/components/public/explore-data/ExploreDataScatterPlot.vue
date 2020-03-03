<template>
  <ScatterPlot
    :tractData="tractData"
    :xAxisLabel="xAxisLabel"
    :yAxisLabel="yAxisLabel"
    :width="500"
    :height="400"
    :xMinMax="xMinMax"
    :yMinMax="yMinMax"
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
      yAxisLabel: "Average Life Expectancy"
    };
  },
  props: { yData: Object, xData: Object, xAxisIndicator: Object },
  computed: {
    xAxisLabel() {
      return this.xAxisIndicator ? this.xAxisIndicator.name : "";
    },
    xMinMax() {
      if (this.xData) {
        return { min: this.xData.minValue, max: this.xData.maxValue };
      }
      return null;
    },
    yMinMax() {
      if (this.yData) {
        return { min: this.yData.minValue, max: this.yData.maxValue };
      }
      return null;
    },
    tractData() {
      let combinedData = this.yData
        ? this.yData.indicatorData.map(entry => {
            return { tract: entry.censusTractId, y: entry.value };
          })
        : null;

      if (combinedData && this.xData && this.xData.indicatorData) {
        combinedData.forEach(entry => {
          this.xData.indicatorData.forEach(xEntry => {
            if (entry.tract === xEntry.censusTractId) {
              entry.x = xEntry.value;
            }
          });
        });
      }

      return combinedData;
    }
  }
};
</script>

<style>
</style>