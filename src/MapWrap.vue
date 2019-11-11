<template>
  <v-container id="map-container">
    <Map />
  </v-container>
</template>

<script>
import Map from "./components/map/Map";
import { store } from "./store";
import CensusTracts from "./api/census-tracts";

export default {
  name: "MapWrap",
  components: {
    Map
  },
  created: function() {
    CensusTracts.get(response => {
      store.setCensusTracts(response);
    });
  }
};
</script>

<style>
#map-container {
  display: flex;
  flex: 1;
  height: 600px;
}
</style>