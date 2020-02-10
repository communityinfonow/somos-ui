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
      userIconUrl: require("./map-left-flag.svg"),
      matchIconUrl: require("./map-right-flag.svg"),
      iconSize: [50, 59]
    };
  },
  methods: {},

  computed: {
    matchedTract() {
      if (this.tract && this.tract.matchedTracts) {
        return this.tract.matchedTracts.find(
          tract => tract.rank === this.storeState.matchRank
        );
      }
      return null;
    },
    locations() {
      let locations = [];
      if (this.storeState.address) {
        locations.push({
          coordinates: this.storeState.address.coordinates,
          icon: {
            url: this.userIconUrl,
            size: this.iconSize,
            anchor: this.calculateIconAnchor(
              this.iconSize[0],
              this.iconSize[1],
              "right"
            ),
            data: {
              value: "45",
              style: {
                bottom: "42px",
                left: "13px"
              }
            }
          }
        });
      }

      if (this.boundaryGeojson && this.matchedTract) {
        locations.push({
          coordinates: this.boundaryGeojson
            .getLayers()
            .find(layer => layer.feature.properties.id === this.matchedTract.id)
            .getBounds()
            .getCenter(),
          icon: {
            url: this.matchIconUrl,
            size: this.iconSize,
            anchor: this.calculateIconAnchor(
              this.iconSize[0],
              this.iconSize[1],
              "left"
            ),
            data: {
              value: "75",
              style: {
                bottom: "42px",
                left: "16px"
              }
            }
          }
        });
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

.icon-data {
  position: relative;
  font: 800 18px/24px Montserrat;
  color: white;
}
</style>