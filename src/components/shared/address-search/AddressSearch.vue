/** Searching for address on map */
<template>
  <div>
    <v-row>
      <v-col :lg="2" justify-self="end">
        <address-type-selector></address-type-selector>
      </v-col>
      <v-col :lg="10">
        <span id="input-results">
          <AddressInput :loading="loading" />
        </span>
      </v-col>
    </v-row>
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
      searchSuggestions: [],
      loading: false
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
      //  TODO: put this in its own method
      if (
        this.addressSearchString &&
        this.addressSearchString.length > 0 &&
        this.storeState.isDoneTyping
      ) {
        this.loading = true;
        locationSearch.search(
          this.addressSearchString,
          this.locationType || "address",
          response => {
            this.loading = false;
            store.setSearchResults(
              response.data.map(
                result =>
                  new location(
                    result.formattedAddress,
                    new coordinates(result.location.lat, result.location.lng)
                  )
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