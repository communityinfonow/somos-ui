<template>
  <Map :boundaries="boundaryGeojson" :locations="locations" id="map" />
</template>

<script>
import Map from "@/components/public/shared/map/Map";
import { userDataStore } from "../userDataStore";

import { mapCommon } from "@/mixins/map-common";
export default {
  name: "ExploreMap",
  components: {
    Map
  },
  props: { tract: Object },
  mixins: [mapCommon],
  data() {
    return {
      storeState: userDataStore.state,
      userIconUrl: require("../left-flag.svg"),
      coutnerpartIconUrl: require("../right-flag.svg")
    };
  },
  methods: {},

  computed: {
    locations() {
      let locations = [];
      if (this.storeState.address) {
        locations.push({
          coordinates: this.storeState.address.coordinates,
          icon: {
            url: this.userIconUrl,
            size: this.iconSize,
            anchor: this.calculateIconAnchor(this.iconSize)
          }
        });
      }

      if (this.boundaryGeojson && this.tract && this.tract.counterpart) {
        // TODO take out coutnerpart check once implemented in data
        locations.push(
          this.boundaryGeojson
            .getLayers()
            .filter(
              layer => layer.feature.properties.id === this.tract.counterpart.id
            )
            .getBounds()
            .getCenter()
        );
      }
      return locations;
    },
    appLinks() {
      return this.storeState.links;
    }
  },
  watch: {
    appLinks() {
      if (this.storeState.links) {
        this.getCensusTracts(this.storeState.links.censusTracts.href);
      }
    }
  }
};
</script>

<style>
#map {
  border-radius: 15px;
  box-shadow: 0px 2px 4px 0px #00000026;
  height: 700px !important;
  padding: 15px;
}
</style>