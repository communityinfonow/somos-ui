<template>
  <v-row id="explore-actions">
    <v-col cols="12">
      <v-row justify="space-around">
        <v-col cols="12" md="4">
          <v-btn
            block
            @click="newNeighborhood"
            id="change-neighborhood-btn"
          >{{translateText(newNeighborhoodText)}}</v-btn>
        </v-col>
        <v-col cols="12" md="4">
          <v-btn block>{{translateText(exploreDataText)}}</v-btn>
        </v-col>
        <v-col cols="12" md="4">
          <v-menu offset-y>
            <template v-slot:activator="{on}">
              <v-btn block v-on="on" id="change-match-btn">{{translateText(changeYourMatchText)}}</v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="tract in matchedTracts"
                :key="tract.rank"
                @click="setMatch(tract)"
              >
                <v-list-item-title class="tract-item">{{tract.title}}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import globals from "@/globals.js";
import { userDataStore } from "../userDataStore.js";
import translate from "@/mixins/translate";
export default {
  name: "ExploreActions",
  mixins: [translate],
  data() {
    return {
      storeState: userDataStore.state,
      newNeighborhoodText: { en: "Change your neighborhood", es: "" },
      exploreDataText: { en: "explore data", es: "" },
      changeYourMatchText: { en: "Change your match", es: "" }
    };
  },
  methods: {
    newNeighborhood() {
      this.$vuetify.goTo("#community-counterpart");
      this.$emit("click:new");
    },
    setMatch(match) {
      userDataStore.setMatchRank(match.rank);
      setTimeout(() => {
        this.$vuetify.goTo("#location-groups");
      }, 600);
    },
    createTractTitles(tract) {
      //TODO translations
      switch (tract.rank) {
        case 1:
          tract.title = "Closest Match";
          break;
        case 2:
          tract.title = "2nd Closest Match";
          break;
        case 3:
          tract.title = "3rd Closest Match";
          break;
        default:
          tract.title = tract.rank + "th Closest Match";
      }
    }
  },
  computed: {
    matchedTracts() {
      let tracts =
        this.storeState.tract && this.storeState.tract.matchedTracts
          ? this.storeState.tract.matchedTracts.sort((a, b) => a.rank - b.rank)
          : [];
      tracts.forEach(this.createTractTitles);
      return tracts;
    }
  }
};
</script>

<style lang="scss" scoped>
.tract-item {
  font-family: Montserrat !important;
  text-transform: uppercase;
  font-weight: 700 !important;
}

#explore-actions {
  .v-btn {
    color: $main-dark-blue;
    font: 800 10pt Montserrat;
    height: 50px;
  }

  .v-card {
    border-radius: 15px;
  }

  #change-neighborhood-btn {
    background: $main-dark-blue !important;
    color: #ffffff !important;
    white-space: normal;
  }

  #change-match-btn {
    background: $main-yellow !important;
  }
}
</style>