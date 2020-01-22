<template>
  <l-map
    id="map"
    ref="map"
    :center="mapCenter"
    :zoom="mapZoom"
    @click="clicker"
    @ready="loadListener"
  >
    <l-tile-layer :url="tileUrl"></l-tile-layer>
    <span v-if="location  && location.lat && location.lng">
      <l-marker :lat-lng="location">
        <l-icon :icon-url="iconUrl" :icon-size="iconSize" :icon-anchor="iconAnchor"></l-icon>
      </l-marker>
    </span>
  </l-map>
</template>

<script>
import { LMap, LTileLayer, LControl, LMarker, LIcon } from "vue2-leaflet";
import { store } from "../../../../store";
import * as leafletPip from "@mapbox/leaflet-pip";

import Legend from "./Legend";
import MarkerTooltip from "./MarkerTooltip";
import boundaries from "./Boundaries.js";

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
  data() {
    return {
      map: {},
      defaultCenter: [29.437236, -98.491163],
      tileUrl:
        "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png",
      defaultZoom: 10,
      iconUrl: "./assets/map-marker.png",
      iconSize: [25, 41],
      geoJson: {},
      storeState: store.state
    };
  },
  props: ["location", "zoom", "center"],
  methods: {
    loadListener: function(e) {
      if (!e.hasLayer(this.boundaries)) {
        this.boundaries.addTo(e);
      }
    },
    clicker: function(event) {
      store.setSelectedLocation({
        //TODO: unit test to make sure object always has same structure of {lat,lng}
        coordinates: event.latlng
      });
    },
    findContainingTractByBoundaries: function(latLng) {
      var containingGeographies = leafletPip.pointInLayer(
        latLng,
        this.boundaries
      );
      if (containingGeographies.length == 1) {
        var layer = containingGeographies[0];
        boundaries().setSelectedStyle(layer);
        return layer.feature.properties;
      } else {
        //TODO: return an error
      }
      return null;
    }
  },
  watch: {
    location: function(theLocation) {
      store.setSelectedLocationTract(
        this.findContainingTractByBoundaries(theLocation) // TODO: handle null
      );
    },
    boundaries: function(newBoundaries) {
      newBoundaries.addTo(this.map);
    }
  },
  computed: {
    iconAnchor: function() {
      return [this.iconSize[0] / 2, this.iconSize[1]];
    },
    boundaries: function() {
      return boundaries(false).generate(this.storeState.censusTracts);
    },
    mapZoom: function() {
      return this.zoom || this.defaultZoom;
    },
    mapCenter: function() {
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