/**Big ol' component encompassing all that is photo upload */
<template>
  <v-container id="photo-upload-container">
    <v-row align-center justify-center>
      <v-col cols="12">
        <v-stepper v-model="stepper" :vertical="true" id="stepper">
          <v-stepper-step :step="1" :complete="stepper > 1" :key="`1 - step`">Upload Photo</v-stepper-step>
          <v-stepper-content :key="`1 - content`" :step="1">
            <v-card class="mb-12" height="height">
              <PhotoInput />
            </v-card>
            <v-btn color="primary" @click="nextStep(1)" block :disabled="false">Next</v-btn>
            <!-- TODO if/then where last step is submit button -->
          </v-stepper-content>
          <v-stepper-step
            :step="2"
            :complete="stepper > 2"
            :key="`2 - step`"
          >Confirm/Enter Photo Location</v-stepper-step>
          <v-stepper-content :key="`2 - content`" :step="2">
            <v-card class="mb-12" height="height">
              <AddressSearch></AddressSearch>
              <GeoMap :location="selectedLocation" />
            </v-card>
            <v-btn color="primary" @click="nextStep(2)" block>Next</v-btn>
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
import SubmitButton from "../shared/SubmitButton";
import PhotoData from "../../api/photo-data";

export default {
  name: "PhotoUpload",
  components: {
    AddressSearch,
    ContactForm,
    GeoMap,
    PhotoInput,
    SubmitButton
  },
  data() {
    return {
      storeState: store.state,
      stepper: 1,
      height: "30%"
    };
  },
  watch: {},
  methods: {
    nextStep(n) {
      this.stepper = n + 1;
    },
    submitUpload() {
      PhotoData.savePhotos({
        contactInfo: {
          firstName: this.storeState.contactFirstName,
          lastName: this.storeState.contactLastName,
          email: this.storeState.contactEmail
        },
        photos: this.storeState.photos
      });
    }
  },
  computed: {
    photosLoaded: function() {
      return this.storeState.photos.length === 0;
    },
    selectedLocation: function() {
      return this.storeState.selectedLocation;
    }
  }
};
</script>

<style scoped>
#photo-upload-container {
  height: 100vh;
}
#stepper {
  height: 100%;
}
</style>