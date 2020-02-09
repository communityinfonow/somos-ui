<template>
  <div>
    <CommunityCounterpart />
    <Explore />
  </div>
</template>

<script>
import { userDataStore } from "./userDataStore";
import Explore from "./explore/Explore";
import CommunityCounterpart from "./community-counterpart/CommunityCounterpart";
import { appLinks } from "@/mixins/app-links";
import censusTracts from "@/api/census-tracts";
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
    }
  },
  watch: {
    selectedLocation(newLocation) {
      this.getContainingTract(newLocation);
    },
    appLinks(newLinks) {
      userDataStore.setLinks(newLinks);
    }
  },
  methods: {
    getContainingTract(location) {
      userDataStore.resetCounterpart();
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