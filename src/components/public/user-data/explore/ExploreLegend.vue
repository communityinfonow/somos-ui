<template>
  <l-control position="bottomright" id="legend-control">
    <div id="legend" class="elevation-2">
      <h2>Key</h2>
      <ul id="tract-key" v-if="neighborhoodTract && matchingTract">
        <li>
          <span id="neighborhood-key">Your neighborhood</span>
        </li>
        <li>
          <span id="match-key">Your match</span>
        </li>
      </ul>
      <ul>
        <li v-for="(label, index) in mapBreaksLabels" :key="index">
          <span class="circle-key" :style="{background: mapBreakColors[index]}"></span>
          <span>{{label}}</span>
        </li>
      </ul>
    </div>
  </l-control>
</template>

<script>
import { LControl } from "vue2-leaflet";
import { userDataStore } from "@/components/public/user-data/userDataStore.js";
export default {
  name: "ExploreLegend",
  components: {
    LControl
  },
  props: { mapBreaks: Array, mapBreakColors: Array },
  data() {
    return {
      storeState: userDataStore.state
    };
  },
  computed: {
    neighborhoodTract() {
      return this.storeState.tract;
    },
    matchingTract() {
      return userDataStore.getMatchedTract();
    },
    mapBreaksLabels() {
      return this.mapBreaks.map((mapBreak, index, array) => {
        if (index < array.length - 1) {
          let modifier = index ? 0.1 : 0.0;
          return mapBreak + modifier + " - " + array[index + 1] + " years";
        }

        // return array[index - 1] + 0.1 + " - " + mapBreak + " years";
      });
    }
  }
};
</script>

<style lang="scss" scoped>
#legend-control {
  margin-right: 20px !important;
}

h2 {
  margin-bottom: 10px;
}

#legend {
  min-height: 100px;
  background: white;
  padding: 11px 13px 11px 13px;
  border-radius: 15px;
}

ul {
  padding-left: 0 !important;
  list-style: none;
}

li {
  text-align: left;
  font: 600 14px/22px Montserrat;
  letter-spacing: 0.17px;
  color: $main-dark-blue;
  line-height: 100%;
  margin-bottom: 7px;
  span {
    vertical-align: middle;
  }
}

#tract-key {
  border-bottom: 1px solid $main-dark-blue;
  margin-bottom: 12px;
  padding-bottom: 8px;
}

.circle-key {
  display: inline-block;
  border-radius: 50%;
  margin-right: 7px;
  width: 14px;
  height: 14px;
}

span#neighborhood-key::before {
  content: " ";
  background: $dark-pink;
  @extend .circle-key;
}

span#match-key::before {
  content: " ";
  @extend .circle-key;
  background: $main-yellow;
}
</style>