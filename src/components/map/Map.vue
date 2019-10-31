// TODO: marker image for map
// TODO: method for finding containing census tract when coordinates are supplied
<template>
  <l-map id="map" ref="map" :center="center" :zoom="zoom" @click="clicker">
    <l-tile-layer :url="tileUrl"></l-tile-layer>
    <l-marker :lat-lng="selectedLocation" :visible="selectedLocation !== center">
      <l-icon :icon-url="iconUrl"></l-icon>
    </l-marker>
  </l-map>
</template>

<script>
import { LMap, LTileLayer, LControl, LMarker, LIcon } from "vue2-leaflet";
import { store } from "../../store";

import Legend from "./Legend";
import MarkerTooltip from "./MarkerTooltip";

export default {
  name: "GeoMap",
  components: {
    LMap,
    LTileLayer,
    LControl,
    MarkerTooltip,
    Legend,
    LMarker,
    LIcon
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
      tileUrl:
        "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png",
      zoom: 12,
      iconUrl: "./assets/map-marker.png"
    };
  },
  props: ["location"],
  methods: {
    clicker: function(event) {
      this.location = { coordinates: event.latlng };
    }
  },
  computed: {
    selectedLocation: function() {
      return this.location &&
        this.location.coordinates.lat &&
        this.location.coordinates.lng
        ? [this.location.coordinates.lat, this.location.coordinates.lng]
        : this.center;
    }
  }
};
</script>

<style lang="scss" scoped>
#map {
  width: 100%;
  height: 500px;
  z-index: 0;
}
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
