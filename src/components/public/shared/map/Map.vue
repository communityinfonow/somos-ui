<template>
  <l-map id="map" ref="map" :center="mapCenter" :zoom="mapZoom" @click="clickHandler">
    <l-tile-layer :url="tileUrl"></l-tile-layer>

    <span v-for="(location, index) in locations" :key="index">
      <l-marker :lat-lng="location.coordinates">
        <l-icon :icon-size="location.icon.size" :icon-anchor="location.icon.anchor">
          <img :src="location.icon.url" />
          <span
            class="icon-data"
            :style="location.icon.data.style"
            v-if="location.icon.data && location.icon.data.value"
          >{{location.icon.data.value}}</span>
        </l-icon>
      </l-marker>
    </span>
  </l-map>
</template>

<script>
import { LMap, LTileLayer, LControl, LMarker, LIcon } from "vue2-leaflet";

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
      this.map.scrollWheelZoom.disable();
    });
  },
  data() {
    return {
      map: {},
      defaultCenter: [29.437236, -98.491163],
      tileUrl:
        "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png",
      defaultZoom: 10
    };
  },
  props: { locations: Array, zoom: Number, center: Array, boundaries: Object },
  methods: {
    loadListener: function(e) {
      if (!e.hasLayer(this.boundaries)) {
        this.boundaries.addTo(e);
      }
    },
    clickHandler(event) {
      this.$emit("click", event);
    }
  },
  watch: {
    locations: function(theLocation) {
      // this.findContainingTractByBoundaries(theLocation); // TODO: handle null
    },
    boundaries: function(newBoundaries) {
      newBoundaries.addTo(this.map);
    }
  },
  computed: {
    mapZoom() {
      return this.zoom || this.defaultZoom;
    },
    mapCenter() {
      return this.center && this.center.lat && this.center.lng
        ? this.center
        : this.defaultCenter;
    }
  }
};
</script>

<style lang="scss" scoped>
#map {
  width: 100%;
  flex: 1;
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
