// TODO: will need something similar to this module for features displaying data
<template>
  <span></span>
  <!-- <l-geo-json :geojson="boundaries" :optionsStyle="geoJsonStyle" :options="geoJsonOptions"></l-geo-json> -->
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
      censusTracts: store.state.censusTracts,
      geoJsonOptions: {
        style: {
          color: "black",
          fillColor: "none",
          "fill-opacity": "0"
        },
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
  props: ["map"],
  computed: {
    boundaries: function() {
      return L.geoJSON(
        this.storeState.censusTracts.map(tract =>
          this.convertTractToGeoJson(tract)
        ),
        this.geoJsonOptions
      );
    }
  },
  watch: {
    boundaries: function(geojson) {
      store.setBoundaries(geojson);
      geojson.addTo(this.map);
    }
  },
  methods: {
    convertTractToGeoJson: function(tract) {
      var feature = L.GeoJSON.asFeature(tract.geometry);
      feature.properties = {
        id: tract.id,
        tract: tract.tract,
        links: tract.links //TODO: remove from here and use on the features with data
      };
      return feature;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>