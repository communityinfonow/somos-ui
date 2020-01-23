<template>
  <v-container id="map-container">
    <Map />
  </v-container>
</template>

<script>
import Map from "./components/public/shared/map/Map";
import { store } from "./store";
import CensusTracts from "./api/census-tracts";
import { appLinks } from "./mixins/app-links";

export default {
  name: "MapWrap",
  components: {
    Map
  },
  data() {
    return {
      storeState: store.state
    };
  },
  mixins: [appLinks],
  watch: {
    appLinks: function(newLinks) {
      CensusTracts.getMulti(newLinks.censusTracts.href, response => {
        store.setCensusTracts(response);
      });
    }
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