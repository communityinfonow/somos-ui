/**Big ol' component encompassing all that is photo upload */
// TODO add timeout for upload process. Match that timeout on the server and delete the file if it hasn't been approved yet.
<template>
  <v-container id="photo-upload-container">
    <v-row align-center justify-center>
      <v-col cols="12">
        <v-stepper v-model="stepper" :vertical="true" id="stepper">
          <v-stepper-step :step="1" :complete="stepper > 1" :key="`1 - step`">Upload Photo</v-stepper-step>
          <v-stepper-content :key="`1 - content`" :step="1">
            <v-card class="mb-12" height="height" flat>
              <v-card-text>
                <PhotoInput :eventBus="eventBus" />
              </v-card-text>
              <v-card-actions>
                <v-btn color="primary" @click="nextStep(1)" block :disabled="photoLoaded">Next</v-btn>
              </v-card-actions>
            </v-card>

            <!-- TODO remove false -->
          </v-stepper-content>
          <v-stepper-step
            :step="2"
            :complete="stepper > 2"
            :key="`2 - step`"
          >{{locationTitlePrepend}} Photo Location</v-stepper-step>
          <v-stepper-content :key="`2 - content`" :step="2">
            <v-card class="mb-12" height="height">
              <AddressSearch></AddressSearch>
              <GeoMap
                :location="selectedLocation.coordinates"
                :zoom="mapZoom"
                :center="selectedLocation.coordinates"
              />
            </v-card>
            <v-btn color="primary" @click="nextStep(2)" block :disabled="!isLocationSelected">Next</v-btn>
          </v-stepper-content>
          <v-stepper-step
            :step="3"
            :complete="stepper > 3"
            :key="`3 - step`"
          >Enter Contact Information (not required)</v-stepper-step>
          <v-stepper-content :key="`3 - content`" :step="3">
            <v-card class="mb-12" height="height">
              <ContactForm></ContactForm>
            </v-card>
            <v-btn @click="submitUpload" block color="primary">Submit</v-btn>
          </v-stepper-content>
        </v-stepper>
        <v-alert type="success" :value="showComplete">Upload successful</v-alert>
        <v-btn v-if="showComplete" color="primary" @click="resetUpload" block>Upload Another Photo</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AddressSearch from "../shared/address-search/AddressSearch";
import ContactForm from "./ContactForm";
import GeoMap from "../map/Map";
import PhotoInput from "./PhotoInput";
import { store } from "../../store";
import PhotoData from "../../api/photo-data";
import CensusTracts from "../../api/census-tracts";
import { appLinks } from "../../mixins/app-links";
import Vue from "vue";

export default {
  name: "PhotoUpload",
  components: {
    AddressSearch,
    ContactForm,
    GeoMap,
    PhotoInput
  },
  data() {
    return {
      storeState: store.state,
      stepper: 1,
      height: "30%",
      showComplete: false,
      eventBus: new Vue()
    };
  },
  mixins: [appLinks],
  watch: {
    appLinks: function(newLinks) {
      CensusTracts.get(newLinks.censusTracts.href, response => {
        store.setCensusTracts(response);
      });
    }
  },
  methods: {
    nextStep(n) {
      this.stepper = n + 1;
    },
    resetUpload() {
      this.stepper = 1;
      store.clearSelectedLocation();
      this.storeState.photo = null;
      this.eventBus.$emit("reset");
      this.showComplete = false;
    },
    submitUpload() {
      var self = this;
      var photo = this.storeState.photo;
      photo.ownerEmail = self.storeState.contactEmail;
      photo.ownerFirstName = self.storeState.contactFirstName;
      photo.ownerLastName = self.storeState.contactLastName;
      photo.gid = self.storeState.selectedLocation.tract.id;
      photo.description = self.storeState.photoDescription;
      delete photo._links; // TODO photo object shouldn't have links sent with it
      PhotoData.savePhoto(
        self.storeState.selectedLocation.tract._links.photos.href +
          "/" +
          photo.id,
        photo,
        () => {
          this.nextStep(3);
          this.showComplete = true;
        }
      );
    }
  },
  computed: {
    photoLoaded: function() {
      return this.storeState.photo === null;
    },
    // Whether a location has been selected or not
    isLocationSelected: function() {
      return (
        this.selectedLocation.coordinates.lat &&
        this.selectedLocation.coordinates.lng
      );
    },
    selectedLocation: function() {
      return this.storeState.selectedLocation;
    },
    locationTitlePrepend: function() {
      return this.isLocationSelected ? "Confirm" : "Select";
    },
    mapZoom: function() {
      return this.isLocationSelected ? 14 : null;
    }
  }
};
</script>

<style scoped>
#photo-upload-container {
  height: 100vh;
}

#map {
  width: 100%;
  height: 500px;
  z-index: 0;
}
#stepper {
  height: 100%;
}
</style>