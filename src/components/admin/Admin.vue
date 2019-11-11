
<template>
  <v-container>
    <v-row>
      <v-col cols="3">
        <!-- TODO component for filters -->
        <v-btn-toggle v-model="acceptedFilter">
          <v-btn :value="false">Not Accepted</v-btn>
          <v-btn :value="true">Accepted</v-btn>
        </v-btn-toggle>
      </v-col>
      <v-col cols="6">
        <v-autocomplete :items="filteredTracts" return-object item-text="tract"></v-autocomplete>
      </v-col>
    </v-row>

    <PhotoSelector v-for="tract in filteredTracts" :key="tract.id" :tract="tract"></PhotoSelector>
  </v-container>
</template>

<script>
import PhotoSelector from "./photos/PhotoSelector";
import { store } from "../../store";
export default {
  name: "Admin",
  data() {
    return { storeState: store.state, acceptedFilter: false };
  },
  computed: {
    filteredTracts: function() {
      return this.storeState.censusTracts;
      // .filter(tract => {
      //   tract.photos && tract.photos.length > 0;
      // });
    }
  },
  methods: {},
  components: {
    PhotoSelector
  }
};
</script>

<style>
</style>