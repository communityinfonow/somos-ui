<template>
  <div>
    <CommunityCounterpart ref="counterpart" :lifeExpectancyIndicator="lifeExpectancyIndicator" />
    <Explore @click:new="newNeighborhood" />
  </div>
</template>

<script>
import { userDataStore } from "./userDataStore";
import Explore from "./explore/Explore";
import CommunityCounterpart from "./community-counterpart/CommunityCounterpart";
import { appLinks } from "@/mixins/app-links";
import censusTracts from "@/api/census-tracts";
import axios from "axios";
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
      address: null
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
  }
};
</script>

<style>
</style>