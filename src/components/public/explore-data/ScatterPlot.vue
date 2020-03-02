<template>
  <svg>
    <g class="x-axis" :transform="'translate(0,' + height + ')'">
      <text class="label" :x="width" :y="-labelMargin">{{xAxisLabel}}</text>
    </g>
    <g class="y-axis">
      <text class="label" :y="labelMargin" tranform="rotate(-90)">{{yAxisLabel}}</text>
    </g>
    <circle
      v-for="(data, index) in tractData"
      :key="index"
      :r="r"
      cx="xScale(data.x)"
      cy="yScale(data.y)"
    />
  </svg>
</template>

<script>
import * as d3 from "d3";
export default {
  name: "ScatterPlot",
  props: {
    xAxisLabel: String,
    yAxisLabel: String,
    tractData: Array,
    width: Number,
    height: Number
  },
  data() {
    return { labelMargin: 6, r: 3 };
  },
  computed: {
    xScale() {
      return d3.scale
        .linear()
        .range([0, this.width])
        .domain([0, this.xMaxValue]);
    },
    yScale() {
      return d3.scale
        .linear()
        .range([this.height, 0])
        .domain([this.yMaxValue, 0]);
    },
    xMaxValue() {
      return d3.max(tractData.map(data => data.x));
    },
    yMaxValue() {
      return d3.max(tractData.map(data => data.y));
    }
  }
};
</script>

<style>
.label {
  text-anchor: end;
}
</style>