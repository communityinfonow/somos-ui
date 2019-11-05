// TODO: method for finding containing census tract when coordinates are supplied
<template>
  <l-map id="map" ref="map" :center="center" :zoom="zoom" @click="clicker">
    <l-tile-layer :url="tileUrl"></l-tile-layer>
    <span v-if="location.coordinates && location.coordinates.lat && location.coordinates.lng">
      <l-marker :lat-lng="location.coordinates" :visible="location.coordinates !== center">
        <l-icon :icon-url="iconUrl" :icon-size="iconSize" :icon-anchor="iconAnchor"></l-icon>
      </l-marker>
    </span>
    <Boundaries :map="map" />
  </l-map>
</template>

<script>
import { LMap, LTileLayer, LControl, LMarker, LIcon } from "vue2-leaflet";
import { store } from "../../store";

import Legend from "./Legend";
import MarkerTooltip from "./MarkerTooltip";
import Boundaries from "./Boundaries";

export default {
  name: "GeoMap",
  components: {
    LMap,
    LTileLayer,
    LControl,
    MarkerTooltip,
    Legend,
    LMarker,
    LIcon,
    Boundaries
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
      iconUrl: "./assets/map-marker.png",
      iconSize: [25, 41],
      storeState: store.state,
      boundaries: store.state.boundaries
    };
  },
  props: ["location"],
  methods: {
    clicker: function(event) {
      store.setSelectedLocation({
        //TODO: unit test to make sure object always has same structure of {lat,lng}
        coordinates: event.latlng
      });
    },
    findContainingTractByBoundaries: function(latLng) {
      this.storeState.boundaries.getLayers().forEach(layer => {
        if (layer.getBounds().contains(latLng)) {
          layer.options.style.fillColor = "black";
        }
      });
    }
  },
  watch: {
    location: function(theLocation) {
      store.setSelectedLocationTract(
        this.findContainingTractByBoundaries(theLocation.coordinates)
      );
    },
    boundaries: function(newBoundaries) {
      console.log(newBoundaries);
    }
  },
  computed: {
    iconAnchor: function() {
      return [this.iconSize[0] / 2, this.iconSize[1]];
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
