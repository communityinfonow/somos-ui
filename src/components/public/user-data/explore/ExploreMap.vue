<template>
  <Map
    :boundaries="geojson"
    :locations="locations"
    :center="center"
    id="map"
    @click="clickHandler"
    ref="exploremap"
  >
    <ExploreLegend :mapBreaks="orderedBreaks" :mapBreakColors="orderedBreakColors"></ExploreLegend>
  </Map>
</template>

<script>
import Map from "@/components/public/shared/map/Map";

import ExploreLegend from "./ExploreLegend";
import * as leafletPip from "@mapbox/leaflet-pip";
import axios from "axios";
import { mapCommon } from "@/mixins/map-common";
import { LGeoJson } from "vue2-leaflet";
import globals from "@/globals.js";
import { location, coordinates } from "@/Location.js";
import GeometryUtil from "leaflet-geometryutil";
import polylabel from "polylabel";
import locationSearch from "@/api/locationSearch.js";
export default {
  name: "ExploreMap",
  components: {
    Map,
    ExploreLegend
  },
  props: {
    tract: Object,
    address: Object,
    matchedTract: Object,
    matchTractRank: Number,
    geojson: Object,
    data: Object,
    clickable: Boolean,
    displayMatches: Boolean
  },
  mixins: [mapCommon],
  data() {
    return {
      userIconUrl: require("./map-left-flag.svg"),
      matchIconUrl: require("./map-right-flag.svg"),
      iconSize: [55, 64],
      mapObject: null,
      displayTracts: true,
      orderedBreaks: [75, 78, 81],
      orderedBreakColors: [
        globals.mapColor1,
        globals.mapColor2,
        globals.mapColor3,
        globals.mapColor4
      ],
      zoom: 11,
      center: [29.437236, -98.491163]
    };
  },
  methods: {
    clickHandler(event) {
      this.$emit("click", event.latlng);
    },
    determineShadingByValue(value) {
      // TODO write a test for this
      let color = "transparent";
      this.orderedBreaks.forEach((breakNum, index, array) => {
        if (index < array.length - 1) {
          if (value > breakNum && value <= array[index + 1]) {
            color = this.orderedBreakColors[index];
          }
        }
      });
      return color;
    },
    renderShading() {
      this.geojson.getLayers().forEach(layer => {
        layer.feature.properties.hasData = false;
        this.data.indicatorData.forEach(dataObj => {
          if (dataObj.censusTractId === layer.feature.properties.id) {
            layer.setStyle({
              fillColor: this.determineShadingByValue(dataObj.value)
            });
            layer.feature.properties.hasData = true;
            layer.bindTooltip(dataObj.value + "", {
              direction: "top",
              className: "tooltip"
            });
          }
        });
      });
    },
    determineMatchFlagLocation() {
      let matchedLayer = this.geojson
        .getLayers()
        .find(layer => layer.feature.properties.id === this.matchedTract.id);
      let latLng = matchedLayer.getBounds().getCenter();
      var containingGeographies = leafletPip.pointInLayer(latLng, this.geojson);
      if (
        containingGeographies.length > 0 &&
        containingGeographies.find(
          geography => geography.feature.properties.id === this.matchedTract.id
        )
      ) {
        return latLng;
      } else {
        let point = polylabel(
          matchedLayer.feature.geometry.coordinates[0],
          1.0
        );
        return {
          lat: point[1],
          lng: point[0]
        };
      }
    },
    resetZoom() {
      this.mapObject.setView(this.center, this.zoom);
    },
    fitViewToLocations(...coordinates) {
      this.mapObject.flyToBounds(L.latLngBounds(coordinates));
      if (this.mapObject.getZoom() > this.zoom) {
        this.mapObject.zoomOut();
      }
    },
    findTractValue(tractId) {
      let val = null;
      this.data.indicatorData.forEach(dataObj => {
        if (dataObj.censusTractId === tractId) {
          val = dataObj.value;
        }
      });
      return val;
    }
  },
  computed: {
    neighborhoodLifeExpectancy() {
      return this.tract ? this.findTractValue(this.tract.id) : null;
    },
    matchLifeExpectancy() {
      return this.matchedTract
        ? this.findTractValue(this.matchedTract.id)
        : null;
    },
    locations() {
      let locations = [];
      if (this.address) {
        locations.push({
          coordinates: this.address.coordinates,
          icon: {
            url: this.userIconUrl,
            size: this.iconSize,
            anchor: this.calculateIconAnchor(
              this.iconSize[0],
              this.iconSize[1],
              "right"
            ),
            data: {
              value: this.neighborhoodLifeExpectancy,
              style: {
                bottom: "45px",
                left: "8px",
                transform: "rotate(-13deg)"
              }
            }
          }
        });
      }

      if (this.geojson && this.matchedTract) {
        locations.push({
          coordinates: this.determineMatchFlagLocation(),
          icon: {
            url: this.matchIconUrl,
            size: this.iconSize,
            anchor: this.calculateIconAnchor(
              this.iconSize[0],
              this.iconSize[1],
              "left"
            ),
            data: {
              value: this.matchLifeExpectancy,
              style: {
                bottom: "42px",
                left: "11px",
                transform: "rotate(13deg)"
              }
            }
          }
        });
      }
      return locations;
    }
  },

  watch: {
    data(newData) {
      this.orderedBreaks.push(newData.maxValue);
      this.orderedBreaks.unshift(newData.minValue);
      if (this.geojson) {
        this.renderShading();
      }
    },

    geojson(newGeojson) {
      if (this.data) {
        this.renderShading();
      }
    },
    locations(newLocations) {
      let mapCenter = this.mapObject.getCenter();
      if (
        newLocations.length > 1 &&
        (!this.mapObject.getBounds().contains(newLocations[0].coordinates) ||
          !this.mapObject.getBounds().contains(newLocations[1].coordinates))
      ) {
        this.fitViewToLocations([
          newLocations[0].coordinates,
          newLocations[1].coordinates
        ]);
      } else if (
        mapCenter.lat != this.center[0] ||
        mapCenter.lng != this.center[1] ||
        this.mapObject.getZoom() != this.zoom
      ) {
        this.resetZoom();
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.mapObject = this.$refs.exploremap.$refs.map.mapObject;
    });
  }
};
</script>

<style lang="scss">
#map {
  border-radius: 15px;
  box-shadow: 0px 2px 4px 0px #00000026;
  height: 700px !important;
  padding: 15px;
}

.tooltip {
  padding: 10px;
  font-weight: bold;
  font-family: Montserrat;
  font-size: 18px;
  border-radius: 10px !important;
}

.icon-data {
  position: relative;
  font: 800 18px/24px Montserrat;
  color: white;
  display: block;
}
</style>