<template>
  <section>
    <h1>{{translateText(title)}}</h1>
    <ExploreMap
      :tract="storeState.tract"
      :matchTractRank="matchTractRank"
      :matchedTract="matchedTract"
      :address="address"
      :geojson="boundaryGeojson"
      :data="data"
      ref="map"
    />
    <ExploreActions @click:new="$emit('click:new')" />
  </section>
</template>

<script>
import ExploreMap from "./ExploreMap";
import axios from "axios";
import ExploreActions from "./ExploreActions";
import { userDataStore } from "../userDataStore";
import translate from "@/mixins/translate";
import mapDataCommon from "@/mixins/map-data-common";
export default {
  name: "Explore",
  components: {
    ExploreMap,
    ExploreActions
  },
  data() {
    return {
      storeState: userDataStore.state,
      title: {
        en: "Life Expectancy in Bexar County",
        es: "Expectativa de vida del condado de bexar"
      },
      data: null,
      displayTracts: true
    };
  },
  mixins: [translate, mapDataCommon],
  computed: {
    matchTractRank() {
      return this.storeState.matchRank;
    },
    matchedTract() {
      return userDataStore.getMatchedTract();
    },
    address() {
      return this.storeState.address;
    },
    appLinks() {
      return this.storeState.links;
    }
  },
  watch: {
    appLinks() {
      if (this.storeState.links) {
        this.getCensusTracts(this.storeState.links.censusTracts.href);
      }
    },
    boundaryGeojson(newGeojson) {
      userDataStore.setGeojson(newGeojson);
    }
  },
  mounted() {
    axios
      .get(
        process.env.VUE_APP_API_DOMAIN + "/census-tracts/indicators/50001/data"
      ) // TODO obviously do this through hateoas
      .then(response => {
        this.data = response.data;
        userDataStore.setIndicatorData(response.data.indicatorData);
      });

    this.$nextTick(() => {
      userDataStore.setMapObject(
        this.$refs.map.$refs.exploremap.$refs.map.mapObject
      );
    });
  }
};
</script>

<style lang="scss" scoped>
h1 {
  padding-bottom: 30px;
}
</style>