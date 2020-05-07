<template>
  <l-map
    id="map"
    ref="map"
    :center="mapCenter"
    :zoom="mapZoom"
    :options="options"
    @click="clickHandler"
  >
    <l-tile-layer :url="baseTileLayer.url" :attribution="baseTileLayer.attribution"></l-tile-layer>
    <l-tile-layer
      :url="streetTileLayer.url"
      :attribution="streetTileLayer.attribution"
      pane="overlayPane"
      :zIndex="500"
      :opacity="0.6 "
    ></l-tile-layer>

    <span v-for="(location, index) in locations" :key="index">
      <l-marker :lat-lng="location.coordinates" @click="location.click">
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
    <slot></slot>
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

      defaultZoom: 10.5,
      baseTileLayer: {
        url: "https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png",
        attribution:
          "&copy; <a href='https://cartodb.com/attributions'>CartoDB</a>"
      },
      streetTileLayer: {
        url:
          "https://stamen-tiles-{s}.a.ssl.fastly.net/toner-hybrid/{z}/{x}/{y}.png",
        attribution:
          "Map tiles by <a href='http://stamen.com'>Stamen Design</a>, under <a href='http://creativecommons.org/licenses/by/3.0'>CC BY 3.0</a>. Data by <a href='http://openstreetmap.org'>OpenStreetMap</a>, under <a href='http://www.openstreetmap.org/copyright'>ODbL</a>."
      }
    };
  },
  props: {
    locations: Array,
    zoom: Number,
    center: Array,
    boundaries: Object,
    options: Object
  },
  methods: {
    loadListener(e) {
      if (!e.hasLayer(this.boundaries)) {
        this.boundaries.addTo(e);
      }
    },
    clickHandler(event) {
      this.$emit("click", event);
    }
  },
  watch: {
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
  border-radius: 15px;
  box-shadow: 0px 2px 4px 0px #00000026;
  height: 700px;
  padding: 15px;
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

@media (max-width: 600px) {
  #map {
    height: 400px !important;
  }
}
</style>
