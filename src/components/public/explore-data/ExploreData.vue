<template>
  <section id="explore-data">
    <Header />

    <v-container>
      <v-row class="mb-5">
        <v-col cols="12">
          <v-img class="somos-logo" :src="require('../somos-logo.svg')" @click="$router.push('/')"></v-img>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="4">
          <button
            @click="showNeighborhoods"
            :class="{selected: !!neighborhoods}"
          >{{ translateText(exploreNeighborhoods) }}</button>
        </v-col>
        <v-col cols="12" sm="4">
          <button
            @click="showRelationships"
            :class="{selected: !!relationships}"
          >{{ translateText(exploreIndicatorRelationships) }}</button>
        </v-col>

        <v-col cols="12" sm="4">
          <button
            @click="showDataDownload"
            :class="{selected: !!dataDownload}"
          >{{ translateText(downloadData) }}</button>
        </v-col>
      </v-row>
      <transition-group>
        <div v-show="neighborhoods" :key="1">
          <AddressSearch
            id="address-search"
            @selected="addressSelectionHandler"
            :label="translateText(addressSearchLabel)"
            :messages="[translateText(addressSearchDirections)]"
          ></AddressSearch>
          <ExploreMap
            :tract="storeState.tract"
            :matchTractRank="storeState.matchRank"
            :matchedTract="matchedTract"
            :address="storeState.address"
            :geojson="boundaryGeojson"
            :data="lifeExpectancyData"
            displayMatches
            @click="clickHandler"
            @click:match="matchClickHandler"
            class="explore-data-map"
          />
          <NoDataDialog
            :model="closestTractDialog"
            @close="closeModal"
            @proceed="selectClosestTract"
          />
          <DataDisplay :title="translateText(commonIndicatorsTitle)" v-if="commonData.length">
            <v-row>
              <v-col v-for="(dataGroup, index) in commonData" :key="index" cols="6">
                <DataBarGroupingContainer :data="dataGroup" />
              </v-col>
            </v-row>
          </DataDisplay>

          <ImageGalleryContainer
            :tract="tract"
            :tractPhotos="tractPhotos"
            :matchedTractPhotos="matchedTractPhotos"
          />

          <LifeExpectancy :placeholder="!lifeExpectancy" :difference="lifeExpectancy" />
          <p v-if="differenceData.length">{{translateText(differentIndicatorsParagraph)}}</p>
          <DataDisplay v-if="differenceData.length">
            <v-row>
              <v-col v-for="(dataGroup, index) in differenceData" :key="index" cols="6">
                <DataBarGroupingContainer :data="dataGroup" />
              </v-col>
            </v-row>
          </DataDisplay>

          <div v-if="commonData.length">
            <h2>{{translateText(allIndicatorsTitle)}}</h2>
            <DataDisplay
              :title="category.name"
              v-for="category in indicatorCategories"
              :key="category.id"
            >
              <v-row>
                <v-col v-for="(dataGroup, index) in category.indicators" :key="index" cols="6">
                  <DataBarGroupingContainer :data="formatIndicator(dataGroup)" />
                </v-col>
              </v-row>
            </DataDisplay>
          </div>
        </div>
        <div v-if="relationships" :key="2">
          <ExploreDataIndicatorSelector :indicators="indicators" @select="setIndicator" />

          <ExploreDataScatterPlot
            :yData="lifeExpectancyData"
            :xData="selectedIndicatorData"
            :xAxisIndicator="selectedIndicator"
            :yAxisIndicator="lifeExpectancyIndicator"
          />
        </div>
      </transition-group>
      <Footer />
    </v-container>
  </section>
</template>

<script>
import ExploreMap from "@/components/public/user-data/explore/ExploreMap";
import ExploreDataScatterPlot from "./ExploreDataScatterPlot";
import translate from "@/mixins/translate";
import displayData from "@/mixins/display-data";
import axios from "axios";
import appApi from "@/api/advanced-data.js";
import { location, coordinates } from "@/Location.js";
import ExploreDataIndicatorSelector from "./ExploreDataIndicatorSelector";
import { userDataStore } from "@/components/public/user-data/userDataStore";
import mapDataCommon from "@/mixins/map-data-common";
import AddressSearch from "@/components/shared/address-search/AddressSearch";
import userData from "@/mixins/user-data";
import NoDataDialog from "@/components/public/user-data/NoDataDialog";
import DataDisplay from "@/components/public/user-data/community-counterpart/DataDisplay";
import DataBarGroupingContainer from "@/components/public/shared/data-bar/DataBarGroupingContainer";
import locationSearch from "@/api/locationSearch.js";
import ImageGalleryContainer from "@/components/public/user-data/community-counterpart/ImageGalleryContainer";
import LifeExpectancy from "@/components/public/user-data/community-counterpart/LifeExpectancy";
import Header from "@/components/public/Header";
import Footer from "@/components/public/Footer";
export default {
  name: "ExploreData",
  components: {
    ExploreMap,
    AddressSearch,
    ExploreDataScatterPlot,
    ExploreDataIndicatorSelector,
    NoDataDialog,
    DataDisplay,
    DataBarGroupingContainer,
    ImageGalleryContainer,
    LifeExpectancy,
    Header,
    Footer
  },
  mixins: [translate, mapDataCommon, userData, displayData],
  data() {
    return {
      tab: null,
      lifeExpectancyData: null,
      selectedIndicator: null,
      selectedIndicatorData: null,
      displayTracts: true,
      links: null,
      storeState: userDataStore.state,
      addressSearchLabel: {
        en: "Help us find your neighborhood",
        es: "Ayúdanos a encontrar tu vecindario"
      },
      addressSearchDirections: {
        en: "Enter a nearby address or landmark in your neighborhood",
        es:
          "Escribe una dirección cercana a tu vecindario o punto de referencia"
      },
      exploreNeighborhoods: { en: "Explore Neighborhoods", es: "" },
      exploreIndicatorRelationships: {
        en: "Explore Indicator Relationships",
        es: ""
      },
      downloadData: { en: "Download Data", es: "" },
      allIndicatorsTitle: { en: "All Indicators", es: "" },
      dataDownload: false,
      relationships: false,
      neighborhoods: true,
      indicatorCategories: []
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
    },
    lifeExpectancyIndicator() {
      return this.indicators.find(indicator => indicator.isLifeExpectancy);
    },
    indicators() {
      return this.indicatorCategories
        .map(category => category.indicators)
        .reduce((accum, indicators) => accum.concat(indicators));
    }
  },
  methods: {
    showNeighborhoods() {
      this.dataDownload = false;
      this.relationships = false;
      this.neighborhoods = true;
    },
    showDataDownload() {
      this.dataDownload = true;
      this.relationships = false;
      this.neighborhoods = false;
    },
    showRelationships() {
      this.dataDownload = false;
      this.relationships = true;
      this.neighborhoods = false;
    },
    addressSelectionHandler(address) {
      userDataStore.setAddress(address);
    },
    formatIndicator(indicator) {
      return {
        _links: this.createCensusTractIndicatorDataLinks(indicator),
        indicator: indicator
      };
    },
    matchClickHandler(selectedMatchingTract) {
      userDataStore.setMatchRank(selectedMatchingTract.rank);
    },
    clickHandler(latLng) {
      this.coordinates = latLng;
      locationSearch.searchByLatLng(
        this.coordinates.lat,
        this.coordinates.lng,
        response => {
          this.addressSelectionHandler(
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
        userDataStore.setIndicatorData(this.lifeExpectancyData.indicatorData);
      });
    },
    getIndicators() {
      axios.get(this.links["indicator-topics"].href).then(response => {
        this.indicatorCategories = response.data._embedded.indicatorTopicDtoes.sort(
          (a, b) =>
            a.name.toLowerCase() === "population"
              ? -1
              : b.name.toLowerCase() === "population"
              ? 1
              : a.name.localeCompare(b.name)
        );
      });
    },
    setIndicator(indicator) {
      this.selectedIndicator = indicator;
    },
    selectionHandler(selection) {
      userDataStore.setAddress(selection);
    },
    getTractLifeExpectancyData(indicator) {
      if (indicator && indicator._links) {
        axios
          .get(indicator._links["parent-life-expectancy"].href)
          .then(response => {
            userDataStore.setNeighborhoodData(response.data);
          });

        axios
          .get(indicator._links["child-life-expectancy"].href)
          .then(response => {
            userDataStore.setMatchData(response.data);
          });
      }
    },
    createCensusTractIndicatorDataLinks(indicator) {
      return {
        "parent-data": {
          href:
            this.links["census-tracts"].href +
            "/" +
            this.tract.id +
            "/" +
            "indicators/" +
            indicator.id +
            "/data"
        },

        "child-data": {
          href:
            this.links["census-tracts"].href +
            "/" +
            this.matchedTract.id +
            "/" +
            "indicators/" +
            indicator.id +
            "/data"
        }
      };
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
      });
    },
    matchedTract(newTract) {
      this.getTractLifeExpectancyData(newTract.lifeExpectancyIndicator);
    }
  },
  mounted() {
    appApi.getLinks(response => {
      this.links = response.data._links;
    });
  }
};
</script>

<style lang="scss" scoped>
button {
  background: transparent;
  font-family: "Bebas Neue";
  font-size: 28px;
  color: gray;
  text-align: center;
  width: 100%;
  line-height: 30px;
  height: 65px;

  &.selected {
    border-bottom: 5px solid;
    color: $main-dark-blue;
  }

  &:hover {
    background: #dcdcdc;
  }
}

h1 {
  margin-bottom: 20px;
}

h2 {
  text-align: center;
  margin-bottom: 50px;
  border-bottom: 3px solid;
  padding-bottom: 12px;
}
p {
  text-align: center;
  width: 80%;
  margin: auto;
  padding-bottom: 20px;
  position: relative;
  z-index: 2;
}

#explore-data {
  .container {
    margin-top: 50px;
    margin-bottom: 82px;
  }
}
@media (max-width: 600px) {
  p {
    width: 100%;
  }
}

#address-search {
  z-index: 8000;
}

.explore-data-map {
  margin-bottom: 90px;
  z-index: 0;
}

.somos-logo {
  margin: auto;
  width: 30%;
  &:hover {
    cursor: pointer;
  }
}
</style>