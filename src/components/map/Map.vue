<template>
  <l-map ref="map" :center="center" :zoom="zoom">
    <l-tile-layer :url="tileUrl"></l-tile-layer>
  </l-map>
</template>

<script>
import { LMap, LTileLayer, LCircleMarker, LControl } from "vue2-leaflet";

import Legend from "./Legend";
import MarkerTooltip from "./MarkerTooltip";

export default {
  name: "GeoMap",
  components: {
    LMap,
    LTileLayer,
    LCircleMarker,
    LControl,
    MarkerTooltip,
    Legend
  },
  mounted() {
    this.$nextTick(() => {
      this.map = this.$refs.map.mapObject;
    });
  },
  created() {},
  data() {
    return {
      map: {},
      center: [29.437236, -98.491163],
      tileUrl: "http://tile.stamen.com/toner/{z}/{x}/{y}.png",
      zoom: 12
    };
  },
  props: ["coordinates"],
  computed: {}
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
