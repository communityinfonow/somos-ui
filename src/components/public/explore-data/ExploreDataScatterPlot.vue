<template>
  <div>
    <ScatterPlot
      :tractData="tractData"
      :xAxisLabel="xAxisLabel"
      :xAxisDescription="xAxisDescription"
      :yAxisLabel="yAxisLabel"
      :yAxisDescription="yAxisDescription"
      width="100%"
      :height="600"
      :xMinMax="xMinMax"
      :yMinMax="yMinMax"
    />
    <div id="info-container">
      <div id="plot-legend" class="container-border">
        <ul>
          <li>
            <div class="circle" id="census-tract"></div>
            {{translateText(censusTract)}}
          </li>
          <li v-show="showNeighborhoodsOnLegend">
            <div class="circle" :style="{background: yourNeighborhoodColor}"></div>
            {{translateText(yourNeighborhood)}}
          </li>

          <li v-show="showNeighborhoodsOnLegend">
            <div class="circle" :style="{background: yourMatchColor}"></div>
            {{translateText(yourMatch)}}
          </li>
        </ul>
      </div>
      <div class="container-border" id="notation" v-if="xAxisIndicator">{{xAxisIndicator.notation}}</div>
    </div>
  </div>
</template>

<script>
import ScatterPlot from "./ScatterPlot";
import { exploreDataStore } from "@/store.js";
import { userDataStore } from "@/components/public/user-data/userDataStore";
import { ValueType } from "@/components/public/shared/ValueType";

import globals from "@/globals.js";
import translate from "@/mixins/translate";
const r = 3;
export default {
  name: "ExploreDataScatterPlot",
  components: {
    ScatterPlot
  },
  mixins: [translate],
  data() {
    return {
      storeState: exploreDataStore.state,
      yourNeighborhood: { en: "Your neighborhood", es: "Tu vecindario" },
      yourMatch: { en: "Your match neighborhood", es: "Tu vecindario similar" },
      censusTract: { en: "Census tract", es: "Tracto Censal" },
      yourNeighborhoodColor: globals.darkPink,
      yourMatchColor: globals.yellow
    };
  },
  props: {
    yData: Object,
    xData: Object,
    xAxisIndicator: Object,
    yAxisIndicator: Object
  },
  computed: {
    showNeighborhoodsOnLegend() {
      return userDataStore.state.tract && userDataStore.getMatchedTract();
    },
    xAxisLabel() {
      return this.xAxisIndicator
        ? this.xAxisIndicator.valueType.type.toLowerCase() != ValueType.AVERAGE
          ? this.xAxisIndicator.name +
            " (" +
            this.xAxisIndicator.valueType.type +
            ")"
          : this.xAxisIndicator.name
        : "";
    },
    xAxisDescription() {
      return this.xAxisIndicator ? this.xAxisIndicator.description : "";
    },
    yAxisLabel() {
      return this.yAxisIndicator
        ? this.yAxisIndicator.valueType.type.toLowerCase() != ValueType.AVERAGE
          ? this.yAxisIndicator.description +
            " (" +
            this.yAxisIndicator.valueType.type +
            ")"
          : this.yAxisIndicator.description
        : "";
    },
    yAxisDescription() {
      return this.yAxisIndicator ? this.yAxisIndicator.description : "";
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
            let obj = {
              tract: entry.censusTractId,
              y: entry.value,
              r: r,
              color: "black"
            };
            if (userDataStore.state.tract && userDataStore.getMatchedTract()) {
              if (entry.censusTractId == userDataStore.state.tract.id) {
                obj.color = globals.darkPink;
                obj.r = 6;
              } else if (
                entry.censusTractId === userDataStore.getMatchedTract().id
              ) {
                obj.color = globals.yellow;
                obj.r = 6;
              }
            }

            return obj;
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
#notation {
  padding: 15px;
  margin-left: 20px;
  font-weight: bold;
}

#info-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.container-border {
  background: white;
  border-radius: 15px;
  box-shadow: 0px 3px 5px 0px gray;
}

ul {
  list-style: none;
  padding-left: 0;
  line-height: 100%;
}

li {
  padding: 5px 0 5px 0;
  font-size: 15px;
  font-weight: bold;
}

.circle {
  width: 15px;
  height: 15px;
  background: black;
  border-radius: 9999px;
  display: inline-block;
  margin-right: 8px;
  vertical-align: bottom;
}

#plot-container {
  width: 80%;
}

#plot-legend {
  width: 30%;
  padding: 15px;
  margin-left: 20px;
}

@media (max-width: 760px) {
  #plot-legend {
    width: 100%;
    order: 2;
    margin-top: 15px;
  }

  #notation {
    width: 100%;
    order: 1;
  }
}
</style>