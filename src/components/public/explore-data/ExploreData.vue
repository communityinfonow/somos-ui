<template>
  <section id="explore-data">
    <v-container>
      <AddressSearch
        @selected="selectionHandler"
        :label="translateText(addressSearchLabel)"
        :messages="[translateText(addressSearchDirections)]"
      ></AddressSearch>
      <ExploreMap
        :tract="storeState.tract"
        :matchTractRank="storeState.matchRank"
        :matchedTract="matchedTract"
        :address="storeState.address"
        :geojson="boundaryGeojson"
        :data="selectedIndicatorData"
        displayMatches
        @click="clickHandler"
      />
      <NoDataDialog :model="closestTractDialog" @close="closeModal" @proceed="selectClosestTract" />

      <ExploreDataScatterPlot
        :yData="lifeExpectancyData"
        :xData="selectedIndicatorData"
        :xAxisIndicator="selectedIndicator"
      />
      <ExploreDataIndicatorSelector :indicators="indicators" @select="setIndicator" />
    </v-container>
  </section>
</template>

<script>
import ExploreMap from "@/components/public/user-data/explore/ExploreMap";
import ExploreDataScatterPlot from "./ExploreDataScatterPlot";
import translate from "@/mixins/translate";
import axios from "axios";
import appApi from "@/api/advanced-data.js";
import ExploreDataIndicatorSelector from "./ExploreDataIndicatorSelector";
import { userDataStore } from "@/components/public/user-data/userDataStore";
import mapDataCommon from "@/mixins/map-data-common";
import AddressSearch from "@/components/shared/address-search/AddressSearch";
import userData from "@/mixins/user-data";
import NoDataDialog from "@/components/public/user-data/NoDataDialog";
import locationSearch from "@/api/locationSearch.js";

export default {
  name: "ExploreData",
  components: {
    ExploreMap,
    AddressSearch,
    ExploreDataScatterPlot,
    ExploreDataIndicatorSelector,
    NoDataDialog
  },
  mixins: [translate, mapDataCommon, userData],
  data() {
    return {
      lifeExpectancyData: null,
      selectedIndicatorData: null,
      selectedIndicator: null,
      displayTracts: true,
      links: null,
      indicators: null,
      storeState: userDataStore.state,
      addressSearchLabel: {
        en: "Help us find your neighborhood",
        es: "Ayúdanos a encontrar tu vecindario"
      },
      addressSearchDirections: {
        en: "Enter a nearby address or landmark in your neighborhood",
        es:
          "Escribe una dirección cercana a tu vecindario o punto de referencia"
      }
    };
  },
  computed: {
    matchedTract() {
      return userDataStore.getMatchedTract();
    },
    neighborhoodLifeExpectancy() {
      return this.storeState.neighborhoodData
        ? this.storeState.neighborhoodData.value + ""
        : "";
    },
    matchLifeExpectancy() {
      return this.storeState.matchData
        ? this.storeState.matchData.value + ""
        : "";
    }
  },
  methods: {
    clickHandler(latLng) {
      this.coordinates = latLng;
      locationSearch.searchByLatLng(
        this.coordinates.lat,
        this.coordinates.lng,
        response => {
          this.selectionHandler(
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
    getLifeExpectancyData() {
      axios.get(this.links["life-expectancy-data"].href).then(response => {
        this.lifeExpectancyData = response.data;
      });
    },
    getIndicators() {
      axios.get(this.links["indicators"].href).then(response => {
        this.indicators = response.data._embedded.indicatorDtoes;
      });
    },
    setIndicator(indicator) {
      this.selectedIndicator = indicator;
    },
    selectionHandler(selection) {
      userDataStore.setAddress(selection);
    }
  },
  watch: {
    boundaryGeojson(newGeo) {
      userDataStore.setGeojson(newGeo);
    },
    links(newLinks) {
      this.getLifeExpectancyData();
      this.getIndicators();
      this.getCensusTracts(newLinks["census-tracts"].href);
      this.censusTractsLink = newLinks["census-tracts"]
        ? newLinks["census-tracts"].href
        : null;
    },
    selectedIndicator(indicator) {
      axios.get(indicator._links["data-by-indicator"].href).then(response => {
        this.selectedIndicatorData = response.data;
        userDataStore.setIndicatorData(response.data.indicatorData);
      });
    }
  },
  mounted() {
    appApi.getLinks(response => {
      this.links = response.data._links;
    });
  }
};
</script>

<style>
</style>