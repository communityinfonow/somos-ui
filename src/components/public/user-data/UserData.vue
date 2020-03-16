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
import axios from "axios";
import translate from "@/mixins/translate";
import NoDataDialog from "./NoDataDialog";
import userData from "@/mixins/user-data";
export default {
  name: "UserData",
  components: {
    CommunityCounterpart,
    Explore,
    NoDataDialog
  },
  mixins: [appLinks, translate, userData],
  data() {
    return {
      userTract: null,
      address: null
    };
  },
  computed: {
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
    appLinks(newLinks) {
      userDataStore.setLinks(newLinks);
      this.censusTractsLink = newLinks.censusTracts
        ? newLinks.censusTracts.href
        : null;
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
    }
  }
};
</script>

<style lang="scss" scoped>
</style>