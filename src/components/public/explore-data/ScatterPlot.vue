<template>
  <div id="scatter-plot-container">
    <svg
      :height="height + margin.top + margin.bottom"
      width="100%"
      class="scatter-plot"
      onresize="refresh"
    >
      <g :transform="'translate(' + margin.left + ',' + margin.top + ')'">
        <g class="x-axis" ref="xAxis" :transform="'translate(0,' + chartHeight + ')'">
          <text
            class="label"
            x="50%"
            :y="margin.top"
            fill="black"
            @mouseover="axisMouseover(chartWidth / 2, height , xAxisDescription)"
            @mouseout="axisMouseout"
          >{{xAxisLabel}}</text>
        </g>
        <g class="y-axis" ref="yAxis" :transform="'translate(0,0)'">
          <text
            class="label"
            :y="0 - margin.left + 10"
            :x="0- (height/4)"
            transform="rotate(-90)"
            fill="black"
            @mouseover="axisMouseover( 0 - margin.left + 10, 0 - (height/4), yAxisDescription)"
            @mouseout="axisMouseout"
          >{{yAxisLabel}}</text>
        </g>
        <g>
          <circle
            v-for="(data, index) in tractData"
            :key="index"
            :r="data.r"
            :cx="xScale(data.x)"
            :cy="yScale(data.y)"
            :fill="data.color"
            @mouseover="mouseover(xScale(data.x), yScale(data.y), data.tract)"
            @mouseout="mouseout"
          />
        </g>
      </g>
    </svg>
    <div
      class="tooltip"
      v-show="showTooltip"
      :style="{top: tooltipY, left: tooltipX}"
    >Tract: {{tooltipText}}</div>

    <div
      class="tooltip axis-tooltip"
      v-show="showAxisTooltip"
      :style="{top: axisTooltipY, left: axisTooltipX}"
    >{{axisTooltipText}}</div>
  </div>
</template>

<script>
import * as d3 from "d3";
export default {
  name: "ScatterPlot",
  props: {
    xAxisLabel: String,
    xAxisDescription: String,
    yAxisDescription: String,
    yAxisLabel: String,
    tractData: Array,
    height: Number,
    xMinMax: Object,
    yMinMax: Object
  },
  data() {
    return {
      labelMargin: 6,
      chartWidth: 0,
      margin: { top: 30, right: 50, bottom: 30, left: 50 },
      showTooltip: false,
      tooltipY: 0,
      tooltipX: 0,
      tooltipText: "",
      axisTooltipY: 0,
      axisTooltipX: 0,
      axisTooltipText: "",
      showAxisTooltip: false
    };
  },
  watch: {
    xAxis(newXAxis) {
      d3.select(this.$refs.xAxis).call(newXAxis);
      d3.select(this.$refs.yAxis).call(this.yAxis);
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

    chartHeight() {
      return this.height - (this.margin.top + this.margin.bottom);
    }
  },
  methods: {
    refresh() {
      this.updateChartWidth();
      d3.select(this.$refs.xAxis).call(this.xAxis);
      d3.select(this.$refs.yAxis).call(this.yAxis);
    },
    updateChartWidth() {
      this.chartWidth =
        document.getElementsByClassName("scatter-plot")[0].clientWidth -
        (this.margin.left + this.margin.right);
    },
    mouseover(x, y, tract) {
      this.showTooltip = true;
      this.tooltipX = x.toFixed(2) - 40 + "px";
      this.tooltipY = y.toFixed(2) - 30 + "px";
      this.tooltipText = tract;
    },
    axisMouseover(x, y, description) {
      this.showAxisTooltip = true;
      this.axisTooltipX =
        isNaN(x) && x.indexOf("%") ? x : x.toFixed(2) - 60 + "px";
      this.axisTooltipY =
        isNaN(y) && y.indexOf("%") ? y : y.toFixed(2) - 60 + "px";
      this.axisTooltipText = description;
    },
    mouseout() {
      this.showTooltip = false;
    },
    axisMouseout() {
      this.showAxisTooltip = false;
    }
  },
  mounted() {
    this.updateChartWidth();
    window.onresize = this.refresh;
  }
};
</script>

<style>
.label {
  text-anchor: middle;
  font-size: 14px;
  font-weight: bold;
}

#scatter-plot-container {
  position: relative;
}

.tooltip {
  position: absolute;
  background: white;
  border: black solid 1px;
}

.axis-tooltip {
  font-size: 14px;
}
</style>