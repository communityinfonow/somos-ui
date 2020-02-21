/** Searching for address on map */
<template>
  <div>
    <v-row>
      <v-col cols="12">
        <span id="input-results">
          <AddressInput
            :loading="loading"
            :searchItems="searchSuggestions"
            @done-typing="doneTypingHandler"
            @selected="selectionHandler"
            :label="label"
            :messages="messages"
            ref="addressInput"
            :errorMessage="errorMessage"
          />
        </span>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import AddressInput from "./AddressInput";
import { location, coordinates } from "../../../Location";
import locationSearch from "../../../api/locationSearch";
import translate from "@/mixins/translate";

export default {
  name: "AddressSearch",
  components: {
    AddressInput
  },
  props: { label: String, messages: Array },
  data() {
    return {
      searchSuggestions: [],
      loading: false,
      errorMessage: null,
      errorMessageText: {
        en: "This location could not be found, please search again",
        es: ""
      }
    };
  },
  mixins: [translate],
  methods: {
    searchCallback(response) {
      this.loading = false;
      this.searchSuggestions = response.map(
        result =>
          new location(
            result.formattedAddress,
            result.addressDetails,
            null,
            new coordinates(result.location.lat, result.location.lng)
          )
      );
    },
    selectionHandler(selection) {
      this.$emit("selected", selection);
    },
    doneTypingHandler(addressSearchString) {
      this.errorMessage = null;
      if (addressSearchString) {
        this.loading = true;
        if (addressSearchString.match(/^\d{5}$/g)) {
          locationSearch.searchByZipCode(
            addressSearchString,
            this.searchCallback,
            error => {
              this.loading = false;
              this.searchSuggestions = [];
            }
          );
        } else {
          locationSearch.searchByAddress(
            addressSearchString,
            this.searchCallback,
            error => {
              this.errorMessage = this.translateText(this.errorMessageText);
              this.loading = false;
            }
          );
        }
      }
    },

    modifyVuetifyElementsForAccesibility() {
      document
        .getElementById("input-results")
        .querySelectorAll('[role="combobox"]')
        .forEach(combobox => {
          combobox.setAttribute("aria-label", "location search and results");
        });
    }
  },
  watch: {},
  mounted() {
    this.modifyVuetifyElementsForAccesibility();
  }
};
</script>

<style lang="scss" scoped>
</style>