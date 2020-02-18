<template>
  <div>
    <CommunityCounterpart
      ref="counterpart"
      :lifeExpectancyIndicator="lifeExpectancyIndicator"
      :isClosestLocation="isClosestLocation"
    />
    <Explore @click:new="newNeighborhood" />
    <v-dialog v-model="closestTractDialog" width="50%" id="closest-tract-dialog">
      <v-card>
        <v-card-title
          class="headline lighten-2"
          primary-title
          id="closest-tract-title"
        >Location does not have data</v-card-title>

        <v-card-text>
          <p>Life expectancy data does not exist for the location you selected.</p>
          <p>Would you like to view data for the nearest neighborhood?</p>
        </v-card-text>
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="secondary" text @click="closeModal">No thanks</v-btn>
          <v-btn color="primary" text @click="selectClosestTract">Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
export default {
  name: "UserData",
  components: {
    CommunityCounterpart,
    Explore
  },
  mixins: [appLinks],
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
        this.containingTractHandler
      );
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

        userDataStore.setTract(response);
        userDataStore.setMatchRank(1);
        censusTracts.getMatched(
          response._links["matched-tracts"].href,
          response => {
            let tract = {};
            Object.assign(tract, this.storeState.tract);
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
#closest-tract-title {
  background: $main-dark-blue;
  color: white;
  margin-bottom: 13px;
}

#closest-tract-dialog {
  p {
    font-size: 16px;
    font-family: Montserrat;
  }
}
</style>