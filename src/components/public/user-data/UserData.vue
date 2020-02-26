<template>
  <div>
    <CommunityCounterpart
      ref="counterpart"
      :lifeExpectancyIndicator="lifeExpectancyIndicator"
      :isClosestLocation="isClosestLocation"
    />
    <Explore @click:new="newNeighborhood" id="life-expectancy-in-bexar" />
    <NoDataDialog :model="closestTractDialog" @close="closeModal" @proceed="selectClosestTract" />
  </div>
</template>

<script>
import { userDataStore } from "./userDataStore";
import Explore from "./explore/Explore";
import CommunityCounterpart from "./community-counterpart/CommunityCounterpart";
import { appLinks } from "@/mixins/app-links";
import censusTracts from "@/api/census-tracts";
import axios from "axios";
import GeometryUtil from "leaflet-geometryutil";
import polylabel from "polylabel";
import { location, coordinates } from "@/Location";
import translate from "@/mixins/translate";
import NoDataDialog from "./NoDataDialog";
export default {
  name: "UserData",
  components: {
    CommunityCounterpart,
    Explore,
    NoDataDialog
  },
  mixins: [appLinks, translate],
  data() {
    return {
      userTract: null,
      storeState: userDataStore.state,
      address: null,
      closestTractDialog: false,
      isClosestLocation: false
    };
  },
  computed: {
    selectedLocation() {
      return this.storeState.address;
    },
    matchedTract() {
      return userDataStore.getMatchedTract();
    },
    lifeExpectancyIndicator() {
      return this.matchedTract
        ? this.matchedTract.lifeExpectancyIndicator
        : null;
    }
  },
  mounted() {
    this.getLifeExpectancyData(this.indicator);
  },
  watch: {
    selectedLocation(newLocation) {
      this.getContainingTract(newLocation);
    },
    appLinks(newLinks) {
      userDataStore.setLinks(newLinks);
    },
    lifeExpectancyIndicator(newIndicator) {
      this.getLifeExpectancyData(newIndicator);
    }
  },
  methods: {
    closeModal() {
      this.closestTractDialog = false;
    },
    selectClosestTract() {
      let closestTractLayer = GeometryUtil.closestLayer(
        this.storeState.mapObject,
        this.storeState.geojson
          .getLayers()
          .filter(layer => layer.feature && layer.feature.properties.hasData),
        this.selectedLocation.coordinates
      ).layer;
      let closestTractCentroid = polylabel(
        closestTractLayer.feature.geometry.coordinates[0],
        1.0
      );
      userDataStore.setAddress(
        new location(
          this.selectedLocation.name,
          this.selectedLocation.addressDetails,
          null,
          new coordinates(closestTractCentroid[1], closestTractCentroid[0])
        )
      );
      this.closeModal();
    },
    getLifeExpectancyData(indicator) {
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
    newNeighborhood() {
      this.$refs.counterpart.$refs.addressInput.$refs.addressInput.$el
        .getElementsByTagName("input")[0]
        .focus();
    },
    getContainingTract(location) {
      userDataStore.setMatchRank(1);
      censusTracts.getSingle(
        this.appLinks.censusTracts.href +
          "/latlng/lat=" +
          location.coordinates.lat +
          ";lng=" +
          location.coordinates.lng,
        this.containingTractHandler,
        this.containingTractErrorHandler
      );
    },
    containingTractErrorHandler(error) {
      this.isClosestLocation = true;
      this.showClosestTractMessage();
    },
    containingTractHandler(response) {
      if (
        !this.storeState.lifeExpectancyData.find(
          tractData => response.id === tractData.censusTractId
        )
      ) {
        this.isClosestLocation = true;
        this.showClosestTractMessage();
      } else {
        this.isClosestLocation = false;

        let tract = response;
        userDataStore.setMatchRank(1);
        censusTracts.getMatched(
          response._links["matched-tracts"].href,
          response => {
            tract.matchedTracts = response;
            userDataStore.setTract(tract);
          }
        );
      }
    },
    showClosestTractMessage() {
      this.closestTractDialog = true;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>