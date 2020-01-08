/**Big ol' component encompassing all that is photo upload */
// TODO add timeout for upload process. Match that timeout on the server and delete the file if it hasn't been approved yet.
<template>
  <v-container id="photo-upload-container">
    <v-row align-center justify-center>
      <v-col cols="12" id="photo-upload-content" class="elevation-2">
        <v-stepper v-model="stepper" :vertical="true" id="stepper" class="elevation-0">
          <div id="stepper-header" class="mb-4" role="heading" aria-level="1">Share Your Photos</div>
          <p
            id="stepper-description"
          >Share your neighborhood photos with the rest of San Antonio. Our shared story begins here.</p>

          <v-stepper-step :step="1" :complete="stepper > 1" :key="`1 - step`" :color="stepperColor">
            <span
              class="upload-step-label"
              :class="determineStepperTextActive(1)"
              role="heading"
              aria-level="2"
            >Upload Photo</span>
          </v-stepper-step>
          <v-stepper-content :key="`1 - content`" :step="1">
            <v-card height="height" flat>
              <v-card-text>
                <PhotoInput :key="rerenderKey" />
              </v-card-text>
              <v-card-actions>
                <SomosButton @click="nextStep(1)" block :disabled="photoLoaded">Submit</SomosButton>
              </v-card-actions>
            </v-card>

            <!-- TODO remove false -->
          </v-stepper-content>
          <v-stepper-step :step="2" :complete="stepper > 2" :key="`2 - step`" :color="stepperColor">
            <span
              class="upload-step-label"
              :class="determineStepperTextActive(2)"
              role="heading"
              aria-level="2"
            >{{locationTitlePrepend}} Photo Location</span>
          </v-stepper-step>
          <v-stepper-content :key="`2 - content`" :step="2">
            <v-card height="height" flat>
              <v-card-text>
                <AddressSearch></AddressSearch>
                <GeoMap
                  :location="selectedLocation.coordinates"
                  :zoom="mapZoom"
                  :center="selectedLocation.coordinates"
                  :display="false"
                />
              </v-card-text>
              <v-card-actions>
                <SomosButton @click="nextStep(2)" block :disabled="!isLocationSelected">Submit</SomosButton>
              </v-card-actions>
            </v-card>
          </v-stepper-content>
          <v-stepper-step :step="3" :complete="stepper > 3" :key="`3 - step`" :color="stepperColor">
            <span
              class="upload-step-label"
              :class="determineStepperTextActive(3)"
              role="heading"
              aria-level="2"
            >Enter Contact Information (not required)</span>
          </v-stepper-step>
          <v-stepper-content :key="`3 - content`" :step="3">
            <v-card class="mb-12" height="height" flat>
              <v-card-text>
                <ContactForm></ContactForm>
              </v-card-text>
              <v-card-actions>
                <!-- TODO: message regarding privacy policy and terms of service -->
                <SomosButton @click="submitUpload" block>Submit</SomosButton>
              </v-card-actions>
            </v-card>
          </v-stepper-content>
        </v-stepper>
        <v-alert type="success" :value="showComplete">Upload successful</v-alert>
        <SomosButton v-if="showComplete" @click="resetUpload" block>Upload Another Photo</SomosButton>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AddressSearch from "../../../shared/address-search/AddressSearch";
import ContactForm from "./ContactForm";
import GeoMap from "../map/Map";
import PhotoInput from "./PhotoInput";
import { store } from "../../../../store";
import PhotoData from "../../../../api/photo-data";
import CensusTracts from "../../../../api/census-tracts";
import { appLinks } from "../../../../mixins/app-links";
import SomosButton from "../../shared/SomosButton";
import globals from "../../../../globals";
import Vue from "vue";

export default {
  name: "PhotoUpload",
  components: {
    AddressSearch,
    ContactForm,
    GeoMap,
    PhotoInput,
    SomosButton
  },
  data() {
    return {
      storeState: store.state,
      stepper: 1,
      height: "30%",
      showComplete: false,
      stepperColor: globals.mainLightBlue,
      rerenderKey: 1
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
    determineStepperTextActive(step) {
      return this.stepper === step ? "enabled" : "disabled";
    },
    nextStep(n) {
      this.stepper = n + 1;
    },
    resetUpload() {
      this.stepper = 1;
      store.clearSelectedLocation();
      store.setPhoto(null);
      this.rerenderKey += 1; // re-renders the photo input component
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

<style lang="scss">
#photo-upload-content {
  background-color: white;
  border-radius: $border-radius;
}

#map {
  width: 100%;
  height: 400px;
  z-index: 0;
}
#stepper {
  .v-label {
    text-align: left;
    font-family: Montserrat;
    letter-spacing: 0.21px;
    color: $main-dark-blue;
    font-weight: 500;
  }

  .v-icon {
    color: $main-dark-blue;
  }
}

#stepper-header {
  text-align: center;
  margin-top: 30px;
  color: $main-dark-blue;
  font: Bold 2.143rem/1.714rem Bebas Neue;
  letter-spacing: 0.429rem;
  text-transform: uppercase;
}

#stepper-description {
  color: $main-dark-blue;
  text-align: center;
  font: 1.071rem/1.6rem Montserrat;
  font-weight: 500;
  letter-spacing: 0.23px;
}

.upload-step-label {
  text-align: left;
  font: Bold 1.143rem/1.571rem Montserrat;
  letter-spacing: 0.24px;
  text-transform: uppercase;

  &.disabled {
    color: #6f6f6f !important;
  }
}

// override vuetify styling for step label
.v-stepper__step--active {
  .upload-step-label {
    color: $main-dark-blue;
  }
}
</style>