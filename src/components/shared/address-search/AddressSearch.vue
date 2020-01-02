/** Searching for address on map */
<template>
  <div>
    <v-row>
      <v-col lg="3" sm="5" cols="12" justify-self="end">
        <address-type-selector></address-type-selector>
      </v-col>
      <v-col lg="9" sm="7" cols="12">
        <span id="input-results">
          <AddressInput :loading="loading" />
        </span>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import AddressInput from "../AddressInput";
import AddressTypeSelector from "./AddessTypeSelector";

import { store } from "../../../store";
import { location, coordinates } from "../../../Location";
import locationSearch from "../../../api/locationSearch.js";

export default {
  name: "AddressSearch",
  components: {
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
  methods: {
    searchCallback: function(response) {
      this.loading = false;
      store.setSearchResults(
        response.data.map(
          result =>
            new location(
              result.formattedAddress,
              null,
              new coordinates(result.location.lat, result.location.lng)
            )
        )
      );
    }
  },
  watch: {
    isDoneTyping() {
      if (
        this.addressSearchString &&
        this.addressSearchString.length > 0 &&
        this.storeState.isDoneTyping
      ) {
        this.loading = true;
        locationSearch.search(
          this.addressSearchString,
          this.locationType || "address",
          this.searchCallback
        );
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>