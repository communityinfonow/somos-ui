<template>
  <l-map ref="map" :center="center" :zoom="zoom">
    <l-tile-layer :url="tileUrl"></l-tile-layer>
    <div v-for="location in locations" v-bind:key="location.name"></div>
  </l-map>
</template>

<script>
import { LMap, LTileLayer, LCircleMarker, LControl } from "vue2-leaflet";

import Legend from "./Legend";
import MarkerTooltip from "./MarkerTooltip";
import api from "../api/locations";
import mapping from "../mapping";

export default {
  name: "Map",
  components: {
    LMap,
    LTileLayer,
    LCircleMarker,
    LControl,
    MarkerTooltip,
    Legend,
    mapping
  },
  mounted() {
    this.$nextTick(() => {
      this.map = this.$refs.map.mapObject;
    });
  },
  created() {
    this.calculateRadius = mapping.calculateRadius;
    api.getLocations(this.setLocations);
  },
  data() {
    return {
      map: {},
      center: [42.959084, -85.687226],
      tileUrl: "http://tile.stamen.com/toner/{z}/{x}/{y}.png",
      zoom: 12,
      locations: [],
      max
    };
  },
  computed: {
    totalBags: function() {
      let self = this;
      return self.locations.reduce((accu, val) => accu + val.garbageBags, 0);
    },
    max: function() {
      let self = this;
      return self.locations.reduce(
        (acc, val) => (val.garbageBags > acc ? val.garbageBags : acc),
        0
      );
    }
  },
  methods: {
    setLocations: function(response) {
      this.locations = response.data;
    }
  }
};
</script>

<style lang="scss" scoped>
ul {
  list-style: none;
}
#legend {
  background: white;
  padding: 10px;
  opacity: 0.8;
}
li {
  div {
    display: inline-block;
    padding-bottom: 10px;
  }

  svg {
    display: inline-block;
    vertical-align: middle;
    margin-right: 10px;
  }
}
</style>
