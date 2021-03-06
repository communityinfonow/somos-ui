<template>
  <v-row id="location-groups">
    <v-col cols="12" sm="6" class="left pr-0 mr-0">
      <LocationGroup
        :image="require('../left-flag.svg')"
        :title="translateText(neighborhoodGroupTitle)"
        :address="address"
      />
      <span class="location-popup">
        {{translateText(neighborhoodTip)}}
        <br />
        {{translateText(moreInfo)}}
        <a
          href="https://cinow.info/somos-neighbors/"
          target="_blank"
        >{{translateText(here)}}</a>
      </span>
    </v-col>

    <v-col cols="12" sm="6" class="right pl-0 ml-0">
      <LocationGroup :image="require('../right-flag.svg')" :title="translateText(matchGroupTitle)" />
      <span class="location-popup">
        {{translateText(matchTip)}}
        <br />
        {{translateText(moreInfo)}}
        <a
          href="https://cinow.info/somos-neighbors/"
          target="_blank"
        >{{translateText(here)}}</a>
      </span>
    </v-col>
  </v-row>
</template>

<script>
import translate from "@/mixins/translate";
import { userDataStore } from "../userDataStore";
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
      address: null,
      storeState: userDataStore.state,
      neighborhoodTip: {
        en:
          "Somos defines your neighborhood based on the area (Census Tract) surrounding the location you entered.",
        es:
          "Somos define tu vecindario basado en el área (tramo censal) que rodea la ubicación que insertaste."
      },
      matchTip: {
        en:
          "Somos matches your neighborhood (Census Tract) with a neighborhood that is similar to yours in some ways but different in others.",
        es:
          "Somos establece tu vecindario par (tramo censal) con un vecindario similar al tuyo de algunas maneras, pero diferente en otras."
      },
      moreInfo: {
        en: "Learn more ",
        es: "Aprende mas "
      },
      here: {
        en: "here",
        es: "aquí"
      }
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

<style lang="scss">
.left,
.right {
  position: relative;
}

.location-popup {
  width: 80%;
  position: absolute;
  background: black;
  color: white;
  padding: 17px;
  border-radius: 15px;
  opacity: 0;
  transition: opacity 200ms ease-in-out;
  z-index: 200;
  top: -30px;
}

.right:hover .location-popup,
.left:hover .location-popup,
.location-popup:hover {
  opacity: 0.6;
}

.right .location-popup {
  left: 0;
}

.left .location-popup {
  right: 0;
}

@media (max-width: 960px) {
  .location-popup {
    width: 100%;
  }
}
</style>