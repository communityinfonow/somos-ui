import {
  LGeoJson
} from "vue2-leaflet";


var geojson = {};

var displayBoundaries = 1;

function style() {
  return {
    weight: 1,
    opacity: displayBoundaries,
    color: "black"
  };
}

function highlightFeature(e) {
  var layer = e.target;

  // layer.setStyle({
  //   fillOpacity: 0.2
  // });

  if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
    layer.bringToFront();
  }
}

function resetHighlight(e) {
  // e.target.setStyle(style());
}

function onEachFeature(feature, layer) {
  layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlight
  });

  layer.setStyle({
    fillOpacity: displayBoundaries ? 0.2 : 0
  });
}

function convertTractToGeoJson(tract) {
  var feature = L.GeoJSON.asFeature(tract.geometry);
  feature.properties = {
    id: tract.id,
    tract: tract.tract,
    _links: tract._links //TODO: remove from here and use on the features with data
  };
  return feature;
}

/**
 * Optional display param is useful for cases where the census tracts need to be used for 
 * location data but the boundaries aren't needed for the end user.
 * @param display whether to display the boundaries or not. 
 */
export default function (display) {
  displayBoundaries = display ? 1 : 0;
  return {
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
  }

};