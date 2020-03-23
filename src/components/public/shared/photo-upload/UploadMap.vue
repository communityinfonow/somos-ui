<template>
  <Map
    :locations="location"
    :zoom="mapZoom"
    :center="coordinates && coordinates.length > 0 ? coordinates : null"
    @click="clickHandler"
  />
</template>

<script>
import * as leafletPip from "@mapbox/leaflet-pip";
import Map from "@/components/public/shared/map/Map";
import { mapCommon } from "@/mixins/map-common";
import censusTractApi from "@/api/census-tracts";

import { store } from "@/store";
export default {
  name: "UploadMap",
  mixins: [mapCommon],
  props: { coordinates: Object },
  components: {
    Map
  },
  data() {
    return { storeState: store.state };
  },

  methods: {
    clickHandler(event) {
      store.setSelectedLocation({
        coordinates: event.latlng
      });
    },
    findContainingTractByBoundaries(latLng) {
      censusTractApi.getSingle(
        this.appLinks.censusTracts.href +
          "/latlng/lat=" +
          latLng.lat +
          ";lng=" +
          latLng.lng,
        response => {
          store.setSelectedLocationTract(response);
        }
      );
    }
  },
  watch: {
    coordinates(newCoordinates) {
      if (newCoordinates.lat && newCoordinates.lng) {
        this.findContainingTractByBoundaries(newCoordinates);
      }
    }
  },
  computed: {
    location() {
      return [
        {
          coordinates: this.coordinates,
          icon: {
            url: this.iconUrl,
            size: this.iconSize,
            anchor: this.calculateIconAnchor(this.iconSize[0], this.iconSize[1])
          }
        }
      ];
    },
    appLinks() {
      return this.storeState.appLinks;
    },
    mapZoom() {
      return this.coordinates && this.coordinates.length > 0 ? 14 : null;
    }
  }
};
</script>

<style>
</style>