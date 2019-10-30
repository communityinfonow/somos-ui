/** Searching for address on map */
<template>
  <div>
    <div>
      <span>
        <!--TODO: location icon/glyph -->
      </span>

      <div id="input-results">
        <AddressInput />
        <search-suggest v-bind:searchSuggestions="searchSuggestions"></search-suggest>
      </div>
      <address-type-selector></address-type-selector>
    </div>
  </div>
</template>

<script>
import SearchSuggest from "../SearchSuggest";
import AddressInput from "../AddressInput";
import AddressTypeSelector from "./AddessTypeSelector";

import { store } from "../../../store";
import { location, coordinates } from "../../../Location";
import locationSearch from "../../../api/locationSearch.js";

export default {
  name: "AddressSearch",
  components: {
    SearchSuggest,
    AddressInput,
    AddressTypeSelector
  },

  data() {
    return {
      storeState: store.state,
      searchSuggestions: []
    };
  },
  computed: {
    addressSearchString() {
      return this.storeState.addressSearchString;
    },
    isDoneTyping() {
      return this.storeState.isDoneTyping;
    },
    locationType() {
      return this.storeState.addressSearchType;
    }
  },
  watch: {
    isDoneTyping() {
      if (
        this.addressSearchString &&
        this.addressSearchString.length > 0 &&
        this.storeState.isDoneTyping
      ) {
        locationSearch.search(
          this.addressSearchString,
          this.locationType || "address",
          response => {
            this.searchSuggestions = response.data.results.map(
              result =>
                new location(
                  result.formatted_address,
                  new coordinates(result.location.lat, result.location.lng)
                )
            );
          }
        );
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>