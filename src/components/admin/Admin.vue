
<template>
  <v-container>
    <v-row>
      <v-col cols="3">
        <!-- TODO component for filters -->
        <v-btn-toggle v-model="approvedFilter">
          <v-btn :value="false">Not Approved</v-btn>
          <v-btn :value="true">Approved</v-btn>
        </v-btn-toggle>
      </v-col>
      <v-col cols="6">
        <!-- <v-autocomplete :items="filteredPhotos" return-object item-text="tract"></v-autocomplete> -->
      </v-col>
    </v-row>

    <PhotoSelector
      v-for="tract in filteredPhotos"
      :key="tract[0]"
      :tract="tract[0]"
      :photos="tract[1]"
      @delete="deleteTract"
    ></PhotoSelector>
  </v-container>
</template>

<script>
import PhotoSelector from "./photos/PhotoSelector";
import { store } from "../../store";
import PhotoData from "../../api/photo-data";
export default {
  name: "Admin",
  data() {
    return {
      storeState: store.state,
      approvedFilter: false,
      photos: []
    };
  },
  methods: {
    deleteTract: function(tract) {
      this.filteredPhotos.delete(tract);
      //TODO delete the tract if it no longer has photos left
    }
  },
  components: {
    PhotoSelector
  },
  created: function() {
    PhotoData.get(response => {
      this.photos = response;
      //TODO: error handling
    });
  },
  computed: {
    filteredPhotos: function() {
      var map = new Map();
      var toggledPhotos = this.photos.filter(
        photo =>
          photo.approved === this.approvedFilter ||
          (photo.approved === null && this.approvedFilter === false)
      );
      toggledPhotos.forEach(photo => {
        if (map.has(photo.censusTractId)) {
          map.get(photo.censusTractId).push(photo);
        } else {
          map.set(photo.censusTractId, [photo]);
        }
      });
      return map;
    }
  }
};
</script>

<style>
</style>