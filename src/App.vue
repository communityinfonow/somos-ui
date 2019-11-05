<template>
  <v-app id="app">
    <PhotoUpload />
  </v-app>
</template>

<script>
import PhotoUpload from "./components/photo-upload/PhotoUpload";
import { store } from "./store";
import CensusTracts from "./api/census-tracts";

export default {
  name: "app",
  components: {
    PhotoUpload
  },
  created: function() {
    CensusTracts.get(response => {
      store.setCensusTracts(response);
    });
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
