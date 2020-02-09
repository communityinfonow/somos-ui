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
            ref="addressInput"
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

export default {
  name: "AddressSearch",
  components: {
    AddressInput
  },
  props: { label: String },
  data() {
    return {
      searchSuggestions: [],
      loading: false
    };
  },
  computed: {},
  methods: {
    searchCallback(response) {
      this.loading = false;
      this.searchSuggestions = response.data.map(
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
      if (addressSearchString) {
        this.loading = true;
        locationSearch.search(addressSearchString, this.searchCallback);
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