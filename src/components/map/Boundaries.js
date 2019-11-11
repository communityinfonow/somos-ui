import {
  LGeoJson
} from "vue2-leaflet";
import {
  store
} from "../../store";

var geojson = {};

function style(feature) {
  return {
    weight: 1,
    opacity: 1,
    color: "black",
    fillOpacity: 0.05,
    fillColor: "blue"
  };
}

function highlightFeature(e) {
  var layer = e.target;

  layer.setStyle({
    fillOpacity: 0.2
  });

  if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
    layer.bringToFront();
  }
}

function resetHighlight(e) {
  e.target.setStyle(style());
}

function onEachFeature(feature, layer) {
  layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlight
  });
}

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
    geojson = L.geoJSON(
      censusTracts.map(tract =>
        convertTractToGeoJson(tract)
      ), {
        style: style,
        onEachFeature: onEachFeature
      }
    );
    return geojson;
  },
  setSelectedStyle: function (layer) {
    layer.setStyle({
      weight: 4
    });
  }

};