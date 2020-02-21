/**Big ol' component encompassing all that is photo upload */
// TODO add timeout for upload process. Match that timeout on the server and delete the file if it hasn't been approved yet.
<template>
  <div id="photo-upload-container">
    <v-container>
      <v-row align-center justify-center>
        <v-col cols="12" id="photo-upload-content" class="elevation-2">
          <v-stepper v-model="stepper" :vertical="true" id="stepper" class="elevation-0">
            <TranslateBtn />
            <div
              id="stepper-header"
              class="mb-4"
              role="heading"
              aria-level="1"
            >{{translateText(title)}}</div>
            <p id="stepper-description">{{translateText(stepperDescription)}}</p>

            <v-stepper-step
              :step="1"
              :complete="stepper > 1"
              :key="`1 - step`"
              :color="stepperColor"
            >
              <span
                class="upload-step-label"
                :class="determineStepperTextActive(1)"
                role="heading"
                aria-level="2"
              >{{translateText(firstStepTitle)}}</span>
            </v-stepper-step>
            <v-stepper-content :key="`1 - content`" :step="1">
              <v-card height="height" flat>
                <v-card-text>
                  <PhotoInput :key="rerenderKey" />
                  <PhotoTerms v-if="!photoLoaded"/>
                </v-card-text>
                <v-card-actions>
                  <SomosButton
                    @click="nextStep(1)"
                    block
                    :disabled="photoLoaded"
                  >{{translateText(submit)}}</SomosButton>
                </v-card-actions>
              </v-card>

              <!-- TODO remove false -->
            </v-stepper-content>
            <v-stepper-step
              :step="2"
              :complete="stepper > 2"
              :key="`2 - step`"
              :color="stepperColor"
            >
              <span
                class="upload-step-label"
                :class="determineStepperTextActive(2)"
                role="heading"
                aria-level="2"
              >{{translateText(locationTitlePrepend) + " " + translateText(secondStepTitle)}}</span>
            </v-stepper-step>
            <v-stepper-content :key="`2 - content`" :step="2">
              <v-card height="height" flat>
                <v-card-text>
                  <AddressSearch
                    @selected="selectionHandler"
                    :label="translateText(addressSearchLabel)"
                    :messages="[translateText(addressSearchDirections)]"
                  ></AddressSearch>
                  <UploadMap :coordinates="selectedLocation.coordinates" />
                </v-card-text>
                <v-card-actions>
                  <SomosButton
                    @click="nextStep(2)"
                    block
                    :disabled="!isLocationSelected"
                  >{{translateText(submit)}}</SomosButton>
                </v-card-actions>
              </v-card>
            </v-stepper-content>
            <v-stepper-step
              :step="3"
              :complete="stepper > 3"
              :key="`3 - step`"
              :color="stepperColor"
            >
              <span
                class="upload-step-label"
                :class="determineStepperTextActive(3)"
                role="heading"
                aria-level="2"
              >{{translateText(thirdStepTitle)}}</span>
            </v-stepper-step>
            <v-stepper-content :key="`3 - content`" :step="3">
              <v-card class="mb-12" height="height" flat>
                <v-card-text>
                  <ContactForm></ContactForm>
                </v-card-text>
                <v-card-actions>
                  <!-- TODO: message regarding privacy policy and terms of service -->
                  <SomosButton @click="submitUpload" block>{{translateText(submit)}}</SomosButton>
                </v-card-actions>
              </v-card>
            </v-stepper-content>
          </v-stepper>
          <v-alert type="success" :value="showComplete">
            <p>{{translateText(uploadSuccessful)}}</p>
          </v-alert>
          <SomosButton
            v-if="showComplete"
            @click="resetUpload"
            block
          >{{translateText(uploadAnother)}}</SomosButton>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import AddressSearch from "../../../shared/address-search/AddressSearch";
import ContactForm from "./ContactForm";
import PhotoInput from "./PhotoInput";
import { store } from "@/store";
import PhotoData from "@/api/photo-data";
import CensusTracts from "@/api/census-tracts";
import { appLinks } from "@/mixins/app-links";
import SomosButton from "@/components/shared/SomosButton";
import globals from "@/globals";
import UploadMap from "./UploadMap";
import translate from "@/mixins/translate";
import TranslateBtn from "@/components/public/TranslateBtn";
import PhotoTerms from "./PhotoTerms";
import Vue from "vue";

export default {
  name: "PhotoUpload",
  components: {
    AddressSearch,
    ContactForm,
    UploadMap,
    PhotoInput,
    SomosButton,
    TranslateBtn,
    PhotoTerms
  },
  data() {
    return {
      storeState: store.state,
      stepper: 1,
      height: "30%",
      showComplete: false,
      stepperColor: globals.mainLightBlue,
      rerenderKey: 1,
      title: { en: "Share Your Photos", es: "" },
      stepperDescription: {
        en:
          "Share your neighborhood photos with the rest of San Antonio. Our shared story begins here.",
        es: ""
      },
      firstStepTitle: {
        en: "Upload Photo",
        es: ""
      },
      secondStepTitle: {
        en: "Photo Location",
        es: ""
      },
      thirdStepTitle: {
        en: "Enter Contact Information (not required)",
        es: ""
      },
      submit: { en: "Submit", es: "" },
      uploadSuccessful: { en: "Upload successful", es: "" },
      addressSearchLabel: { en: "Help us find your Neighborhood", es: "" },
      addressSearchDirections: {
        en: "Enter an address, nearby landmark or select from the map",
        es: ""
      },
      uploadAnother: { en: "Upload Another Photo", es: "" }
    };
  },
  mixins: [appLinks, translate],
  watch: {
    appLinks: function(newLinks) {
      store.setAppLinks(newLinks);
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
    selectionHandler(location) {
      store.setSelectedLocation(location);
    },
    submitUpload() {
      var photo = this.storeState.photo;
      photo.ownerEmail = this.storeState.contactEmail;
      photo.ownerFirstName = this.storeState.contactFirstName;
      photo.ownerLastName = this.storeState.contactLastName;
      photo.gid = this.storeState.selectedLocation.tract.id;
      photo.description = this.storeState.photoDescription;
      delete photo._links; // TODO photo object shouldn't have links sent with it
      PhotoData.savePhoto(
        this.storeState.selectedLocation.tract._links.photos.href +
          "/" +
          photo.id,
        photo,
        () => {
          ga("send", {
            hitType: "event",
            eventCategory: "Photo Upload",
            eventAction: "submit",
            eventLabel: "tract: " + photo.gid
          });
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
      return this.isLocationSelected
        ? { en: "Confirm", es: "" }
        : { en: "Select", es: "" };
    }
  }
};
</script>

<style lang="scss">
@media (min-width: 1904px) {
  .container {
    max-width: 1185px !important;
  }
}

#photo-upload-content {
  background-color: white;
  border-radius: $border-radius;
}

#photo-upload-container {
  background-image: linear-gradient(
    90deg,
    $main-light-blue,
    $main-light-blue 50%,
    $main-dark-blue 50%
  );
  height: 100%;
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