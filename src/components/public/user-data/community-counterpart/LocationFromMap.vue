<template>
  <div>
    <Map
      :locations="selectedLocation"
      :center="center"
      @click="mapClickSelectLocation"
      class="location-map"
    />
    <SomosButton id="submit-location" @click="submitLocation">{{
      translateText(submit)
    }}</SomosButton>
  </div>
</template>

<script>
import * as leafletPip from "@mapbox/leaflet-pip";
import Map from "@/components/public/shared/map/Map";
import { mapCommon } from "@/mixins/map-common";
import censusTractApi from "@/api/census-tracts";
import locationSearch from "@/api/locationSearch.js";
import { location, coordinates } from "@/Location.js";
import translate from "@/mixins/translate";
import SomosButton from "@/components/shared/SomosButton";

import { userDataStore } from "@/components/public/user-data/userDataStore";
export default {
  name: "LocationFromMap",
  mixins: [mapCommon, translate],

  components: {
    Map,
    SomosButton,
  },
  data() {
    return {
      storeState: userDataStore.state,
      coordinates: null,
      center: [29.437236, -98.491163],
      submit: {
        en: "submit",
        es: "Enviar",
      },
    };
  },

  methods: {
    mapClickSelectLocation(event) {
      this.coordinates = event.latlng;
    },
    submitLocation() {
      locationSearch.searchByLatLng(
        this.coordinates.lat,
        this.coordinates.lng,
        (response) => {
          this.$emit("submit");
          userDataStore.setAddress(
            new location(
              response.data.formattedAddress,
              response.data.addressDetails,
              null,
              new coordinates(this.coordinates.lat, this.coordinates.lng)
            )
          );
          this.coordinates = null;
        }
      );
    },
  },
  computed: {
    selectedLocation() {
      if (this.coordinates) {
        return [
          {
            coordinates: this.coordinates,
            icon: {
              url: this.iconUrl,
              size: this.iconSize,
              anchor: this.calculateIconAnchor(
                this.iconSize[0],
                this.iconSize[1]
              ),
            },
            click: () => {},
          },
        ];
      } else {
        return [];
      }
    },
  },
};
</script>

<style>
#submit-location {
  border-top-left-radius: 0 !important;
  border-top-right-radius: 0 !important;
  width: 100%;
}

.location-map {
  border-bottom-left-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
}
</style>