<template>
  <Map :boundaries="boundaryGeojson" :locations="locations" id="map" />
</template>

<script>
import Map from "./Map";
import censusTractApi from "../../../../api/census-tracts";
import { userDataStore } from "../userDataStore";
import boundaries from "./Boundaries";
export default {
  name: "ExploreMap",
  components: {
    Map
  },
  props: { tract: Object },
  data() {
    return {
      storeState: userDataStore.state,
      censusTracts: null
    };
  },
  methods: {
    calculateIconAnchor(iconSize) {
      return [iconSize[0] / 2, this.iconSize[1]];
    },
    setBoundaries(censusTractBoundaries) {}
  },

  computed: {
    locations() {
      let locations = [];
      if (this.storeState.userAddress) {
        locations.push(this.storeState.userAddress);
      }

      if (this.boundaryGeojson && this.tract) {
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
    boundaryGeojson() {
      if (this.censusTracts) {
        return boundaries(false).generate(this.censusTracts);
      }
      return null;
    },
    appLinks() {
      return this.storeState.links;
    }
  },
  watch: {
    appLinks: function() {
      if (this.storeState.links) {
        censusTractApi.get(
          this.storeState.links.censusTracts.href,
          censusTracts => {
            this.censusTracts = censusTracts;
          }
        );
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