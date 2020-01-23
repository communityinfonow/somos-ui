/** Searching for address on map */
<template>
  <div>
    <v-row>
      <v-col lg="3" sm="5" cols="12" justify-self="end" id="address-type-selector">
        <address-type-selector @selected="typeSelectionHandler"></address-type-selector>
      </v-col>
      <v-col lg="9" sm="7" cols="12">
        <span id="input-results">
          <AddressInput
            :loading="loading"
            :searchItems="searchSuggestions"
            @done-typing="doneTypingHandler"
            @selected="selectionHandler"
          />
        </span>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import AddressInput from "./AddressInput";
import AddressTypeSelector from "./AddessTypeSelector";
import { location, coordinates } from "../../../../../Location";
import locationSearch from "../../../../../api/locationSearch";

export default {
  name: "AddressSearch",
  components: {
    AddressInput,
    AddressTypeSelector
  },

  data() {
    return {
      searchSuggestions: [],
      loading: false,
      locationType: "address"
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
            null,
            new coordinates(result.location.lat, result.location.lng)
          )
      );
      this.$emit("search-complete", this.searchSuggestions);
    },
    selectionHandler(selection) {
      this.$emit("selected", selection);
    },
    doneTypingHandler(addressSearchString) {
      this.loading = true;
      locationSearch.search(
        addressSearchString,
        this.locationType || "address",
        this.searchCallback
      );
    },
    typeSelectionHandler(type) {
      this.locationType = type;
    },
    modifyVuetifyElementsForAccesibility() {
      document
        .getElementById("input-results")
        .querySelectorAll('[role="combobox"]')
        .forEach(combobox => {
          combobox.setAttribute("aria-label", "location search and results");
        });
      document
        .getElementById("address-type-selector")
        .querySelectorAll('[role="radiogroup"]')
        .forEach(radiogroup => {
          radiogroup.removeAttribute("aria-labelledby");
          radiogroup.setAttribute("aria-label", "location type selector");
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