import {
  LGeoJson
} from "vue2-leaflet";
import {
  store
} from "../../store";

const geoJsonOptions = {
  style: () => {
    return {
      "fillColor": "none",
      "fill-opacity": "0"
    }
  },
  onEachFeature: function (feature, layer) {
    layer.on("mouseover", function () {
      this.setStyle({
        fillColor: "#0000ff"
      });
    });
    layer.on("mouseout", function () {
      this.setStyle({
        fillColor: "none"
      });
    });
  }
};

function convertTractToGeoJson(tract) {
  var feature = L.GeoJSON.asFeature(tract.geometry);
  feature.properties = {
    id: tract.id,
    tract: tract.tract,
    links: tract.links //TODO: remove from here and use on the features with data
  };
  return feature;
}

export const boundaries = {
  generate: function (censusTracts) {
    return L.geoJSON(
      censusTracts.map(tract =>
        convertTractToGeoJson(tract)
      ),
      geoJsonOptions
    );
  }

};