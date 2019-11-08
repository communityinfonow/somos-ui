<template>
  <Map />
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
</style>