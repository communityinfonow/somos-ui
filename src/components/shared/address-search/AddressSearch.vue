/** Searching for address on map */
<template>
  <div>
    <div>
      <span>
        <!--TODO: location icon/glyph -->
      </span>

      <div id="input-results">
        <text-input></text-input>
        <search-suggest v-bind:searchSuggestions="searchSuggestions"></search-suggest>
      </div>
      <address-type-selector></address-type-selector>
    </div>
  </div>
</template>

<script>
import SearchSuggest from "../SearchSuggest";
import TextInput from "../TextInput";
import AddressTypeSelector from "./AddessTypeSelector";

import { store } from "../../../store";
import { location, coordinates } from "../../../Location";
import geocodio from "../../../api/geocodio";
import geocodio1 from "../../../api/geocodio";

export default {
  name: "AddressSearch",
  components: {
    SearchSuggest,
    TextInput,
    AddressTypeSelector
  },

  data() {
    return {
      storeState: store.state,
      searchSuggestions: []
    };
  },
  computed: {
    geocodeApi() {
      return this.storeState.addressSearchType === "address"
        ? geocodio
        : geocodio1;
    },
    addressSearchString() {
      return this.storeState.addressSearchString;
    },
    isDoneTyping() {
      return this.storeState.isDoneTyping;
    }
  },
  watch: {
    isDoneTyping() {
      if (
        this.addressSearchString &&
        this.addressSearchString.length > 0 &&
        this.storeState.isDoneTyping
      ) {
        this.geocodeApi.geocode(this.addressSearchString, response => {
          this.searchSuggestions = response.data.results.map(
            result =>
              new location(
                result.formatted_address,
                new coordinates(result.location.lat, result.location.lng)
              )
          );
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>