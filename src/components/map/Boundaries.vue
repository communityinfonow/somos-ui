// TODO: will need something similar to this module for features displaying data
<template>
  <l-geo-json :geojson="boundaries" :optionsStyle="geoJsonStyle" :options="geoJsonOptions"></l-geo-json>
</template>

<script>
import { LGeoJson } from "vue2-leaflet";
import { store } from "../../store";
export default {
  name: "Boundaries",
  components: {
    LGeoJson
  },
  data() {
    return {
      storeState: store.state,
      geoJsonStyle: {
        color: "black",
        fillColor: "none",
        "fill-opacity": "0"
      },
      geoJsonOptions: {
        onEachFeature: function(feature, layer) {
          layer.on("mouseover", function() {
            this.setStyle({
              fillColor: "#0000ff"
            });
          });
          layer.on("mouseout", function() {
            this.setStyle({
              fillColor: "none"
            });
          });
        }
      }
    };
  },
  computed: {
    boundaries: function() {
      return this.storeState.censusTracts.map(tract => {
        var feature = L.GeoJSON.asFeature(tract.geometry);
        feature.properties = {
          id: tract.id,
          tract: tract.tract,
          links: tract.links //TODO: remove from here and use on the features with data
        };
        return feature;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>