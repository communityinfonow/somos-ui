<template>
  <v-row id="location-groups">
    <v-col cols="12" sm="6" class="left pr-0 mr-0">
      <LocationGroup
        :image="require('../left-flag.svg')"
        :title="translateText(neighborhoodGroupTitle)"
        :address="address"
      />
    </v-col>
    <v-col cols="12" sm="6" class="right pl-0 ml-0">
      <LocationGroup :image="require('../right-flag.svg')" :title="translateText(matchGroupTitle)" />
    </v-col>
  </v-row>
</template>

<script>
import translate from "@/mixins/translate";
import userDataStore from "../userDataStore";
import LocationGroup from "./LocationGroup";
export default {
  name: "LocationGroups",
  components: {
    LocationGroup
  },
  props: { isClosestLocation: Boolean },
  data() {
    return {
      neighborhoodGroupTitle: {
        en: "your</br>neighborhood",
        es: "Tu</br>vecindario"
      },
      matchGroupTitle: {
        en: "your match</br>neighborhood",
        es: "Tu vecindario Similar"
      },
      address: null
    };
  },
  computed: {
    selectedLocation() {
      return this.storeState.address;
    }
  },
  watch: {
    selectedLocation(newLocation) {
      this.setTractFormattedAddress(newLocation);
    }
  },
  methods: {
    setTractFormattedAddress(addressSelection) {
      let details = addressSelection.addressDetails;
      if (details) {
        let address1 = details.house_number || "";
        address1 += address1 ? " " : "";
        address1 +=
          details.road ||
          details.pedestrian ||
          addressSelection.name.split(",")[0];
        let address2 = details.city || details.town || details.village || "";
        address2 += address2 ? ", TX" : "TX";
        address2 += " " + details.postcode || "";
        this.address = {
          line1: this.isClosestLocation ? "Nearest " + address1 : address1,
          line2: address2
        };
      } else {
        this.address = { line1: null, line2: null };
      }
    }
  },
  mixins: [translate]
};
</script>

<style>
</style>