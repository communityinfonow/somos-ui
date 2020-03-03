<template>
  <svg :height="height + margin.top + margin.bottom" :width="width + margin.left + margin.right">
    <g :transform="'translate(' + margin.left + ',' + margin.top + ')'">
      <g class="x-axis" ref="xAxis" :transform="'translate(0,' + chartHeight + ')'">
        <text class="label" :x="width/2" :y="margin.top" fill="black">{{xAxisLabel}}</text>
      </g>
      <g class="y-axis" ref="yAxis" :transform="'translate(0,0)'">
        <text
          class="label"
          :y="0 - margin.left + 10"
          :x="0- (height/4)"
          transform="rotate(-90)"
          fill="black"
        >{{yAxisLabel}}</text>
      </g>
      <g>
        <circle
          v-for="(data, index) in tractData"
          :key="index"
          :r="r"
          :cx="xScale(data.x)"
          :cy="yScale(data.y)"
        />
      </g>
    </g>
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
    height: Number,
    xMinMax: Object,
    yMinMax: Object
  },
  data() {
    return {
      labelMargin: 6,
      r: 3,
      margin: { top: 30, right: 30, bottom: 30, left: 50 }
    };
  },
  watch: {
    xAxis(newXAxis) {
      d3.select(this.$refs.xAxis).call(newXAxis);
    },
    yAxis(newYAxis) {
      d3.select(this.$refs.yAxis).call(newYAxis);
    }
  },
  computed: {
    xScale() {
      return d3
        .scaleLinear()
        .range([0, this.chartWidth])
        .domain([this.xMinValue, this.xMaxValue]);
    },
    yScale() {
      return d3
        .scaleLinear()
        .range([this.chartHeight, 0])
        .domain([this.yMinValue, this.yMaxValue]);
    },
    xMaxValue() {
      return this.xMinMax
        ? this.xMinMax.max
        : this.tractData
        ? d3.max(this.tractData.map(data => data.x))
        : null;
    },
    yMaxValue() {
      return this.yMinMax
        ? this.yMinMax.max
        : this.tractData
        ? d3.max(this.tractData.map(data => data.y))
        : null;
    },
    xMinValue() {
      return this.xMinMax ? this.xMinMax.min : 0;
    },
    yMinValue() {
      return this.yMinMax ? this.yMinMax.min : 0;
    },
    yAxis() {
      return d3.axisLeft(this.yScale);
    },
    xAxis() {
      return d3.axisBottom(this.xScale);
    },
    chartWidth() {
      return this.width - (this.margin.left + this.margin.right);
    },
    chartHeight() {
      return this.height - (this.margin.top + this.margin.bottom);
    }
  }
};
</script>

<style>
.label {
  text-anchor: middle;
}
</style>